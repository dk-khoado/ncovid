var db = require('./index');
class khuVuc {

    constructor() {

    }

    themThanhPho(name, callback) {
        db.getConnection(function (err, connection) {
            var sql = "INSERT INTO thanh_pho (name) VALUES (?)";
            connection.query(sql,
                [name],
                function (err, result) {
                    if (err)
                        callback(err)
                    else
                        callback(null, result);

                    connection.release();
                });
        });
    }

    themQuanHuyen(idThanhPho, name, callback) {
        db.getConnection(function (err, connection) {
            var sql = "INSERT INTO quan_huyen (name, id_thanh_pho) VALUES (?, ?)";
            connection.query(sql,
                [name, idThanhPho],
                function (err, result) {
                    if (err)
                        callback(err);
                    else
                        callback(null, result);
                    connection.release();
                });
        });


    }
    themPhuongXa(id_quan_huyen, name, callback) {
        db.getConnection(function (err, connection) {
            var sql = "INSERT INTO phuong_xa (name, id_quan_huyen) VALUES (?, ?)";
            connection.query(sql,
                [name, id_quan_huyen],
                function (err, result) {
                    if (err)
                        callback(err);
                    else
                        callback(null, result);
                    connection.release();
                });
        });

    }

    getThanhPho(callback) {
        db.getConnection(function (err, connection) {
            var sql = "SELECT * FROM thanh_pho";
            connection.query(sql, (err, result, fields) => {
                if (err)
                    callback(err, []);
                else {
                    callback(null, result);
                }
                connection.release();
            });
        });
    }

    getQuanHuyen(id, callback) {
        db.getConnection(function (err, connection) {
            var sql = "SELECT * FROM quan_huyen WHERE id_thanh_pho = ?";
            connection.query(sql, id, (err, result, fields) => {
                if (err)
                    console.log(err);
                else {
                    callback(null, result);
                }
                connection.release();
            });
        });

    }

    getPhuongXa(id, callback) {
        db.getConnection(function (err, connection) {
            var sql = "SELECT * FROM phuong_xa WHERE id_quan_huyen = ?";
            connection.query(sql, [id], (err, result, fields) => {
                if (err)
                    console.log(err);
                else {
                    callback(null, result);
                }
                connection.release();
            });
        });
    }
}

module.exports = khuVuc;