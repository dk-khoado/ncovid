var mysql = require('mysql');

 var con = mysql.createConnection({
  host: "den1.mysql2.gear.host",
  user: "ncovid",
  password: "khoa_123",
  database: "ncovid",
});

// con.connect(function(err) {
//   if (err) throw err;

//   var sql = "SELECT 1";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("test OK");
//   });
// });
con.on('error', (err)=>{
  console.log(err.message);
  con = mysql.createConnection({
    host: "den1.mysql2.gear.host",
    user: "ncovid",
    password: "khoa_123",
    database: "ncovid",
  });
})

module.exports = con;