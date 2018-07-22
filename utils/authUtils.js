const getAccessTokenFromHeader = require('./requestUtils').getAccessTokenFromHeader;
const persist = require('../persist');

const writeAuth = (req, res, next) => {
  let access_token = req.get('Authorization');
  let spotify_id = req.get('X-Spotify-ID');
  if (access_token && spotify_id) {
    access_token = getAccessTokenFromHeader(access_token);
    persist.User.updateAuth({
      spotify_id, access_token,
    }).then(() => next());
  } else {
    next();
  }
};

module.exports = writeAuth;
