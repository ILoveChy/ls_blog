var dbutil = require('./dbutil');

function insertTag(tags, ctime, utime, success) {
    var insertSql = 'insert into tags (`tag`, `ctime`,`utime`) values (?,?,?)';
    var params = [tags, ctime, utime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, (err, res) => {
        if (err == null) {
            success(res);
        } else {
            console.log(err);
        }
    });
    connection.end();
}


function queryTag(tag, success) {
    var querySql = "select * from tags where tag = ?;";
    var params = [tag];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (err, res) => {
        if (err == null) {
            success(res);
        } else {
            console.log(err);
        }
    });
    connection.end();
}


function queryAllTag(success) {
    var querySql = "select * from tags;";
    var params = [];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (err, res) => {
        if (err == null) {
            success(res);
        } else {
            console.log(err);
        }
    });
    connection.end();
}
module.exports = {
    queryAllTag: queryAllTag,
    insertTag: insertTag,
    queryTag: queryTag
}