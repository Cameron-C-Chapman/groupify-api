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

const getTopTracks = member => {
  const spotify = new Spotify();
  return User.getAuth({ id: member.id })
    .then(auth => {
      spotify.setAccessToken(auth.access_token);
      return spotify.getMyTopTracks()
        .then(data => {
          console.log('my top tracks = ', data.body.items);
          return Promise.resolve(data.body.items.map(item => item.uri));
        });
    });
};

const flatten = listOfLists => {
  let master = [];
  listOfLists.forEach(list => list.forEach(item => master.push(item)));
  return master;
};

function executeAllPromises(promises) {
  // Wrap all Promises in a Promise that will always "resolve"
  var resolvingPromises = promises.map(function(promise) {
    return new Promise(function(resolve) {
      var payload = new Array(2);
      promise.then(function(result) {
          payload[0] = result;
        })
        .catch(function(error) {
          payload[1] = error;
        })
        .then(function() {
          /* 
           * The wrapped Promise returns an array:
           * The first position in the array holds the result (if any)
           * The second position in the array holds the error (if any)
           */
          resolve(payload);
        });
    });
  });

  var errors = [];
  var results = [];

  // Execute all wrapped Promises
  return Promise.all(resolvingPromises)
    .then(function(items) {
      items.forEach(function(payload) {
        if (payload[1]) {
          errors.push(payload[1]);
        } else {
          results.push(payload[0]);
        }
      });

      return {
        errors: errors,
        results: results
      };
    });
}

const update = params => {
  const { group_id } = params;

  return Group.get({ group_id }).then(group => {
    return Group.members({ group_id })
      .then(members => {
        return executeAllPromises(members.map(getTopTracks));
      }).then(result => {
        let trackUris = result.results;
        console.log('trackUris = ', trackUris);
        return User.getAuth({ id: group.user_id })
          .then(auth => {
            return SpotifyService.getPlaylistTracks({ auth, playlist_id: group.playlist_id, })
              .then(existingTracks => {
                return SpotifyService.addToPlaylist({ auth, tracks: flatten(trackUris).filter(tr => !existingTracks.includes(tr)), playlist_id: group.playlist_id });
                // return SpotifyService.addToPlaylist({ auth, tracks: flatten(trackUris), playlist_id: group.playlist_id });
              });
          });
      });
  });
};

module.exports = {
  update,
};
