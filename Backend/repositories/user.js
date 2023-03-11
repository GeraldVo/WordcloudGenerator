const db = require('../db/db');


function getAllUsers(callback) {
    db.executeQuery('SELECT * FROM user', [], (err, results) => {
        if (err) {
            console.error(err);
            callback(err);
            return;
        }

        callback(results);
        console.log(results);
    });
};

function insertUser(id, password, role, callback) {
    db.executeQuery('INSERT INTO user (benutzerID, password, role) VALUES(?,?,?)', [id, password, role], (err, results) => {
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
    getAllUsers,
    insertUser
};