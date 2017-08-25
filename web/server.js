const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var db; 
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost');
var parser = require('json-parser');
var fs = require('fs');


MongoClient.connect('mongodb://127.0.0.1:27017/dbdata', function (err, database) { 
	if (err){ 
		return console.log('\nPor favor faça a conexão com o banco de dados\n'+err);}
		else{
		console.log('\nA conexão com o banco foi estabelecida em:\n"mongodb://127.0.0.1:27017/dbdata"\n');
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
    var dtaV = [];
    var lbls = [];
    var title;
    for (var i = 0 ; i < result.length; i++) { 
      lbls.push(result[i].hour);
      dtaV.push(result[i].value);
    }
    res.render('dados.ejs', {dados: result, dtav:dtaV, labels: lbls});
  });
  db.collection('dados').find().toArray( function (err, result) {
      if (err){ return console.log(err);}
      fs.unlink('dadocsv.csv', (err) => {
        });     
      for (var i = 0 ; i < result.length; i++) { 
           var id = JSON.stringify(result[i]._id);
           var user = JSON.stringify(result[i].user);
           var local = JSON.stringify(result[i].local);
           var device = JSON.stringify(result[i].device);
           var day = JSON.stringify(result[i].day);
           var hour = JSON.stringify(result[i].hour);
           var type = JSON.stringify(result[i].tipo_sensor);
           var model = JSON.stringify(result[i].modelo_sensor);
           var value = JSON.stringify(result[i].value);

           fs.appendFile('dadocsv.csv',id+','+user+','+local+','+device+','+day+','+hour+','+type+','+model+','+value+'\n', function (err) {
              if (err) throw err;
            });
      }
});
});

client.on('connect', function () {
  client.subscribe('Tapajos-IoT');
});

app.get('/download', function (req, res) {
    res.download(__dirname+'/dadocsv.csv','dadocsv.csv');
});

client.on('message', function (topic, message) {
  var msg = JSON.parse(message.toString());
  db.collection('dados').find().toArray( function (err, database) {
    if (err){ return console.log(err);}
    var count = 0;
    db.collection('dados').save(msg, function (err, result) {
      if (err){ return console.log(err);}
      else { 
      console.log('\nUm dado foi salvo no banco de dados:\n')
      console.log(msg);
        }
    }); 
    console.log(count.toString());
  });
});
