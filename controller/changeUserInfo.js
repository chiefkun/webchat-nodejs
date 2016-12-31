"use strict";
const userRepository = require("../repository/userRepository");
const fs = require('fs');
var upload = require('../config/upload');

function postInfo(req, res) {
  console.log('IN - Change User Info');
  if(req.session.user){
    var name = req.body.name;
    userRepository.findByUsername(req.session.user)
      .then(function(user) {
        if(user) {
          userRepository.updateUser(user, name);
          res.redirect('/');
        }
        // TO DO: handle if not found
      });
      // TO DO: catch exception
	} else {
		res.render('login');
    res.end();
    console.log('OUT - Change User Info');
	}
};

function postAva(req, res) {
  console.log('IN - Change User Avatar');
  if(!req.session.user){
    res.redirect('/');
    console.log('Not has permission');
  } else {
    var name = req.body.name;
    userRepository.findByUsername(req.session.user)
      .then(function(user) {
        if(user){
          var uploadAva = new upload();
          uploadAva.upload(req, res, function (err) {
            if (err) {
              res.redirect('/');
              console.log('OUT - Change User Avatar: Fail')
            } else {
              var oldAvaPath = user.avatar;
              userRepository.updateAva(user, uploadAva.getPath());
              // TO DO: Missing ava when load history mess
              // fs.unlink("views/" + oldAvaPath, (err) => {
              //   if (err) throw err;
              //   console.log('Successfully deleted old Avatar');
              // });
              res.redirect('/');
              console.log('OUT - Change User Avatar: Done');
            }
          });
        }
        // TO DO: handle if not found
      });
      // TO DO: catch exception
  }
};

module.exports = {postInfo: postInfo, postAva: postAva};
