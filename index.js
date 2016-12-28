"use strict";
var db = require('./models');
const pug = require('pug');
var pageController = require("./controller/pageController.js");
var accessPageController = require("./controller/accessPageController.js");
var config = require('./config.json');
var historyRepository = require("./repository/historyRepository.js");

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var session = require('express-session');
var bodyParser = require('body-parser');

db.sequelize.sync({force: config.db.isCreated})
	.then(function() {
		http.listen(3000, '0.0.0.0', function(){
		  console.log("Server listening on port 3000");
		});
	})
	.catch(function (e) {
		throw new Error(e);
  });

// Sering static folder
app.use(express.static('views'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(session({ secret: 'this is sercet key', resave: false,  saveUninitialized: true, cookie: { maxAge: 60000000 }}));

app.set('view engine', 'pug')

app.get('/*', pageController.get);

app.get('/', pageController.get);

app.post('/login', accessPageController.postLogin);

app.post('/register', accessPageController.postRegister);

app.post('/logout', function(req, res){
	console.log("logout");
	req.session.destroy();
	res.redirect('/');
});

io.on('connection', function(socket){
  console.log('a user connected ' + socket.id);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat messages', function(msg){
    console.log(msg.username + ' send messages: ' + msg.msg);
		historyRepository.saveMsg(msg)
		.then(function(msg){
			socket.broadcast.emit('other_messages', msg);
	    socket.emit('self_messages', msg);
		});
		// TO DO: catch exception
  });
});
