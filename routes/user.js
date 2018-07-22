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
 *      spotify_id
 * 
 * @returns {Object}    Created user object.
 */
router.post('/', (req, res) => {
    const spotify = new SpotifyWebApi({
        accessToken: requestUtils.getAccessTokenFromHeader(req.get('Authorization'))
    });
    spotify.getUser(req.body.spotifyId)
    .then((response) => {
        const spotifyUser = response.body;
        User.create(
            { 
                username: response.body.display_name,
                display_name: response.body.display_name,
                email: response.body.email,
                spotify_url: response.body.href,
                spotify_uri: response.body.uri,
                spotify_id: response.body.id 
            }, requestUtils.getAccessTokenFromHeader(req.get('Authorization')))
            .then((result) => {
                let mergedUser = userUtils.mergeUserTypes(spotifyUser, result);
                res.status(200).json({ user: mergedUser });
            })
            .catch((error) => {
                console.log('GET /user/me = ', { error: error });
                res.status(500).send('oh schnap, stuff got weird');
            });
    })
    .catch((error) => {
        res.status(error.statusCode).send(error.message);
    });
});

router.put('/:userId', (req, res) => {
    User.update({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        phone_number: req.body.phoneNumber
    }, { id: req.params.userId}).then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        console.log('PUT /user/:userId = ', { error: error, requestParams: req.params, requestBody: req.body });
        res.status(500).send('oh schnap, stuff got weird');
    });
});

module.exports = router;
