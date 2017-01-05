"use strict";
const db = require('./models');

const config = require('./config/config');
// const Utils = require('./Utils.js');

const pageController = require("./controller/pageController.js");
const accessPageController = require("./controller/accessPageController.js");
const changeUserInfo = require("./controller/changeUserInfo.js");
const historyRepository = require("./repository/historyRepository.js");
const userRepository = require("./repository/userRepository");

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

app.post('/savesetting', changeUserInfo.postInfo);

app.post('/uploadAva', changeUserInfo.postAva);

app.post('/logout', pageController.logout);

io.on('connection', function(socket){
  console.log('a user connected ' + socket.id);

	socket.on('login', function(data){
		socket.broadcast.emit('notification', {title: data.name,icon: data.avatar, message: "Loged in!"});
    console.log('user login');
  });

	socket.on('logout', function(data){
		socket.broadcast.emit('notification', {title: data.name,icon: data.avatar, message: "Loged out!"});
    console.log('user logout');
  });

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
