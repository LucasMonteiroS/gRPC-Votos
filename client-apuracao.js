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
    const totalVotes = resultado.results.reduce((acc, row) => acc + row.count, 0);
    let nenhumResultado = true

    if (resultado.results) {
      resultado.results.forEach((item) => {
        if (item.count != 0) {
          nenhumResultado = false
        }
      })
      if (nenhumResultado) {
        console.log("Nenhum voto cadastrado !!!")
      } else {
        console.log("Resultados da Apuração:");
        resultado.results.forEach((row) => {
          const percentage = ((row.count / totalVotes) * 100).toFixed(2);
          console.log(`${row.candidate}: ${row.count} votos (${percentage}%)`);
      });
      }
    } else {
      console.log("Nenhum resultado encontrado.");
    }
  } catch (error) {
    if(error?.details?.includes('No connection established')) {
      console.log("Conexão não foi estabelecida com sucesso !!!")
    } else {
      console.log(error)
    }
  }
};

main();
