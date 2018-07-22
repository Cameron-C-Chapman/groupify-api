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
  const { name, user_id } = params;
  return Group.create({
      name, user_id,
    }, {}).then(group => {
      return join({ group_id: group.id, user_id, }).then(j => group);
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
        group.addMember(user);
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

const getAll = params => {
  const { user_id } = params;
  return params ? Group.findAll( { where: { user_id: user_id }} ) : Group.findAll();
};

const members = params => {
  return get(params).then(group => group.getMembers());
};

module.exports = {
  create: extract(create),
  join: extract(join),
  get: extract(get),
  getAll: extractList(getAll),
  members: extractList(members),
};
