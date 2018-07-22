const Spotify = require('spotify-web-api-node');

const createPlaylist = params => {
  const { name, user_id, spotify_id, auth } = params;
  const spotify = new Spotify();

  spotify.setAccessToken(auth.access_token);
  console.dir(params);
  return spotify.createPlaylist(auth.spotify_id, name)
    .then(data => data.body);
};

module.exports = {
  createPlaylist,
};
