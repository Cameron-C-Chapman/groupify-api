const { User, Group } = require('../persist');
const SpotifyService = require('./spotify');
const Spotify = require('spotify-web-api-node');

const getSavedTracks = member => {
  const spotify = new Spotify();
  return User.getAuth({ id: member.id })
    .then(auth => {
      spotify.setAccessToken(auth.access_token);
      return spotify.getMySavedTracks()
        .then(data => {
          return Promise.resolve(data.body.items.map(item => item.track.uri));
        });
    });
};

const flatten = listOfLists => {
  let master = [];
  listOfLists.forEach(list => list.forEach(item => master.push(item)));
  return master;
};

const update = params => {
  const { group_id } = params;

  return Group.get({ group_id }).then(group => {
    return Group.members({ group_id })
      .then(members => {
        console.log('members: ' + members.length);
        return Promise.all(members.map(getSavedTracks));
      }).then(trackUris => {
        return User.getAuth({ id: group.user_id })
          .then(auth => {
            return SpotifyService.addToPlaylist({ auth, tracks: flatten(trackUris), playlist_id: group.playlist_id });
          });
      });
  });
};

module.exports = {
  update,
};
