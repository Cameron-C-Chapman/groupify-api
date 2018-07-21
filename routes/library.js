const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');
const requestUtils = require('../utils/requestUtils');

const DEFAULT_LIMIT = 25;
const DEFAULT_OFFSET = 0;

/**
 * Get all saved albums for the given user.
 * 
 * Headers: 
 *      REQUIRED: Authorization: Bearer <SPOTIFY ACCESS TOKEN>
 * 
 * Query Parameters:
 *      OPTIONAL: limit
 *      OPTIONAL: offset
 * 
 * @returns {Array} Spotify album objects   
 */
router.get('/albums', (req, res) => {
    const spotify = new SpotifyWebApi({
        accessToken: requestUtils.getAccessTokenFromHeader(req.get('Authorization'))
    });
    spotify.getMySavedAlbums({
        limit: req.query.limit ? req.query.limit : DEFAULT_LIMIT,
        offset: req.query.offset ? req.query.offset : DEFAULT_OFFSET,
    })
    .then((response) => {
        res.status(200).json(response.body.items);
    })
    .catch((error) => {
        res.status(error.statusCode).send(error.message);
    });
});

/**
 * Determine if the given album id's are present in the current users library.
 * 
 * Headers: 
 *      REQUIRED: Authorization: Bearer <SPOTIFY ACCESS TOKEN>
 * 
 * Query Parameters:
 *      REQUIRED: ids (comma seperated list of album ids)
 * 
 * @returns {Array} boolean    
 */
router.get('/albums/contains', (req, res) => {
    const spotify = new SpotifyWebApi({
        accessToken: requestUtils.getAccessTokenFromHeader(req.get('Authorization'))
    });
    spotify.containsMySavedAlbums(req.query.ids.split(','))
    .then((response) => {
        res.status(200).json(response.body);
    })
    .catch((error) => {
        res.status(error.statusCode).send(error.message);
    });
});

/**
 * Get all saved tracks for the given user.
 * 
 * Headers: 
 *      REQUIRED: Authorization: Bearer <SPOTIFY ACCESS TOKEN>
 * 
 * Query Parameters:
 *      OPTIONAL: limit
 *      OPTIONAL: offset
 * 
 * @returns {Array} Spotify track objects   
 */
router.get('/tracks', (req, res) => {
    const spotify = new SpotifyWebApi({
        accessToken: requestUtils.getAccessTokenFromHeader(req.get('Authorization'))
    });
    spotify.getMySavedTracks({
        limit: req.query.limit ? req.query.limit : DEFAULT_LIMIT,
        offset: req.query.offset ? req.query.offset : DEFAULT_OFFSET,
    })
    .then((response) => {
        res.status(200).json(response.body.items);
    })
    .catch((error) => {
        res.status(error.statusCode).send(error.message);
    });
});

module.exports = router;
