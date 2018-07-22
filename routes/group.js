const express = require('express');
const router = express.Router();
const PlaylistService = require('../service/playlist');

const { Group } = require('../persist');


router.get('/', (req, res) => {
    Group.getAll()
        .then((groups) => {
            res.status(200).send({ groups: groups });
        })
        .catch(() => {
            console.log('GET /group = ', { error: error });
            res.status(500).status('oh schnap, stuff got weird');
        });
});

router.get('/:groupId', (req, res) => {
    Group.get({ group_id: req.params.groupId })
        .then((group) => {
            res.status(200).send(group);
        })
        .catch(() => {
            console.log('GET /group/:groupId = ', { error: error, requestParams: req.params });
            res.status(500).status('oh schnap, stuff got weird');
        });
});

router.get('/:groupId/member', (req, res) => {
    Group.members({ group_id: req.params.groupId })
        .then((members) => {
            res.status(200).send({ members: members });
        })
        .catch(() => {
            console.log('GET /group/:groupId/members = ', { error: error, requestParams: req.params });
            res.status(500).status('oh schnap, stuff got weird');
        });
});

router.get('/user/:userId', (req, res) => {
    Group.getAll({ spotify_id: req.params.userId })
        .then((groups) => {
            res.status(200).send({ groups: groups });
        })
        .catch((error) => {
            console.log('GET /group/user/:userId = ', { error: error, requestParams: req.params });
            res.status(500).status('oh schnap, stuff got weird');
        });
});

router.post('/', (req, res) => {
    let newGroup = {
        name: req.body.name,
        user_id: req.body.user_id
    };

    Group.create(newGroup)
        .then((group) => {
            res.status(201).send(group);
        })
        .catch((error) => {
            console.log('POST /group = ', { error: error, requestBody: req.body });
            res.status(500).send('oh schnap, stuff got weird');
        });
});

router.post('/:groupId/member', (req, res) => {
    let newGroupMember = {
        group_id: parseInt(req.params.groupId),
        user_id: req.body.user_id
    };

    Group.join(newGroupMember)
        .then((member) => {
            res.status(201).send();
            PlaylistService.update({ group_id: parseInt(req.params.groupId) });
        })
        .catch((error) => {
            console.log('POST /group/:groupId/member = ', { error: error, requestParams: req.params, requestBody: req.body });
            res.status(500).send('oh schnap, stuff got weird');
        });
});

module.exports = router;
