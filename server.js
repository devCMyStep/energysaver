// chamada do express
var express = require("express");
// faz a juncao de diretorios
var path = require("path");
// faz o log no terminal 
var logger = require("morgan");
// pega valores do front-end
var bodyPaser = require("body-parser");
var cookieParser = require("cookie-parser");
// cira sessoes
var session = require("express-session");
var passport = require('passport');
// broker mqtt
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost');
// banco de dados
var mongoose = require("mongoose");
// junta models views e controller
var load = require("express-load");
// envia mensagens para o front-end
var flash = require("express-flash");
// formarta data e hora
var app = express();
// socket.io
var socket = require("socket.io");
// http
var http = require("http");

// conexao com banco de dados
mongoose.connect("mongodb://localhost:27017/energysaver", function(err) {
    if (err) {
        console.log("Erro ao conectar banco de dados: " + err);
    } else {
        console.log("Conexao com banco de dados efetuada com sucesso");
    }
});

// conexao com mqtt
client.on('connect', function() {
    client.subscribe('Tapajos-IoT');
});

client.on('message', function(topic, message) {
    msg = JSON.parse(message.toString());
    var Dados = app.models.dados;
    var model = new Dados(msg);
    model.save(function(err) {
        if (err) {
            console.log('Erro ao armazenar o dado: ' + err);
        } else {
            console.log('Dado salvo com sucesso: ' + message.toString());
            io.sockets.emit("msg", { msg: msg });
        }
    });
});

// setups start 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("porta", process.env.PORT || 3000);
app.use(logger("dev"));
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: "daltonfelipe" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

// helpers
app.use(function(req, res, next) {
    res.locals.session  = req.session.usuario;
	res.locals.isLogged = req.session.usuario ? true : false;
    next();
});

load("models").then("controllers").then("routes").into(app);

// levanta o servidor na porta 3000
var server = http.createServer(app).listen(app.get("porta"), function() {
    console.log("Listen on port 3000");
});

var io = socket.listen(server);