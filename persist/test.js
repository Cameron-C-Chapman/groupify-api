const { User, Group } = require('./index');
const models = require('../models');
const Playlist = require('../service/playlist');

// Playlist.update({ group_id: 1 });

Group.create({ name: 'Cool Group #2', user_id: 1 });

// models.sequelize.sync({force:true}).then(() => {
//   return User.create({
//     username: 'foo',
//     display_name: 'bar',
//     spotify_id: '2zhj9omwsh7jh26ajvo0cewq4',
//     spotify_uri: 'spotify:app:foo',
//     email: 'foo@bar.com',
//   }).then(user => {
//     console.log(user);
//     return User.authenticate({ user_id: user.id, access_token: process.env.ACCESS_TOKEN, expires_in: 900, refresh_token: '', spotify_id: user.spotify_id }).then(() => {
//       return Group.create({ user_id: user.id, user_spotify_id: user.spotify_id, name: "Cool Group #1", });
//     });
//   });
// });
// 
