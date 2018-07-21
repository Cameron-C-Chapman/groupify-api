const { User, Group } = require('./index');
const models = require('../models');

models.sequelize.sync({force:true}).then(() => {
  return User.create({
    username: 'foo',
    display_name: 'bar',
  }).then(user => {
    return Group.create({
      name: "foo's group",
      user_id: user.id,
    }).then(group => {
      // Group.members({group_id: group.id}).then(console.log);
      Group.members({group_id: group.id}).then(m => {
        console.log(m);
      });
    });
  });
});
