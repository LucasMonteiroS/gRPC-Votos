import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

const votingDef = loadSync("./voto.proto");
const votingProto = loadPackageDefinition({ ...votingDef });

const client = new votingProto.VotingService("127.0.0.1:50052", credentials.createInsecure());

const apurar = async () => {
  return new Promise((resolve, reject) => {
    client.apuracaoVotos({}, (error, response) => {
      if (!error) {
        resolve(response);
      } else {
        reject(error);
      }
    });
  });
};

const main = async () => {
  try {
    const resultado = await apurar();
    console.log("Resultados da Apuração:");
    const totalVotes = resultado.results.reduce((acc, row) => acc + row.count, 0);

    if (resultado.results) {
      resultado.results.forEach((row) => {
        const percentage = ((row.count / totalVotes) * 100).toFixed(2);
        console.log(`${row.candidate}: ${row.count} votos (${percentage}%)`);
      });
    } else {
      console.log("Nenhum resultado encontrado.");
    }
  } catch (error) {
    console.error("Erro ao obter apuração de votos:", error);
  }
};

main();
