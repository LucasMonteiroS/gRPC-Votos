import { credentials, loadPackageDefinition, ServerCredentials, Server } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

const votingDef = loadSync("./voto.proto");
const votingProto = loadPackageDefinition({ ...votingDef });

const client = new votingProto.VotingService("127.0.0.1:50051", credentials.createInsecure());

const grpcServer = new Server();
grpcServer.addService(votingProto.VotingService.service, { 
  apuracaoVotos: (call, callback) => {
    client.apuracaoVotos({}, (error, response) => {
      if (!error) {
        callback(null, response);
      } else {
        callback(error, null);
      }
    });
  }
});

const serverAddress = "127.0.0.1:50052";
grpcServer.bindAsync(serverAddress, ServerCredentials.createInsecure(), () => {
    console.log(`Servidor rodando em http://${serverAddress}`);
});
