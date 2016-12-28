"use strict";
var userRepository = require("../repository/userRepository");
var historyRepository = require("../repository/historyRepository");

function postLogin(req, res) {
  console.log('IN - Post Login');
  var username = req.body.username;
	var password = req.body.password;
	userRepository.findByNameAndPass(username, password)
    .then(function(user) {
      if(user) {
        req.session.user = user.username;
        historyRepository.getHistory(50)
        .then(function(msgList) {
          res.render('chat', {name: user.name, uniquename: user.username, ava: user.avatar, msgList: msgList, sessionname: req.session.user});
          res.end();
          console.log('OUT - Post Login');
        });
        // TO DO: catch exception
      } else {
        // TO DO: handle error alert
  			res.redirect('/');
        console.log('OUT - Post Login');
      }
    });
    // TO DO: catch exception
};

function postRegister(req, res) {
  console.log('IN - Post Reg');
  var username = req.body.username;
	var password = req.body.password;

  userRepository.createUser(username, password)
    .then(function(user) {
      if(user){
        req.session.user = user.username;
        historyRepository.getHistory(50)
        .then(function(msgList) {
          res.render('chat', {name: user.name, uniquename: user.username, ava: user.avatar, msgList: msgList, sessionname: req.session.user});
          res.end();
          console.log('OUT - Post Reg');
        });
        // TO DO: catch exception
  		} else {
  			// TO DO: handle error alert
  			res.redirect('/');
        console.log('OUT - Post Reg');
  		}
    });
    // TO DO: catch exception
};
module.exports = { postLogin: postLogin , postRegister: postRegister};
