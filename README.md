# Energysaver

## Instruções

### Preparando o ambiente

### Baixe, instale e configure:
* [MongoDB](https://www.mongodb.com/ "Mongo DataBase")
* [Nodejs](https://nodejs.org/en/ "Servidor")
* [Npm](https://www.npmjs.com/ "NodeJs package manager") - Ao instalar o Nodejs no Windows npm já é instalado automaticamente
* [Nodemon](https://nodemon.io/ "Nodemon") - ```npm install -g nodemon``` - *Opcional*

### Iniciando o servidor
## Windows
* Verifique se posui o git instalado e faça download em zip ou clone o repositório.
* Abra o *cmd* e entre no diretorio que baixou o arquivo ```cd "local onde salvou" + energysaver/web```
* Logo após isto baixe as dependecias do projeco com ```npm install``` ou simplesmente ```npm i```
* Após o download inicie o MongoDB, abra outra janela do cmd e digite: ```mongod```
* Por último, no *cmd* digite: ```node server.js``` ou ```nodemon server.js```
* Entre no navegador e entre em ```localhost:3000```, se estiver tudo ok você verá a pagina carregar

## Linux
* Verifique se posui o git instalado e faça download em zip ou clone o repositório.
* Baixe o npm com ```apt-get install npm```
* Abra o *Terminal* e entre no diretorio que baixou o arquivo ```cd "local onde salvou" + energysaver/web```
* Logo após isto baixe as dependecias do projeco com ```npm install``` ou simplesmente ```npm i```
* Após o download inicie o MongoDB, abra outra janela do *Terminal* e digite: ```sudo mongod```
* Por último no *Terminal* digite: ```node server.js``` ou ```nodemon server.js```
* Entre no navegador e entre em ```localhost:3000```, se estiver tudo ok você verá a pagina carregar
