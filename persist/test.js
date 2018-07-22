const { User, Group } = require('./index');
const models = require('../models');
const Playlist = require('../service/playlist');

User.groups({ id: 1 }).then(console.dir);

// Playlist.update({ group_id: 1 });

// models.sequelize.sync({force:true}).then(() => {
//   return User.create({
//     username: 'Cam',
//     display_name: 'Camron',
//     spotify_id: '2zhj9omwsh7jh26ajvo0cewq4',
//     spotify_uri: 'spotify:app:foo',
//     email: 'foo@bar.com',
//   }).then(user => {
//     console.log(user);
//     return User.authenticate({ user_id: user.id, access_token: process.env.ACCESS_TOKEN, expires_in: 900, refresh_token: '', spotify_id: user.spotify_id }).then(() => {
//       Group.create({ name: 'Cool Group #2', user_id: 1 });
//       return Group.create({ user_id: user.id, name: "Cool Group #1", });
//     });
//   });
// });
// 
