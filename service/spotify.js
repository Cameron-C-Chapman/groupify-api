const Spotify = require('spotify-web-api-node');

const createPlaylist = params => {
  const { name, user_id, spotify_id, auth } = params;
  const spotify = new Spotify();

  spotify.setAccessToken(auth.access_token);
  return spotify.createPlaylist(auth.spotify_id, name)
    .then(data => data.body);
};

const addToPlaylist = params => {
  const { playlist_id, tracks, auth, } = params;
  console.log('tracks to add = ', tracks);
  if (tracks.length) {
    const spotify = new Spotify();

    spotify.setAccessToken(auth.access_token);
    return spotify.addTracksToPlaylist(auth.spotify_id, playlist_id, tracks)
      .then(data => data.body);
  }
  return Promise.reject();
};

const getPlaylistTracks = params => {
  const { playlist_id, auth, } = params;
  const spotify = new Spotify();

  spotify.setAccessToken(auth.access_token);
  return spotify.getPlaylistTracks(auth.spotify_id, playlist_id)
    .then(data => {
      return Promise.resolve(data.body.items.map(item => item.track.uri));
    });
};

module.exports = {
  createPlaylist,
  addToPlaylist,
  getPlaylistTracks,
};
