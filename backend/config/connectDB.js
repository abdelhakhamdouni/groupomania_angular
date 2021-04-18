const mysql = require("mysql");

module.exports = (params) =>
  new Promise((resolve, reject) => {
    const connection = mysql.createConnection(params);
    connection.connect((error) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }
      resolve(connection);
    });
  });
