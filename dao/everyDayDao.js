var dbutil = require('./dbutil');

function insertEveryDay(content, ctime, success) {
    var insertSql = 'insert into every_day (`content`, `ctime`) values (?,?)';
    var params = [content, ctime];
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

function queryEveryDay(success) {
    var querySql = "select * from every_day order by id desc limit 1;";
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
    insertEveryDay: insertEveryDay,
    queryEveryDay: queryEveryDay
}