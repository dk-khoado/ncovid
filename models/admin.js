var db = require('./index');
class admin {

    constructor() {

    }

    login(username, password, callback) {
        db.getConnection(function (err, connection) {
            var sql = "CALL admin_login(? ,?)";
            connection.query(sql,
                [username, password],
                function (err, result) {
                    if (err)
                        callback(err);
                    else
                        callback(null, result);
                    connection.release();
                });
        });

    }
}

module.exports = admin;