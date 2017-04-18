var express = require('express');
var file = require('fs');
var app = express();
var path = require("path");


app.use(express.static('public'));
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.get('/sobre', function(req, res){
	res.sendFile(path.join(__dirname+'/public/sobre.html'));
});

app.listen(3000, function(){
	console.log('On http://127.0.0.1:3000');
});