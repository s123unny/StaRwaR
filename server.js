var express = require("express");
var app = express();
var port = 9488;
var path = require("path");
var http = require("http").Server(app);
var io = require("socket.io")(http);
var logger = require('morgan');
var fs = require("fs");
var game_start = require("./routes/controller");
var model = null;

var controlPanel = require('./routes/controlPanel');
app.use('/controlPanel', controlPanel);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/controlPanel', express.static(path.join(__dirname, 'views')));

app.get('/', function(req, res){
	res.sendFile(__dirname, '/views/index.html');
});


game_start(io, model);

http.listen(port, function(){
	console.log('listening on *:'+port);
});
