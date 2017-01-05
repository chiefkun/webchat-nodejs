"use strict";
const userRepository = require("../repository/userRepository");
const historyRepository = require("../repository/historyRepository");

function getPage(req, res) {
  console.log('IN - Access Page');
  if(req.session.user){
    userRepository.findByUsername(req.session.user)
      .then(function(user) {
        if(user) {
          historyRepository.getHistory(50)
          .then(function(msgList) {
            var flag = false;
            if(!user.online){
              userRepository.updateOnlineStatus(user, true);
              flag = true;
            }
            res.render('chat', {name: user.name, uniquename: user.username, ava: user.avatar, msgList: msgList, sessionname: req.session.user, flag: flag});
            res.end();
            console.log('OUT - Access Page');
          });
          // TO DO: catch exception
        }
        // TO DO: handle if not found
      });
      // TO DO: catch exception
	} else {
		res.render('login');
    res.end();
    console.log('OUT - Access Page');
	}
};

function logout(req, res) {
  console.log('IN - Logout Page');
  userRepository.findByUsername(req.session.user)
    .then(function(user) {
      if(user) {
        userRepository.updateOnlineStatus(user, false)
          .then(function(user) {
            req.session.destroy();
          	res.redirect('/');
            console.log('OUT - Logout Page');
          });
      } else {
        res.redirect('/');
        console.log('OUT - Logout Page');
      }
    });
  };

module.exports = { get: getPage, logout: logout };
