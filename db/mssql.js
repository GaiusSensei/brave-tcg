var express = require('express');
var db = require('mssql');
// initialize variables
var app = express();
db.config = {
    user: "",
    password: "",
    server: "",
    database: "",
    options: {
        encrypt: true
    }
}
// database setup
if(app.get('env') === 'development') {
    var codiodb = require('../.dev.js');
    db.config.user = codiodb.brave_tcgdb_userid;
    db.config.password = codiodb.brave_tcgdb_password;
    db.config.server = codiodb.brave_tcgdb_server;
    db.config.database = codiodb.brave_tcgdb_database;
} else {
    db.config.user = process.env.brave_tcgdb_userid;
    db.config.password = process.env.brave_tcgdb_password;
    db.config.server = process.env.brave_tcgdb_server;
    db.config.database = process.env.brave_tcgdb_database;
}
// methods
db.heartbeat = function heartbeatF(s, callback) {
    db.connect(db.config, function(err) {
        var req = new db.Request();
        req.query('select \'' + s + '\' as beat', function(err, recordset) {
            var r = "";
            if(err) {
                console.dir("Error: " + err);
                r = "Error: " + err;
            } else {
                console.dir(recordset);
                r = recordset[0].beat.toString();
            }
            callback(r);
        });
    });
};
db.query = function queryF(input, query, callback) {
    db.connect(db.config, function(err) {
        var req = new db.Request();
        input.forEach(function(i){
            req.input(i.paramKey, i.paramType, i.paramValue);
        });
        req.query(query, callback);
    });
};
module.exports = db;