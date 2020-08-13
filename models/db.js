var mysql = require("mysql");

function getConnection(callback) {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sms",
    multipleStatements: true,
  });

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });
  callback(connection);
}
//export
module.exports = {
  //getResult
  getResults: function (sql, callback) {
    //getConnection
    getConnection(function (connection) {
      //connection.query
      connection.query(sql, function (error, results) {
        if (error) {
          callback([]);
        } else {
          callback(results);
        }
      });
      //connection end
      connection.end(function (err) {
        console.log("Connection End...");
      });
    });
  },
};
