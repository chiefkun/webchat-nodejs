"use strict";
const db = require('./models');

const config = require('./config/config');

const pageController = require("./controller/pageController.js");
const accessPageController = require("./controller/accessPageController.js");
const historyRepository = require("./repository/historyRepository.js");

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

require('./config/express')(app, config);

db.sequelize.sync({force: config.db.isCreated})
	.then(function() {
		http.listen(3000, '0.0.0.0', function(){
		  console.log("Server listening on port 3000");
		});
	})
	.catch(function (e) {
		throw new Error(e);
  });

app.get('/*', pageController.get);

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
