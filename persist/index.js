const models = require('../models');

// models.sequelize.sync({force:true}); // .then(() => process.exit());

module.exports = {
  User: require('./user'),
  Group: require('./group'),
};
