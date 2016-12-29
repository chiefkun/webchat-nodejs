"use strict";
const db = require('../models');

var HistoryRepository = {
  saveMsg: function(msg) {
    return db.History.build({
      username: msg.username, name: msg.name, avatar: msg.avatar, time: msg.time, message: msg.msg
    }).save();
  },
  getHistory: function(limit) {
    var limit = this.limit || 50;

    // return db.History.findAll({ limit: limit, order: '"createdAt" DESC' });
    return db.History.findAll({ limit: limit, group: 'id',
      order: [[db.sequelize.fn('max', db.sequelize.col('createdAt')), 'ASC']]
    });
  }
};

module.exports = HistoryRepository;
