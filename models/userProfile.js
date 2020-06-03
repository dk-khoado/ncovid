var db =require('./index');

class userModel {

    constructor() {      
    }

    themMoi(body) {
        db.getConnection(function (err, connection) {                      
            connection.beginTransaction();
            var sql = "INSERT INTO users (ho_ten, CMND, nam_sinh, gioi_tinh, quoc_tich,dia_chi, tinh_thanh, quan_huyen, phuong_xa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            var sqlSucKhoe = "INSERT INTO suc_khoe_user (user_id, lo_trinh_di_chuyen, sot, ho, kho_tho, dau_hong, buon_non, tieu_chay) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            connection.query(sql,
                [body.hoTen, body.CMND, body.namSinh, body.gioiTinh, body.quocTich, body.diaChi, body.tinhThanh, body.quanHuyen, body.phuongXa],
                function (err, result) {
                    if (err) {
                        db.rollback();
                        return;
                    }
                    console.log(result);
                    connection.query(sqlSucKhoe,
                        [result.insertId, body.lo_trinh_di_chuyen, body.sot, body.ho, body.kho_tho, body.dau_hong, body.buon_non, body.tieu_chay],
                        function (err, result) {
                            if (err) {
                                connection.rollback();
                                connection.release();
                            }
                            db.commit((error) => {
                                if (error) {
                                    connection.rollback();                                   
                                }
                                connection.release();
                            })
                        });
                });

        });
    }

    kiemTraCMND(CMND, callback) {
        db.getConnection((err, connection) => {          
            var sql = "SELECT CMND FROM users WHERE CMND = ?"
            connection.query(sql, [CMND], (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    if (result.length > 0) {
                        callback(null, true);
                    } else {
                        callback(null, false);
                    }
                }
                connection.release();
            })
        })
    }

    getAll(callback) {
        db.getConnection((err, connection) => {         
            var sql = "SELECT users.*, sku.lo_trinh_di_chuyen, sku.buon_non, sku.dau_hong, sku.ho, sku.kho_tho, sku.sot, sku.tieu_chay FROM users LEFT JOIN suc_khoe_user sku ON users.id = sku.user_id"
            connection.query(sql, (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, result);
                }
                connection.release();
            })
        })
    }

    getAllCachLy(callback) {
        db.getConnection((err, connection) => {
            var sql = "CALL getCachLy()"
            connection.query(sql, (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, result);
                }
                connection.release();
            })
        })
    }



    themNguoiCachLy(id, soNgayCachLy, callback) {
        db.getConnection((err, connection) => {
            var today = new Date();
            var sql = "CALL themCachLy(?,?,?,?, @username);"
            connection.query(sql, [id, soNgayCachLy, today, randomPassword(6)], (error, result) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {
                    callback(null, result);
                }
                connection.release();
            })
        })
    }

    dangNhap(username, password, callback = (error, result) => { }) {
        db.getConnection((err, connection) => {
            var sql = "CALL dangNhap(?,?);"
            connection.query(sql, [username, password], (error, result) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {
                    console.log(result[0][0]);
                    callback(null, result[0][0]);
                }
                connection.release();
            })
        })
    }

    changePassFirst(username, password, oldPassword, callback = (error, result) => { }) {
        db.getConnection((err, connection) => {
            var sql = "CALL doiMatKhauLanDau(?,?, ?);"
            connection.query(sql, [username, password, oldPassword], (error, result) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {
                    console.log(result[0][0]);
                    callback(null, result[0][0]);
                }
                connection.release();
            })
        })
    }

    checkIn(longitude, latitude, status, userID, callback = (error, result) => { }) {
        db.getConnection((err, connection) => {
            console.log("long:"+ longitude + ":"+ latitude);
            var sql = "CALL checkIn(? ,? ,? ,?,?);"
            connection.query(sql, [longitude, latitude, userID, status, new Date()], (error, result) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {
                    console.log(result);
                    callback(null, result);
                }
                connection.release();
            })
        })
    }

    getCachLyByID(id, callback = (error, result)=>{}){
        db.getConnection((err, connection) => {
            var sql = "CALL getByID(?)"
            connection.query(sql, [id], (error, result) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {
                    
                    callback(null, result[0][0]);
                }
                connection.release();
            })
        })
    }

    capNhatThongTin(id,body, callback = (error, result)=>{}){        
        db.getConnection((err, connection) => {
            var sql = "CALL capNhatThongTin(?, ? ,? ,? ,? ,? ,?, ?)"
            connection.query(sql, [id, body.hoTen, body.CMND, body.namSinh, body.gioiTinh, body.quocTich, body.diaChi, body.lo_trinh_di_chuyen], (error, result) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {
                    
                    callback(null, result[0][0]);
                }
                connection.release();
            })
        })
    }

    getHistoryCheckIn(id,callback = (error, result)=>{}){
        db.getConnection((err, connection) => {  
            var sql = "CALL getHistoryCheckIn(?)"
            connection.query(sql,id , (error, result) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {                    
                    callback(null, result);
                }
                connection.release();
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