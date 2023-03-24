const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '172.17.0.1',
  user: 'root',
  password: '123456789',
  database: 'wordcloud',
  port: '3306'
});

function executeQuery(query, params, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      callback(err, null);
      return;
    }
    connection.query(query, params, (error, results, fields) => {
      connection.release();

      if (error) {
        callback(error, null);
        return;
      }

      callback(null, results);
    });
  });
}


/*connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});


connection.query('SELECT * FROM user', (err, rows) => {
  if (err) throw err;
  console.log(rows);
});

connection.end((err) => {
  if (err) throw err;
  console.log('Connection closed.');
}); */

module.exports = {
  executeQuery
};