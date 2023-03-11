const db = require('../db/db');

function getAllThemes(callback) {
    db.executeQuery('SELECT * FROM theme', [], (err, results) => {
        if (err) {
            console.error(err);
            callback(err);
            return;
        }

        callback(results);
        console.log(results);
    });
};

function insertTheme(themeName, farbe1, farbe2, farbe3, farbe4, callback) {
    const values = {
        name: themeName,
        farbe1: farbe1,
        farbe2: farbe2,
        farbe3: farbe3,
        farbe4: farbe4
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

function deleteTheme(themeID, callback) {
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
    getAllThemes,
    insertTheme,
    deleteTheme
};