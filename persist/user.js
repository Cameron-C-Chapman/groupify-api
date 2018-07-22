const { user: User, user_auth, group: Group, } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const extract = fn => {
  return (...args) => fn(...args).then(ob => {
    return ob.toJSON();
  });
};

const authenticate = (params) => {
  const { access_token, refresh_token, expires_in, user_id } = params;
  return user_auth.findOne({
    where: {
      user_id,
    }}).then(auth => {
      return auth.update({ access_token, refresh_token, expires_in, user_id, });
    });
};

const create = (params, accessToken) => {
  return User.create(params).then(user => {
    return user_auth.create({ user_id: user.id, spotify_id: user.spotify_id, access_token: accessToken }).then(auth => {
      user.setAuth(auth);
      return user;
    });
  });
};

const find = (params) => {
  return User.findAll({
    where: params,
  });
};

const getAuth = params => {
  return User.findOne({
    where: params,
  }).then(user => user.getAuth());
};

module.exports = {
  authenticate: extract(authenticate),
  create: extract(create),
  find: extract(find),
  getAuth: extract(getAuth),
};
