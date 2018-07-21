const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');
const requestUtils = require('../utils/requestUtils');

/**
 * Get the user profile for the given user.
 * 
 * Headers: 
 *      REQUIRED: Authorization: Bearer <SPOTIFY ACCESS TOKEN>
 * 
 * @returns {Array} User profile object.  
 */
router.get('/me', (req, res) => {
    const spotify = new SpotifyWebApi({
        accessToken: requestUtils.getAccessTokenFromHeader(req.get('Authorization'))
    });
    spotify.getMe()
    .then((response) => {
        const user = { user: response.body };
        res.status(200).json(user);
    })
    .catch((error) => {
        res.status(error.statusCode).send(error.message);
    });
});

/**
 * Get the user profile for a specific spotify user id.
 * 
 * Headers: 
 *      REQUIRED: Authorization: Bearer <SPOTIFY ACCESS TOKEN>
 * 
 * @returns {Array} User profile object.  
 */
router.get('/:id', (req, res) => {
    const spotify = new SpotifyWebApi({
        accessToken: requestUtils.getAccessTokenFromHeader(req.get('Authorization'))
    });
    spotify.getUser(req.params.id)
    .then((response) => {
        const user = { user: response.body };
        res.status(200).json(user);
    })
    .catch((error) => {
        res.status(error.statusCode).send(error.message);
    });
});

module.exports = router;
