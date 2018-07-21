const { user: User, user_auth: User_auth, group: Group, } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
    id: group_id,
  });
};

const members = params => {
  return get(params).then(group => group.getMembers());
};

module.exports = {
  create,
  join,
  get,
  members,
};