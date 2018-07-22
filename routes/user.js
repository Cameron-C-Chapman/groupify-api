const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');
const requestUtils = require('../utils/requestUtils');
const userUtils = require('../utils/userUtils');
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
        const spotifyUser = response.body;
        User.find({ spotify_id: response.body.id })
            .then((result) => {
                let mergedUser = userUtils.mergeUserTypes(spotifyUser, result[0].dataValues);
                res.status(200).json({ user: mergedUser });
            })
            .catch((error) => {
                console.log('GET /user/me = ', { error: error });
                res.status(500).status('oh schnap, stuff got weird');
            });
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
        const spotifyUser = response.body;
        User.find({ spotify_id: response.body.id })
            .then((result) => {
                let mergedUser = userUtils.mergeUserTypes(spotifyUser, result[0].dataValues);
                res.status(200).json({ user: mergedUser });
            })
            .catch((error) => {
                console.log('GET /user/me = ', { error: error });
                res.status(500).status('oh schnap, stuff got weird');
            });
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
        spotify_id: req.body.spotifyId,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        phone_number: req.body.phoneNumber
    };

    User.create(newUser, requestUtils.getAccessTokenFromHeader(req.get('Authorization')))
        .then((user) => {
            res.status(201).send(user);
        })
        .catch((error) => {
            console.log('POST /user = ', { error: error, requestBody: req.body });
            res.status(500).status('oh schnap, stuff got weird');
        });
});

module.exports = router;
