"use strict";
var userRepository = require("../repository/userRepository");
var historyRepository = require("../repository/historyRepository");

function getPage(req, res) {
  console.log('IN - Access Page');
  if(req.session.user){
    userRepository.findByUsername(req.session.user)
      .then(function(user) {
        if(user) {
          historyRepository.getHistory(50)
          .then(function(msgList) {
            res.render('chat', {name: user.name, uniquename: user.username, ava: user.avatar, msgList: msgList, sessionname: req.session.user});
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

module.exports = { get: getPage };
