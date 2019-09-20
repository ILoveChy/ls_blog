var mysql = require('mysql');

function createConnection() {
    var connection = mysql.createConnection({
        host: "192.168.31.92",
        port: "3306",
        user: "root",
        password: "Ls_526995687",
        database: "ls_bolg"
    });
    return connection;
}

module.exports.createConnection = createConnection;
