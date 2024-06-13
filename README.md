# Sistema de Votação usando gRPC e SQLite

Este projeto tem o intuito de implementar um sistema de votação distribuído, utilizando o gRPC para comunicação entre os clientes e servidores, em conjunto com o SQLite para armazenamento dos dados. O sistema se divide em quatro parters: servidor principal (realiza a computação dos votos), servidor de apuração (consulta os dados do servidor principal para realizar a apuração dos votos), cliente 1 (realiza as votações nos candidatos disponíveis) e cliente 2 (exibe o resultado da apuração).

## Requisitos

Para executar este projeto, você precisa ter os seguintes requisitos instalados:

- Node.js (v20.11.1 ou superior);
- npm;
- SQLite (certifique-se de que o SQLite esteja instalado e configurado no seu sistema operacional);

## Instalação

Para instalar as dependências do projeto, execute o seguinte comando na raiz do projeto:

```bash
npm install
```

## Execução

Para executar o servidor de votação, execute o seguinte comando na raiz do projeto:

```bash
node servidor.js
```

Para executar o servidor de apuração, execute o seguinte comando na raiz do projeto:

```bash
node servidor-apuracao.js
```

## Uso

Para votar em um candidato, execute o seguinte comando na raiz do projeto e siga as opções disponíveis do menu:

```bash
node client-votacao.js
```

Para exibir o resultado dos candidatos, e execute o seguinte comando na raiz do projeto:

```bash
node client-apuracao.js
```

## Autores

- [Thiago Castagnazzi](https://github.com/ThiagoCastagnazzi)
- [Lucas Monteiro](https://github.com/LucasMonteiroS)
- [Gustavo Cruz](https://github.com/Gustavo-Cruz-Pinheiro)
