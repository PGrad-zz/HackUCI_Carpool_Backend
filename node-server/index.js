var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'client',
  password : 'k2KV1FfkoOGa',
  database : 'rideshare_db'
});

connection.connect();

connection.query('SHOW COLUMNS FROM users', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.end();
