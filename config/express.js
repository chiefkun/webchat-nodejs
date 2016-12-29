"use strict";
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
const pug = require('pug');

module.exports = function(app, config) {
  // Setting static folder
  app.use(express.static('views'));
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  app.use(session(config.session));

  app.set('view engine', 'pug')
};
