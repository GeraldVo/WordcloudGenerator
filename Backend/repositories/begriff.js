const db = require('../db/db');

function insertBegriff(begriff, umfrageID, callback) {
    const newBegriff = { name: begriff, umfrageID };
    db.executeQuery('INSERT INTO begriff SET ?', newBegriff, (err, results) => {
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
    insertBegriff
};