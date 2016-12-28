var config = require('../config.json');
module.exports = function (sequelize, DataTypes) {
  console.log('Create table: User');
  var User = sequelize.define('User', {
  	id: {
  		type: DataTypes.BIGINT,
  		autoIncrement: true,
  		primaryKey: true
  	},
  	username: {
  		unique: true,
  		type: DataTypes.STRING
  	},
  	password: {
  		type: DataTypes.STRING
  	},
  	name: {
  		type: DataTypes.STRING
  	},
  	avatar: {
  		type: DataTypes.STRING,
  		defaultValue: config.db.default_ava_path
  	}
  },{
  	freezeTableName: true
  });

  return User;
};
