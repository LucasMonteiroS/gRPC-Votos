import readline from "readline";
import { stdin as input, stdout as output } from "process";
import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

const leitor = readline.createInterface({ input, output });

const votingDef = loadSync("./voto.proto");
const votingProto = loadPackageDefinition({ ...votingDef });

const client = new votingProto.VotingService(
  "127.0.0.1:50051",
  credentials.createInsecure()
);

function perguntar(question) {
  return new Promise((resolve) => leitor.question(question, resolve));
}

const computarVoto = async (cpf, candidateNumber) => {
  return new Promise((resolve, reject) => {
    const voto = { cpf, candidateNumber };
    client.computarVoto(voto, (error, response) => {
      if (!error) {
        resolve(response);
      } else {
        reject(error);
      }
    });
  });
};

const listarCandidatos = async () => {
  return new Promise((resolve, reject) => {
    client.listarCandidatos({}, (error, response) => {
      if (!error) {
        resolve(response);
      } else {
        reject(error);
      }
    });
  });
};

async function main() {
  while (true) {
    console.log("----Menu----");
    console.log("1 - Votar");
    console.log("2 - Sair");

    let option = await perguntar("\nDigite a sua escolha: ");

    if (option === "2") {
      break;
    }

    if (option !== "1") {
      console.log("Opção inválida, tente novamente.");
      continue;
    }

    const candidatos = await listarCandidatos();
    if (candidatos) {
      console.log("\nLista de candidatos:");
      candidatos.candidates.forEach((candidato) => {
        console.log(`${candidato.name} - ${candidato.number}`);
      });
    }

    const cpf = await perguntar("\nDigite seu CPF: ");
    const candidateNumber = await perguntar("Digite o número do candidato: ");

    try {
      const response = await computarVoto(cpf, Number(candidateNumber));
      console.log("");
      response.success
        ? console.log("Voto computado com sucesso!")
        : console.log("Erro ao computar voto!");
    } catch (error) {
      if (error?.details.includes("No connection established")) {
        console.log("\nConexão não foi estabelecida com sucesso !!!\n");
        break;
      }

      if (error?.details.includes("CPF já utilizado")) {
        console.log("\nCPF já votou !!!\n");
        continue;
      }
    }
  }

  leitor.close();
}

main();
