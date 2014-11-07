var express = require('express');
var router = express.Router();
/* GET auth/login */
router.get('/auth/login', function(req, res) {
    // Validation
    if(!req.query.hasOwnProperty('username') || !req.query.hasOwnProperty('password')) {
        res.statusCode = 400;
        return res.send('Error 400: Get syntax incorrect.');
    }
    // Auth Login
    var auth = require('../db/auth');
    auth.login(req.query.username, req.query.password, function(result, data) {
        if(result === 0) {
            res.json({
                errorCode:0,
                errorDesc:"",
                userId: data.ID,
                userName: data.username
            });
        } else {
            res.json(data);
        }
    });
});
module.exports = router;