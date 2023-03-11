const db = require('../db/db');

function getAllMasken(callback) {
    db.executeQuery('SELECT * FROM maske', [], (err, results) => {
        if (err) {
            console.error(err);
            callback(err);
            return;
        }

        callback(results);
        console.log(results);
    });
};

function insertMaske(name, bild, callback) {
    const values = {
        name: name,
        bild: bild,
    }
    db.executeQuery('INSERT INTO theme SET ?', values, (err, results) => {
        if (err) {
            console.error(err);
            callback(err);
            return;
        }
        callback(results);
        console.log(results);
    });

}

function deleteMaske(name, bild, callback) {
    //TODO DELETE
    /*db.executeQuery('INSERT INTO maske (maskeID, bild, ) VALUES(?,?)', [name, bild], (err, results) => {
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
    getAllMasken,
    insertMaske,
    deleteMaske
};