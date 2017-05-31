const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var db; 
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost');
var parser = require('json-parser');

MongoClient.connect('mongodb://127.0.0.1:27017/dht11', function (err, database) { 
	if (err){ 
		return console.log('\nPor favor faça a conexão com o banco de dados\n'+err);}
		else{
		console.log('\nA conexão com o banco foi estabelecida em:\n"mongodb://127.0.0.1:27017/energy"\n');
		}
	db = database;
	app.listen(3000, function() { 
		console.log('\nO servidor está rodando em:\n"http://127.0.0.1:3000/"'); 
	}); 
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.render('index.ejs');
});

app.get('/sobre', function (req, res) {
  res.render('sobre.ejs');
});

app.get('/feedback', function (req, res) {
  res.render('feedback.ejs');
});

app.post('/comments', function (req, res) { 
	db.collection('comments').save(req.body, function (err, result) { 
		console.log('\nUm comentário foi salvo no banco de dados:\n')
		console.log(req.body);
		if (err){ return console.log(err);}
		res.redirect('/comments'); 
	}); 
});

app.get('/comments', function (req, res) {
  db.collection('comments').find().toArray(function (err, result) {
    if (err){ return console.log(err);}
    console.log('\nOs comentários estão sendo acessados em:\n"http://127.0.0.1:3000/comments"')
    res.render('comments.ejs', {comments: result});
  });
});

app.get('/dados', function (req, res) {
  db.collection('dados').find().toArray( function (err, result) {
    if (err){ return console.log(err);}
    var dtaT = [];
    var dtaH = [];
    var lbls = []; 
    for (var i = 0 ; i < result.length; i++) {  
      lbls.push(result[i].Horario); 
    }  
    var totalT = 0;
    for (var i = 0; i < result.length; i++) {
      var itemT = result[i].Temperatura ;
  		var toNumT = itemT.replace(/\D+/g, "");
  		var numT = parseInt(toNumT);
      dtaT.push(numT);
		  totalT = totalT + numT;
         }
    mediT = (totalT/result.length);
    mediaT = mediT.toFixed(2);
    var totalH = 0;
    for (var i = 0; i < result.length; i++) {
      var itemH = result[i].Humidade ;
  		var toNumH = itemH.replace(/\D+/g, "");
  		var numH = parseInt(toNumH);
      dtaH.push(numH);
  		totalH = totalH + numH;
         }
    mediH = (totalH/result.length);
    mediaH = mediH.toFixed(2)
    console.log(mediaT + ' °C ' + mediaH+ '%')
    res.render('dados.ejs', {dados: result, mdT : mediaT, mdH : mediaH, dataT: dtaT, dataH: dtaH, labels: lbls});
  });
});

client.on('connect', function () {
  client.subscribe('Tapajos-IoT/');
});
 
client.on('message', function (topic, message) {
  console.log(message.toString());
  var msg = JSON.parse(message.toString())
  db.collection('dados').save(msg, function (err, result) {
  		if (err){ return console.log(err);}
  		else { 
		console.log('\nUm dado foi salvo no banco de dados:\n')
		console.log(msg);
		}
	}); 
});