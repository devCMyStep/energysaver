const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var path = require("path");
var db; 

MongoClient.connect('mongodb://127.0.0.1:27017/energy', function (err, database) { 
	if (err) return console.log(err);
	db = database;
	app.listen(3000, function() { 
		console.log('listening on 3000'); 
	}); 
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/sobre', (req, res) => {
  res.render('sobre.ejs');
});

app.get('/feedback', (req, res) => {
  res.render('feedback.ejs');
});

app.post('/comments', function (req, res) { 
	db.collection('comments').save(req.body, function (err, result) { 
		if (err) return console.log(err); 
		console.log('saved to database');
		res.redirect('/comments'); 
	}); 
});

app.get('/comments', (req, res) => {
  db.collection('comments').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('comments.ejs', {comments: result});
  });
});

