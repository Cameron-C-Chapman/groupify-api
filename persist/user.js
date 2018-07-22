const { user: User, user_auth, group: Group, } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const extract = fn => {
  return (...args) => fn(...args).then(ob => {
    return ob.toJSON();
  });
};

const extractList = fn => {
  return (...args) => fn(...args).then(arr => {
    return arr.map(ob => ob.toJSON());
  });
};

const updateAuth = params => {
  const { spotify_id, access_token, refresh_token, expires_in, } = params;

  return user_auth.update({
      access_token, refresh_token, expires_in,
    },
    { where: {
      spotify_id,
    }});
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

const update = (values, params) => {
  return User.update(values, {
    where: params
  });
}

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

const groups = params => {
  return User.findOne({
    where: params,
  }).then(user => user.getGroups());
};

const addFriend = params => {
  const { user_id, friend_id, } = params;
  return User.findOne({
    where: {
      id: user_id,
    }
  }).then(user => {
    return User.findOne({
      where: {
        id: friend_id,
      }
    }).then(friend => {
      return user.addFriend(friend).then(() => friend.addFriend(user));
    });
  });
};

const getFriends = params => {
  const { user_id, } = params;

  return User.findOne({
    where: {
      id: user_id,
    }
  }).then(user => user.getFriend());
};


module.exports = {
  authenticate: extract(authenticate),
  create: extract(create),
  update: update,
  find: find,
  getAuth: extract(getAuth),
  groups: extractList(groups),
  addFriend,
  getFriends: extractList(getFriends),
  updateAuth,
};
