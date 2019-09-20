var mysql = require('mysql');

function createConnection() {
    var connection = mysql.createConnection({
        host: "192.168.31.92",
        port: "3306",
        user: "root",
        password: "liangshuai",
        database: "ls_blog"
    });
    return connection;
}

module.exports.createConnection = createConnection;