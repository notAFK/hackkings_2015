var mysql = require('mysql');
 
// Connects to the database.
var client = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

var getUsers = function(callback){
    var query = 'select * from Users';

    client.query(query, function(error, result){
        if (!error) {
            var users = result.map(function(key){
                return result[key];
            });
        }

        callback(error, users);
    });
};

var getUser = function(callback, username){
    var query = 'select * from Users where username = ?';
    var parameters = [username];

    client.query(query, parameters, function(error, result){
        if (!error) {
            var user = result[0];
        }

        callback(error, user);
    }); 
};

var createUser = function(callback, username, email, password){
    var query = 'insert into Users (username, email, password) VALUES(?, ?, ?)';
    var parameters = [username, email, password];

    client.query(query, parameters, function(error, result){
        callback(error);
    });
};

var login = function(callback, username, password){
    var query = 'select * from Users where username = ? and password = ?';
    var parameters = [username, password];

    client.query(query, parameters, function(error, result) {
        if (!error) {
            var user = result[0];
        }

        callback(error, user);
    });
};

var getZones = function(callback){
    var query = 'select * from Zones';

    client.query(query, function(error, result){
        if (!error) {
            var zones = result.map(function(key){
                return result[key];
            });
        }

        callback(error, zones);
    });
};

var getZone = function(callback, id){
    var query = 'select * from Zones where id = ?';
    var parameters = [id];

    client.query(query, parameters, function(error, result){
        if (!error) {
            var zone = result[0];
        }

        callback(error, zone);
    });
};