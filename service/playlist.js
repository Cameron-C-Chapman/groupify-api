const { User, Group } = require('../persist');
const Spotify = require('spotify-web-api-node');

const getPlaylist = member => {
  const spotify = new Spotify();
  return User.getAuth({ id: member.id })
    .then(auth => {
      console.dir(auth);
      spotify.setAccessToken(auth.access_token);
      spotify.getUserPlaylists()
        .then(data => console.log('Got: ' + JSON.stringify(data.body)));
    });
};

const update = params => {
  const { group_id } = params;

  return Group.members({ group_id })
    .then(members => {
      console.log('members: ' + members.length);
      return members.map(getPlaylist);
    });
};

module.exports = {
  update,
};
