const db = require('../db/db');


function getAllBlacklistEntries(callback) {
    db.executeQuery('SELECT * FROM blacklist', [], (err, results) => {
        if (err) {
            console.error(err);
            callback(err);
            return;
        }

        callback(results);
        console.log(results);
    });
};

function insertBlacklistEntry(name, callback) {
    db.executeQuery('INSERT INTO blacklist (name) VALUES(?)', [name], (err, results) => {
        if (err) {
            console.error(err);
            callback(err);
            return;
        }
        callback(results);
        console.log(results);
    });

}

module.exports = {
    getAllBlacklistEntries,
    insertBlacklistEntry
};