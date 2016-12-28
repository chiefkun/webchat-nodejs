module.exports = function (sequelize, DataTypes) {
  console.log('Create table: History');
  var history = sequelize.define('History', {
  	id: {
  		type: DataTypes.UUID,
  		defaultValue: DataTypes.UUIDV4,
  		primaryKey: true
  	},
    username: {
  		type: DataTypes.STRING
  	},
  	name: {
  		type: DataTypes.STRING
  	},
  	avatar: {
  		type: DataTypes.STRING
  	},
  	message: {
  		type: DataTypes.STRING
  	},
  	time: {
  		type: DataTypes.STRING
  	}
  },{
  	freezeTableName: true,
  	timestamps: true
  });

  return history;
};
