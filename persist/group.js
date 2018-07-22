const { user: User, user_auth: User_auth, group: Group, } = require('../models');
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

const create = params => {
  const { name, user_id, user_spotify_id, } = params;
  return Group.create({
      name, user_id,
    }, {}).then(group => {
      return join({ group_id: group.id, user_id, }).then(j => group);
    });
};

const setPlaylistId = params => {
  const { playlist_id, group_id, } = params;

  return Group.update({
      playlist_id,
    }, {
      where: {
        id: {
          [Op.eq]: group_id,
        }
      }
    });
};

const join = params => {
  const { group_id, user_id } = params;
  return User.findOne({
      where: {
        id: user_id,
      },
  }).then(user => {
      return Group.findOne({
        where: {
          id: group_id,
        }
      }).then(group => {
        return group.addMember(user);
      });
  });
};

const get = params => {
  const { group_id } = params;
  return Group.findOne({
    where: {
      id: group_id,
    },
  });
};

const members = params => {
  return get(params).then(group => group.getMembers());
};

module.exports = {
  create: extract(create),
  join: extract(join),
  get: extract(get),
  members: extractList(members),
  setPlaylistId,
};
