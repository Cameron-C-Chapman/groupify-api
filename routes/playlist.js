const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');
const requestUtils = require('../utils/requestUtils');

/**
 * Get the playlists for the given user.
 * 
 * Headers: 
 *      REQUIRED: Authorization: Bearer <SPOTIFY ACCESS TOKEN>
 * 
 * @returns {Object} Spotify playlists.  
 */
router.get('/me', (req, res) => {
    const spotify = new SpotifyWebApi({
        accessToken: requestUtils.getAccessTokenFromHeader(req.get('Authorization'))
    });
    spotify.getUserPlaylists()
    .then((response) => {
        const playlists = { playlists: response.body.items };
        res.status(200).json(playlists);
    })
    .catch((error) => {
        res.status(error.statusCode).send(error.message);
    });
});

/**
 * Get the playlist for a specific playlist id and user id.
 * 
 * Headers: 
 *      REQUIRED: Authorization: Bearer <SPOTIFY ACCESS TOKEN>
 * 
 * @returns {Object} Spotify playlist.  
 */
router.get('/:playlistId/user/:userId', (req, res) => {
    const spotify = new SpotifyWebApi({
        accessToken: requestUtils.getAccessTokenFromHeader(req.get('Authorization'))
    });
    spotify.getPlaylist(req.params.userId, req.params.playlistId)
    .then((response) => {
        res.status(200).json(response.body);
    })
    .catch((error) => {
        res.status(error.statusCode).send(error.message);
    });
});

/**
 * Get the playlists for a specific spotify user id.
 * 
 * Headers: 
 *      REQUIRED: Authorization: Bearer <SPOTIFY ACCESS TOKEN>
 * 
 * @returns {Object} Spotify playlists.  
 */
router.get('/user/:userId', (req, res) => {
    const spotify = new SpotifyWebApi({
        accessToken: requestUtils.getAccessTokenFromHeader(req.get('Authorization'))
    });
    spotify.getUserPlaylists(req.params.userId)
    .then((response) => {
        const playlists = { playlists: response.body.items };
        res.status(200).json(playlists);
    })
    .catch((error) => {
        res.status(error.statusCode).send(error.message);
    });
});

module.exports = router;
