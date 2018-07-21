const { User, Group } = require('./index');
const models = require('../models');

models.sequelize.sync({force:true}).then(() => {
  return User.create({
    username: 'foo',
    display_name: 'bar',
    spotify_id: 'fjeoiw',
    spotify_uri: 'spotify:app:foo',
    email: 'foo@bar.com',
  }).then(user => {
    console.log(user);
    return Group.create({
      name: "foo's group",
      user_id: user.id,
    }).then(group => {
      console.log(group);
      // Group.members({group_id: group.id}).then(console.log);
      return Group.members({group_id: group.id}).then(members => {
        members.map(console.log);
        // console.log(members);
      });
    });
  });
}).then(() => process.exit());
