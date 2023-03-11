const express = require('express');
const router = express.Router();
const userRepository = require('../repositories/user');
const begriffRepository = require('../repositories/begriff');
const blacklistRepository = require('../repositories/blacklist');
const themeRepository = require('../repositories/theme')
const maskeRepository = require('../repositories/maske')

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/user', function (req, res) {
    userRepository.getAllUsers((user, error) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error getting Users');
            return
        }
        res.status(200).send(user);
    });
});

router.post('/user', function (req, res) {
    const { name, password } = req.body;
    userRepository.insertUser(name, password, "lecturer", (user, error) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error inserting User');
            return
        }
        res.status(200).send(user);
    });
});

router.post('/begriff', function (req, res) {
    const { begriff, umfrageID } = req.body;
    begriffRepository.insertBegriff(begriff, umfrageID, (begriff, error) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error inserting Begriff');
            return
        }
        res.status(200).send(begriff);
    });
});

router.get('/begriff/:umfrageid', function (req, res) {
    const umfrageID = req.params.umfrageid;
    begriffRepository.getAllBegriffFromUmfrage(umfrageID, (user, error) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error getting Begriffe zu Umfrage: ' + umfrageID);
            return
        }
        res.status(200).send(user);
    });
});

router.get('/blacklist', function (req, res) {
    blacklistRepository.getAllBlacklistEntries((blacklistEntry, error) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error getting BlacklistEntries');
            return
        }
        return res.status(200).send(blacklistEntry);
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
        return res.status(200).send(blacklistEntry);
    });
});


router.get('/maske', function (req, res) {
    maskeRepository.getAllMasken((maske, error) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error getting masken');
            return
        }
        return res.status(200).send(maske);
    });
});

router.post('/maske', function (req, res) {
    const { name, bild } = req.body;
    maskeRepository.insertMaske(name, bild, (maske, error) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error inserting maske');
            return
        }
        return res.status(200).send(maske);
    });
});

router.get('/theme', function (req, res) {
    themeRepository.getAllThemes((theme, error) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error getting theme');
            return
        }
        return res.status(200).send(theme);
    });
});

router.post('/theme', function (req, res) {
    const { name, farbe1, farbe2, farbe3, farbe4 } = req.body;
    themeRepository.insertTheme(name, farbe1, farbe2, farbe3, farbe4, (theme, error) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error inserting theme');
            return
        }
        return res.status(200).send(theme);
    });
});






module.exports = router;