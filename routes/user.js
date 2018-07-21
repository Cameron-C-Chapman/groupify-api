const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');
const requestUtils = require('../utils/requestUtils');
const { User } = require('../persist');

/**
 * Get the user profile for the given user.
 * 
 * Headers: 
 *      REQUIRED: Authorization: Bearer <SPOTIFY ACCESS TOKEN>
 * 
 * @returns {Object} User profile object.  
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
 * @returns {Object} User profile object.  
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

/**
 * Create a user.
 * 
 * POST body params:
 *      username
 *      display_name
 *      email
 *      spotify_url
 *      spotify_uri
 *      spotify_id
 * 
 * @returns {Object}    Created user object.
 */
router.post('/', (req, res) => {
    let newUser = {
        username: req.body.username,
        display_name: req.body.displayName,
        email: req.body.email,
        spotify_url: req.body.spotifyUrl,
        spotify_uri: req.body.spotifyUri,
        spotify_id: req.body.spotifyId
    };

    User.create(newUser)
        .then((user) => {
            res.status(201).send(user);
        })
        .catch(() => {
            console.log('POST /user = ', { error: error, requestBody: req.body });
            res.status(500).status('oh schnap, stuff got weird');
        });
});

module.exports = router;
