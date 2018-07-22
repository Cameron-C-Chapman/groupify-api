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

const create = params => {
  const { name, user_id, spotify_id } = params;
  const spotify = new Spotify();

  return User.getAuth({ id: user_id })
    .then(auth => {
      spotify.setAccessToken(auth.access_token);
      // return spotify.createPlaylist('2zhj9omwsh7jh26ajvo0cewq4', name)
      return spotify.getPlaylist('2zhj9omwsh7jh26ajvo0cewq4', '1LgLvRbrzB1XE2d7G3nJKk')
        .then(data => create(
          return Group.setPlaylistId({ group_id, playlist_id: data.body.id, });
        });
    });
};

module.exports = {
  update,
  create,
};
