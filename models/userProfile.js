var db = require('./index');

class userModel {

    constructor() {  
        db = require('./index');
    }

    themMoi(body) {
        db.connect(function (err) {
            if (err) {
                console.error('Error:- ' + err.stack);
            }
            db.beginTransaction();
            var sql = "INSERT INTO users (ho_ten, CMND, nam_sinh, gioi_tinh, quoc_tich,dia_chi, tinh_thanh, quan_huyen, phuong_xa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            var sqlSucKhoe = "INSERT INTO suc_khoe_user (user_id, lo_trinh_di_chuyen, sot, ho, kho_tho, dau_hong, buon_non, tieu_chay) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            db.query(sql,
                [body.hoTen, body.CMND, body.namSinh, body.gioiTinh, body.quocTich, body.diaChi, body.tinhThanh, body.quanHuyen, body.phuongXa],
                function (err, result) {
                    if (err) {
                        db.rollback();
                        return;
                    }
                    console.log(result);
                    db.query(sqlSucKhoe,
                        [result.insertId, body.lo_trinh_di_chuyen, body.sot, body.ho, body.kho_tho, body.dau_hong, body.buon_non, body.tieu_chay],
                        function (err, result) {
                            if (err) {
                                db.rollback();
                            }
                            db.commit((error) => {
                                if (error) {
                                    db.rollback();
                                    db.end();
                                }
                            })
                        });
                });

        });
    }

    kiemTraCMND(CMND, callback) {
        db.connect((err) => {
            if (err) {
                console.error('Error:- ' + err.stack);
            }
            var sql = "SELECT CMND FROM users WHERE CMND = ?"
            db.query(sql, [CMND], (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    if (result.length > 0) {
                        callback(null, true);
                    } else {
                        callback(null, false);
                    }
                }
            })
        })
    }

    getAll(callback) {
        db.connect((err) => {
            if (err) {
                console.error('Error:- ' + err.stack);
            }
            var sql = "SELECT users.*, sku.lo_trinh_di_chuyen, sku.buon_non, sku.dau_hong, sku.ho, sku.kho_tho, sku.sot, sku.tieu_chay FROM users LEFT JOIN suc_khoe_user sku ON users.id = sku.user_id"
            db.query(sql, (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, result);
                }
            })
        })
    }

    getAllCachLy(callback) {
        db.connect((err) => {
            var sql = "CALL getCachLy()"
            db.query(sql, (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, result);
                }
            })
        })
    }



    themNguoiCachLy(id, soNgayCachLy, callback) {
        db.connect((err) => {
            var today = new Date();
            var sql = "CALL themCachLy(?,?,?,?, @username);"
            db.query(sql, [id, soNgayCachLy, today, randomPassword(6)], (error, result) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {
                    callback(null, result);
                }
            })
        })
    }

    dangNhap(username, password, callback = (error, result) => { }) {
        db.connect((err) => {
            var sql = "CALL dangNhap(?,?);"
            db.query(sql, [username, password], (error, result) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {
                    console.log(result[0][0]);
                    callback(null, result[0][0]);
                }
            })
        })
    }

    changePassFirst(username, password, oldPassword, callback = (error, result) => { }) {
        db.connect((err) => {
            var sql = "CALL doiMatKhauLanDau(?,?, ?);"
            db.query(sql, [username, password, oldPassword], (error, result) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {
                    console.log(result[0][0]);
                    callback(null, result[0][0]);
                }
            })
        })
    }

    checkIn(longitude, latitude, status, userID, callback = (error, result) => { }) {
        db.connect((err) => {
            var sql = "CALL checkIn(? ,? ,? ,?);"
            db.query(sql, [longitude, latitude, userID, status], (error, result) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {
                    console.log(result);
                    callback(null, result);
                }
            })
        })
    }

    getCachLyByID(id, callback = (error, result)=>{}){
        db.connect((err) => {
            var sql = "CALL getByID(?)"
            db.query(sql, [id], (error, result) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {
                    
                    callback(null, result[0][0]);
                }
            })
        })
    }

    capNhatThongTin(id,body, callback = (error, result)=>{}){
        db.connect((err) => {
            var sql = "CALL capNhatThongTin(?, ? ,? ,? ,? ,? ,?, ?)"
            db.query(sql, [id, body.hoTen, body.CMND, body.namSinh, body.gioiTinh, body.quocTich, body.diaChi, body.lo_trinh_di_chuyen], (error, result) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {
                    
                    callback(null, result[0][0]);
                }
            })
        })
    }

    getHistoryCheckIn(id,callback = (error, result)=>{}){
        db.connect((err) => {  
            var sql = "SELECT * FROM `history_checkin` WHERE user_id = ?"
            db.query(sql,id , (error, result) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {                    
                    callback(null, result);
                }
            })            
        })
    }
}

function randomPassword(number) {
    var result = "";
    for (let index = 0; index < number; index++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}

module.exports = userModel;