var dbutil = require('./dbutil');

function insertComment(blogId, parent, parentName, userName, email, comments, ctime, utime, success) {
    var insertSql = 'insert into comments (`blog_id`,`parent`,`parent_name`,`user_name`,`email`,`comments`,`ctime`, `utime`) values (?,?,?,?,?,?,?,?)';
    var params = [blogId, parent, parentName, userName, email, comments, ctime, utime];
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

function queryCommentsByBlogId(blogId, success) {
    var querySql = "select * from comments where blog_id = ?;";
    var params = [blogId];
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

function queryCommentsCountByBlogId(blogId, success) {
    var querySql = "select count(1) as count from comments where blog_id = ?;";
    var params = [blogId];
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

function queryNewComments(blogId, success) {
    var querySql = "select * from comments order by id desc limit ?;";
    var params = [blogId];
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
    queryNewComments: queryNewComments,
    insertComment: insertComment,
    queryCommentsByBlogId: queryCommentsByBlogId,
    queryCommentsCountByBlogId: queryCommentsCountByBlogId
}