var mysql = require('mysql');

function createConnection() {
    var connection = mysql.createConnection({
        host: "39.96.212.171",
        port: "3306",
        user: "root",
        password: "Ls_526995687",
        database: "ls_bolg"
    });
    return connection;
}

module.exports.createConnection = createConnection;