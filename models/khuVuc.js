var db = require('./index');

class khuVuc {

    constructor() {
        db = require('./index');
    }

    themThanhPho(name, callback) {
        db.connect(function (err) {
            var sql = "INSERT INTO thanh_pho (name) VALUES (?)";
            db.query(sql,
                [name],
                function (err, result) {
                    if (err)
                        callback(err)
                    else
                        callback(null, result);
                });
        });


    }

    themQuanHuyen(idThanhPho, name, callback) {
        db.connect(function (err) {
            var sql = "INSERT INTO quan_huyen (name, id_thanh_pho) VALUES (?, ?)";
            db.query(sql,
                [name, idThanhPho],
                function (err, result) {
                    if (err)
                        callback(err);
                    else
                        callback(null, result);
                });
        });


    }
    themPhuongXa(id_quan_huyen, name, callback) {
        db.connect(function (err) {          
            var sql = "INSERT INTO phuong_xa (name, id_quan_huyen) VALUES (?, ?)";
            db.query(sql,
                [name, id_quan_huyen],
                function (err, result) {
                    if (err)
                        callback(err);
                    else
                        callback(null, result);
                });
        });

    }

    getThanhPho(callback) {
        db.connect(function (err) {
            var sql = "SELECT * FROM thanh_pho";
            db.query(sql, (err, result, fields) => {
                if (err)
                    console.log(err);
                else {
                    callback(null, result);
                }
            });
        });
    }

    getQuanHuyen(id, callback) {
        db.connect(function (err) {
        });

        var sql = "SELECT * FROM quan_huyen WHERE id_thanh_pho = ?";
        db.query(sql, id, (err, result, fields) => {
            if (err)
                console.log(err);
            else {
                callback(null, result);
            }
        });

    }

    getPhuongXa(id, callback) {
        db.connect(function (err) {
        });

        var sql = "SELECT * FROM phuong_xa WHERE id_quan_huyen = ?";
        db.query(sql, [id],(err, result, fields) => {
            if (err)
                console.log(err);
            else {
                callback(null, result);
            }
        });
    }

}

module.exports = khuVuc;