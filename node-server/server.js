var express = require('express');
var app = express();
var fs = require("fs");
var mysql      = require('mysql');
var pool = mysql.createPool({
  connectionLimit : '6',
  host            : 'localhost',
  user            : 'client',
  password        : 'k2KV1FfkoOGa',
  database        : 'rideshare_db'
});

app.get('/user/:u_id', function (req, res) {
    pool.query('SELECT * FROM users WHERE id=' + req.params.u_id, 
        function(error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        }
    );
});

app.get('/add_to_table/:t_name', function (req, res) {
    if(req.params.t_name === 'drivers') throw "Can't add drivers table this way.";
    var data = JSON.parse(res.body);
    var col_str = ' ( ';
    var val_str = ' VALUES (';
    for(var key in data)
        col_str += key + ', ';
    col_str = col_str.substring(0, col_str.length - 2) + ' )';
    for(var key in data)
        val_str += data[key] + ', ';
    val_str = val_str.substring(0, val_str.length - 2) + ' )';
    pool.query('INSERT INTO ' + req.params.t_name + col_str + val_str, function(error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.get('/get_drivers/:u_id/:e_id', function(req, res) {
    pool.query('SELECT users.name, users.picture, users.cell, driver_friends.mutual FROM users ' +
               'INNER JOIN driver_friends ' +
               'ON users.id=driver_friends.driver_id ' +
               'JOIN rides ' + 
               'ON driver_friends.driver_id=rides.driver_id ' +
               'WHERE driver_friends.friend_id=' + req.params.u_id + 
               ' AND rides.event_id=' + req.params.e_id,
               function(error, results, fields) {
                    if (error) throw error;
                    var friends = results.filter(function (i, n) {
                        return !n.mutual;
                    });
                    var mutual = results.filter(function (i, n) {
                        return n.mutual;
                    });
                    results = {"friends":friends, "mutual":mutual};
                    res.end(JSON.stringify(results));
               }
    );
    
});

var server = app.listen(8000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
