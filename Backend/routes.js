const express = require('express');
const router = express.Router();
const userRepository = require('./repositories/user');
const begriffRepository = require('./repositories/begriff');
const blacklistRepository = require('./repositories/blacklist')

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/user', function (req, res) {
    userRepository.getAllUsers((error, user) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error getting Users');
            return
        }
        res.status(200).send(res.json(user));
    });


});

router.post('/user', function (req, res) {
    const { name, password } = req.body;
    userRepository.insertUser(name, password, "lecturer", (error, user) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error inserting User');
            return
        }
        res.status(200).send(res.json(user));
    });
});

router.post('/begriff', function (req, res) {
    const { begriff, umfrageID } = req.body;
    begriffRepository.insertBegriff(begriff, umfrageID, (error, begriff) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error inserting Begriff');
            return
        }
        res.status(200).send(res.json(begriff));
    });
});

router.get('/blacklist', function (req, res) {
    blacklistRepository.getAllBlacklistEntries((blacklistEntry, error) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error getting BlacklistEntries');
            return
        }
        return res.status(200).send(res.json(blacklistEntry));
    });
});

router.post('/blacklist', function (req, res) {
    const { name } = req.body;
    blacklistRepository.insertBlacklistEntry(name, (blacklistEntry, error) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error inserting User');
            return
        }
        return res.status(200).send(res.json(blacklistEntry));
    });
});






module.exports = router;