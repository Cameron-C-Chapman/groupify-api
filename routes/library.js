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
 * @returns {Object} Spotify album objects   
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
        const albums = { albums: response.body.items };
        res.status(200).json(albums);
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
 * @returns {Object} Map of album ids to boolean values representing if the album is saved for the user or not    
 */
router.get('/albums/contains', (req, res) => {
    const spotify = new SpotifyWebApi({
        accessToken: requestUtils.getAccessTokenFromHeader(req.get('Authorization'))
    });
    const albumIds = req.query.ids.split(',');
    spotify.containsMySavedAlbums(albumIds)
    .then((response) => {
        let albumIdsMap = albumIds.map((id, ix) => {
            let obj = {};
            obj[id] = response.body[ix];
            return obj;
        });
        res.status(200).json({ albumContainsMap: albumIdsMap });
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
 * @returns {Object} Spotify track objects   
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
        const tracks = { tracks: response.body.items };
        res.status(200).json(tracks);
    })
    .catch((error) => {
        res.status(error.statusCode).send(error.message);
    });
});

module.exports = router;
