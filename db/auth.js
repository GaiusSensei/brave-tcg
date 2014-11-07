var db = require('./mssql'),
    errors = require('./errors');
db.login = function loginF(username, password, ipadd, callback) {
    var SHA512 = require("crypto-js/sha512"),
        q = "select top 1 * from dbo.auth where username=@username and password=@password",
        inputParams = [{
            paramKey: "username",
            paramValue: username,
            paramType: db.NVarChar(50)
        }, {
            paramKey: "password",
            paramValue: SHA512(username + "|" + password).toString(),
            paramType: db.NVarChar(128)
        }];
    db.query(inputParams, q, function qr(err, result) {
        if(err) {
            callback(65535, errors.parse(err)); // DB Error
        } else if(result.length === 0) {
            callback(1, errors.get(1)); // No Users Matched
        } else {
            if(result[0].isActive) {
                callback(0, result[0]); // User Authenticated!
            } else {
                callback(2, errors.get(2)); // Inactive User
            }
        }
    });
};
module.exports = db;