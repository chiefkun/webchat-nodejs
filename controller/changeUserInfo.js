"use strict";
const userRepository = require("../repository/userRepository");

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

module.exports = { postInfo: postInfo };
