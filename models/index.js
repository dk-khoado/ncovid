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
function handleDisconnect(conn) {
  con.on('error', function(err) {
    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    console.log('Re-connecting lost connection: ' + err.stack);

    connection = mysql.createConnection(con.config);
    handleDisconnect(connection);
    connection.connect();
  });
}

handleDisconnect(con);

module.exports = con;