"use strict";
const userRepository = require("../repository/userRepository");

function postLogin(req, res) {
  console.log('IN - Post Login');
  var username = req.body.username;
	var password = req.body.password;
	userRepository.findByNameAndPass(username, password)
    .then(function(user) {
      if(user) {
        req.session.user = user.username;
        res.redirect('/');
      } else {
        // TO DO: handle error alert
  			res.redirect('/');
        console.log('OUT - Post Login: Fail');
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
      if(user) {
        req.session.user = user.username;
        res.redirect('/');
      } else {
  			// TO DO: handle error alert
  			res.redirect('/');
        console.log('OUT - Post Reg: Success');
  		}
    });
    // TO DO: catch exception
};
module.exports = { postLogin: postLogin , postRegister: postRegister};
