"use strict";
var multer = require('multer');
const config = require('../config/config');

var upload = function(){};

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, config.upload.realAvaPath);
    },
    filename: function (req, file, callback) {
      upload.prototype.setName(Date.now() + file.originalname);
      callback(null, upload.prototype.getName());
    }
});

upload.prototype.setName = function(name) {this.name = name;}
upload.prototype.getName = function() {return this.name;}

upload.prototype.getPath = function() {return config.upload.avaPath + this.name;}

upload.prototype.upload = multer({ storage: Storage }).any();

module.exports = upload;
