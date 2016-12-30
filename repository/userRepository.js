"use strict";
const db = require('../models');

var UserRepository = {
  findByNameAndPass: function(username, password) {
    return db.User.findOne({
      where: {username: username, password: password}
    });
  },
  findByUsername: function(username) {
    return db.User.findOne({
      where: {username: username}
    });
  },
  createUser: function(username, password) {
    return db.User.build({
      username: username, password: password, name: username
    }).save();
  },
  updateUser: function(user, name) {
    return user.update({
      name: name
    });
  }
};

module.exports = UserRepository;
