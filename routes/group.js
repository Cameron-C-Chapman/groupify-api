const express = require('express');
const router = express.Router();
const PlaylistService = require('../service/playlist');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);

const { Group } = require('../persist');

/**
 * Get all groups.
 */
router.get('/', (req, res) => {
    Group.getAll()
        .then((groups) => {
            res.status(200).send({ groups: groups });
        })
        .catch((error) => {
            console.log('GET /group = ', { error: error });
            res.status(500).send('oh schnap, stuff got weird');
        });
});

/**
 * Get group by id.
 */
router.get('/:groupId', (req, res) => {
    Group.get({ group_id: req.params.groupId })
        .then((group) => {
            res.status(200).send(group);
        })
        .catch((error) => {
            console.log('GET /group/:groupId = ', { error: error, requestParams: req.params });
            res.status(500).send('oh schnap, stuff got weird');
        });
});

/**
 * Get a groups members.
 */
router.get('/:groupId/member', (req, res) => {
    Group.members({ group_id: req.params.groupId })
        .then((members) => {
            res.status(200).send({ members: members });
        })
        .catch((error) => {
            console.log('GET /group/:groupId/members = ', { error: error, requestParams: req.params });
            res.status(500).send('oh schnap, stuff got weird');
        });
});

/**
 * Get a users groups.
 */
router.get('/user/:userId', (req, res) => {
    Group.getAll({ spotify_id: req.params.userId })
        .then((groups) => {
            res.status(200).send({ groups: groups });
        })
        .catch((error) => {
            console.log('GET /group/user/:userId = ', { error: error, requestParams: req.params });
            res.status(500).send('oh schnap, stuff got weird');
        });
});

router.post('/invite', (req, res) => {
    let message = req.body.message;
    let to = req.body.phone;
    console.dir(req.body);

    twilio.messages
        .create({from: '+19138457817', body: message, to, })
        .then(message => { console.log(message.sid); return message; })
        .then(() => res.status(201).send());
});


/**
 * Create a group.
 */
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

/**
 * Add a user to a group.
 */
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
