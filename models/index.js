var mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ncovid"
});

// con.connect(function(err) {
//   if (err) throw err;

//   var sql = "SELECT 1";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("test OK");
//   });
// });


module.exports = con;