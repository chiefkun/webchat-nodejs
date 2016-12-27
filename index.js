"use strict";
var db = require('./lib/initDB');
const pug = require('pug');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var session = require('express-session');
var bodyParser = require('body-parser');

// Sering static folder
app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(session({ secret: 'this is sercet key', resave: false,  saveUninitialized: true, cookie: { maxAge: 60000 }}));

app.set('view engine', 'pug')

app.get('/*', function(req, res){
	if(req.session.user){
		// res.sendFile(__dirname + '/public/chat.html');
		res.render('chat', {name: "Thanh", username: req.body.username});
	} else {
		res.render('login');
	}
});


app.get('/', function(req, res){
	if(req.session.user){
		// res.sendFile(__dirname + '/public/chat.html');
		res.render('chat', {name: "Thanh", username: req.body.username});
	} else {
		// res.sendFile(__dirname + '/public/login.html');
		res.render('login');
	}
});

app.post('/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	db.logIn(username, password, function(user){
		if(user){
			req.session.user = username;
			res.render('chat', {name: user.name, username: username, ava: user.avatar});
		} else {
			// TO DO: handle error alert
			res.redirect('/');
		}
	});
});

app.post('/register', function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	db.register(username, password, function(user){
		if(user){
			req.session.user = username;
			res.render('chat', {name: user.name, username: username, ava: user.avatar});
		} else {
			// TO DO: handle error alert
			res.redirect('/');
		}
	});
});

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
    console.log('messages: ' + msg.msg);
    socket.broadcast.emit('other_messages', msg);
    socket.emit('self_messages', msg.msg);
  });
});


http.listen(3000, '0.0.0.0', function(){
  console.log("Server listening on port 3000");
});
