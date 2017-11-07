# Energysaver

# Sobre o sistema:
## Introdução
Para conectar-se com o sistema de coleta de dados é necessário possuir requisitos bastante simples que serão escritos em um script em Python. Primeiramente definir uma linguagem de programação com suporte à biblioteca do protocolo de mensagem MQTT, no caso, está sendo usado Python3 na versão 3.4.4, o script em Python será usado para simular um cliente de envio de dados de um sensor de corrente, para o banco de dados do servidor de coleta.

## Script do Client
O script funciona em forma de loop onde o dado é coletado e enviado para o Broker MQTT. O requisito obrigatório é, como mencionado acima, a biblioteca “paho-mqtt” que oferece suporte para o uso do protocolo MQTT integrado ao Python.

## Entendendo o sistema
Após criar o programa que será usado para enviar os dados para o sistema algumas observações devem ser cumpridas. A primeira delas é o modelo de envio de dados, este é utilizado para organizar o envio corretamente para que o servidor identifique e armazene cada dado. O modelo é definido por um objeto que contém as informações do sistema que está enviando os dados, bem como usuário, local, dispositivo que está enviando, dia, hora, tipo do sensor, modelo, e o valor da leitura. A segunda, deve-se indicar o tópico de envio do dado para o servidor. O tópico é uma string que redireciona o dado para um determinado canal que somente o cliente que possui acesso a ele pode receber as mensagens. E por último, deve ser indicado o endereço de chegada do dado, que é o IP do servidor de armazenamento de dados.

```
		{
		“user”: “Dalton”,
		“local”: “laboratório”,
		”device”: “raspberry pi”,
		“hour”: ”15:31:22”,
		“day”: “10-07-2017”,
		"name_sensor": "corrente01",
		“type_sensor”: “corrente”,
		“model_sensor”: “ACS712”,
		“value”: “0.45”
		}
```

## Cliente simulado
Um cliente simulado foi criado para testar se o sistema está funcionando. Um cliente simulado é um programa genérico que simula os dados e suas informações de acordo com o que o usuário define, por exemplo, ao iniciar a simulação, configurações como número de leituras, intervalo entre elas, em segundos, e o valor de cada leitura pode ser determinado por um número aleatório definido por um intervalo numérico como um número entre 0.40 e 0.60. O cliente simulado ajuda nos testes e não depende de sensores, o que facilita bastante para definir se o sistema funciona corretamente.
Após preencher as configurações básicas do modelo do banco de dados devemos preencher os campos do envio dos dados, como o tópico em formato de string que deve ser definido tanto no servidor quanto cliente e por último o local onde está instalado o servidor, se os dois, cliente e servidor, estão no mesmo dispositivo pode-se usar “localhost” para defini-lo, no entanto, o IP da máquina/servidor deverá ser o endereço.

## Instruções

### Preparando o ambiente

### Baixe, instale e configure:
* [MongoDB](https://www.mongodb.com/ "Mongo DataBase")
* [Nodejs](https://nodejs.org/en/ "Servidor")
* [Npm](https://www.npmjs.com/ "NodeJs package manager") - Ao instalar o Nodejs no Windows o npm já é instalado automaticamente
* [Nodemon](https://nodemon.io/ "Nodemon") - ```npm install -g nodemon``` - *Opcional*

### Iniciando o servidor
## Windows
* Verifique se posui o git instalado e faça download em zip ou clone o repositório, se baixou em zip, descompacte o arquivo.
* Abra o *cmd* e entre no diretorio que baixou o arquivo ```cd "local onde salvou" + energysaver/web```
* Logo após isto baixe as dependecias do projeto com ```npm install``` ou simplesmente ```npm i```
* Após o download inicie o MongoDB, abra outra janela do cmd e digite: ```mongod```
* Por último, no *cmd* digite: ```node server.js``` ou ```nodemon server.js```
* Entre no navegador e entre em ```localhost:3000```, se estiver tudo ok você verá a pagina carregar

## Linux
* Verifique se posui o git instalado e faça download em zip ou clone o repositório, se baixou em zip, descompacte o arquivo.
* Baixe o npm com ```apt-get install npm```
* Abra o *Terminal* e entre no diretorio que baixou o arquivo ```cd "local onde salvou" + energysaver/web```
* Logo após isto baixe as dependecias do projeto com ```npm install``` ou simplesmente ```npm i```
* Após o download inicie o MongoDB, abra outra janela do *Terminal* e digite: ```sudo mongod```
* Por último no *Terminal* digite: ```node server.js``` ou ```nodemon server.js```
* Entre no navegador e entre em ```localhost:3000```, se estiver tudo ok você verá a pagina carregar
