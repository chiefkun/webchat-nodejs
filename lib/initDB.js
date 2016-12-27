"use strict";

// Import lib
var config = require('./config.json');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	port: config.port,
	dialect: config.dialect,
	pool: {
		max: config.pool.max,
		min: config.pool.min,
		idle: config.pool.idle
	},
	define: {
		timestamps: false // Disable timestamp
	}
});

///////////////////////////////////////
//////////////// User /////////////////
///////////////////////////////////////
var User = sequelize.define('user', {
	id: {
		type: Sequelize.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	username: {
		unique: true,
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	},
	name: {
		type: Sequelize.STRING
	},
	avatar: {
		type: Sequelize.STRING,
		defaultValue: config.default_ava_path
	}
},{
	freezeTableName: true
});

// User.sync({force: config.isCreated}).then(function() {
// 	return User.create({
// 		username: 'thanh',
// 		password: '123'
// 	});
// });

User.sync({force: config.isCreated});

module.exports = {
	logIn: function(username, password, callback){
		User.findOne({
			where: {username: username,
				password: password},
		}).then(function(user){
			callback(user);
		});
	},
	register: function(username, password, callback){
		User.build({username: username, password: password, name: username}).save().then(function(user){
			callback(user);
		});
	}
};
