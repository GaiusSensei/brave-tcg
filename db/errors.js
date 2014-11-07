var errors = {};
errors.get = function getF(num) {
    if(num === 1) {
        return {
            errorCode: 1,
            errorDesc: "Error: Login Failed; Please check Username & Password."
        }
    } else if(num === 2) {
        return {
            errorCode: 2,
            errorDesc: "Error: Login Failed; Username Banned/Deactivated."
        }
    }
};
errors.parse = function parseF(err) {
    return {
        errorCode: 65535,
        errorDesc: "Error: Something Went Wrong (db: " + err.toString() + ")."
    }
}
module.exports = errors;