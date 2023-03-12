const db = require('../db/db');

function getAllUmfragen(callback) {
    db.executeQuery('SELECT * FROM umfrage', [], (err, results) => {
        if (err) {
            console.error(err);
            callback(err);
            return;
        }

        callback(results);
        console.log(results);
    });
};

function getCurrentUmfrage(umfrageID, callback) {
    db.executeQuery('SELECT * FROM umfrage WHERE umfrageid = ?', umfrageID, (err, results) => {
        if (err) {
            console.error(err);
            callback(err);
            return;
        }

        callback(results);
        console.log(results);
    });
};

function insertUmfrage(umfrageName, teilnehmerAnzahl, maxBegriffeTeilnehmer, zeitlimit, umfrageCode, themeID, maskeID, schriftartID, hintergrundfarbe, erstellerID, callback) {
    const values = {
        name: umfrageName,
        teilnehmerAnzahl: teilnehmerAnzahl,
        maxBegriffeTeilnehmer: maxBegriffeTeilnehmer,
        zeitlimit: zeitlimit,
        umfrageCode: umfrageCode,
        themeID: themeID,
        maskeID: maskeID,
        schriftartID: schriftartID,
        hintergrundfarbe: hintergrundfarbe,
        erstellerID: erstellerID
    }
    db.executeQuery('INSERT INTO umfrage SET ?', values, (err, results) => {
        if (err) {
            console.error(err);
            callback(err);
            return;
        }
        callback(results);
        console.log(results);
    });

}

function updateUmfrage(umfrageID, umfrageName, teilnehmerAnzahl, maxBegriffeTeilnehmer, zeitlimit, umfrageCode, themeID, maskeID, schriftartID, hintergrundfarbe, erstellerID, callback) {
    const values = {
        name: umfrageName,
        teilnehmerAnzahl: teilnehmerAnzahl,
        maxBegriffeTeilnehmer: maxBegriffeTeilnehmer,
        zeitlimit: zeitlimit,
        umfrageCode: umfrageCode,
        themeID: themeID,
        maskeID: maskeID,
        schriftartID: schriftartID,
        hintergrundfarbe: hintergrundfarbe,
        erstellerID: erstellerID,
        umfrageID: umfrageID,
    }
    db.executeQuery('UPDATE umfrage SET name = ?, teilnehmerAnzahl = ?, maxBegriffeTeilnehmer = ?, zeitlimit = ?, umfrageCode = ?, themeID = ?, maskeID = ?, schriftartID = ?, hintergrundfarbe = ?, erstellerID = ? WHERE umfrageID = ?', values, (err, results) => {
        if (err) {
            console.error(err);
            callback(err);
            return;
        }
        callback(results);
        console.log(results);
    });

}

function deleteUmfrage(themeID, callback) {
    //TODO DELETE
    /*db.executeQuery('INSERT INTO maske (maskeID, bild, ) VALUES(?,?)', [maskeID, bild], (err, results) => {
        if (err) {
            console.error(err);
            callback(err);
            return;
        }
        callback(results);
        console.log(results);
    });*/

}

module.exports = {
    getAllUmfragen,
    insertUmfrage,
    deleteUmfrage,
    updateUmfrage,
    getCurrentUmfrage
};