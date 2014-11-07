var express = require('express');
var router = express.Router();
var db = require('../db/mssql');
/* GET home page. */
router.get('/', function(req, res) {
    db.heartbeat("Express", function(a) {
        res.render('index', {
            title: a
        });
    });
});
module.exports = router;