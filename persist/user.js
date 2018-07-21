const { user, user_auth, group, } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const authenticate = (params) => {
  const { access_token, refresh_token, expires_in, user_id } = params;
  user_auth.update({
      access_token,
      refresh_token,
      expires_in,
    },
    {
      where: {
        user_id: {
          [Op.eq]: user_id
        }
      }
    });
};

const create = (params) => {
  const { username, display_name } = params;

  return user.create({
    username, display_name
  }).then(user => {
    user_auth.create({ user_id: user.id });
    return user;
  });
};

const find = (params) => {
  return user.findAll({
    where: params,
  });
};

module.exports = {
  authenticate,
  create,
  find,
};
