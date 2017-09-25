var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var db;
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://broker');
var parser = require('json-parser');
var fs = require('fs');
var http = require('http');
var banco_de_dados = "mongodb://user:pass@ds141434.mlab.com:port/db";

app.set('view engine', 'ejs');
app.set('porta', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// conexao com banco de dados e levantamento do servidor
MongoClient.connect('mongodb://user:pass@ds141434.mlab.com:port/db', function (err, database) {
	if (err){
		return console.log('\nPor favor faça a conexão com o banco de dados\n'+err);}
		else{
		console.log('\nA conexão com o banco foi estabelecida em:\n'+`${banco_de_dados}`+'\n');
		}
	db = database;
});
// inicializacao do servidor
var server = http.createServer(app).listen(app.get('porta'), function () {
  console.log("Conexa estabelecida, servindo na porta 3000");
  });

// socket.io
var io = require('socket.io').listen(server);

// conexao via subscribe-mqtt
client.on('connect', function () {
  client.subscribe('Topico');
});

// conexao com mqtt publisher e armazenamento dos dados recebidos
client.on('message', function (topic, message) {
  msg = JSON.parse(message.toString());
    db.collection('dados').save(msg, function (err, result) {
      if (err){ return console.log(err);}
      else {
      console.log('\nUm dado foi salvo no banco de dados:\n')
      console.log(msg);
      io.sockets.emit("msg",{msg:msg});
        }
    });
});

// pagina principal
app.get('/', function (req, res) {
  res.render('index.ejs');
});

// pagina de sobre
app.get('/sobre', function (req, res) {
  res.render('sobre.ejs');
});

// pagina de dados, criacao do arquivo para download e plot do grafico
app.get('/dados', function (req, res) {
	db.collection('dados').find().sort({$natural:-1}).limit(50).toArray( function (err, result) {
    if (err){ return console.log(err);}
    var dtaV = [];
    var lbls = [];
    var title;
    for (var i = result.length-1 ; i >=0 ; i--) {
      lbls.push(result[i].hour);
      dtaV.push(result[i].value);
    }
    res.render('dados.ejs', {dados: result, dtav:dtaV, labels: lbls});
  });
  db.collection('dados').find().toArray( function (err, result) {
      if (err){ return console.log(err);}
      fs.unlink('dadocsv.csv', (err) => {
        });
      fs.appendFile('dadocsv.csv',"id,user,local,device,day,hour,type,model,value\n", function (err) {
              if (err) throw err;
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

// pagina search
app.post('/search', function (req, res) {
  db.collection('dados').find(req.body).toArray(function (err, result) {
    if (err){ return console.log(err);}
    var dtaV = [];
    var data_search = req.body["day"];
    var lbls = [];
    for (var i = 0 ; i < result.length; i++) {
      lbls.push(result[i].hour);
      dtaV.push(result[i].value);
    }
    fs.unlink('dadocsv.csv', (err) => {});

    fs.appendFile('dadocsv.csv',"id,user,local,device,day,hour,type,model,value\n", function (err) {
          if (err) throw err;
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
    res.render('search.ejs', {day_search: data_search, dados: result, dtav:dtaV, labels: lbls});
  });

});

// pagina monitoramento
app.get('/monitoramento', function (req, res) {
	db.collection('dados').find().sort({$natural:-1}).limit(50).toArray( function (err, result) {
		if (err){ return console.log(err);}
		var dtaV = [];
		var lbls = [];
		var title;
		for (var i = result.length-1 ; i >=0 ; i--) {
			lbls.push(result[i].hour);
			dtaV.push(result[i].value);
		}
		res.render('monitoramento.ejs', {dados: result, dtav:dtaV, labels: lbls});
	});
});

// download dos dados
app.get('/download', function (req, res) {
    res.download(__dirname+'/dadocsv.csv','dadocsv.csv');
});
