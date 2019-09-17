var dbutil = require('./dbutil');

function insertBlog(title, content, tags, views, ctime, utime, success) {
    var insertSql = 'insert into blog (`title`, `content`,`tags`, `views`,`ctime`, `utime`) values (?,?,?,?,?,?)';
    var params = [title, content, tags, views, ctime, utime];
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

function queryBlogByPage(page, pageSize, success) {
    var querySql = "select * from blog order by id desc limit ?, ?;";
    var params = [page * pageSize, pageSize];
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

function queryBlogCount(success) {
    var querySql = "select count(1) as count from blog;";
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

function queryBlogById(id, success) {
    var querySql = "select * from blog where id = ?;";
    var params = [id];
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

function queryAllBlog(success) {
    var querySql = "select * from blog;";
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

function addViews(id, success) {
    var insertSql = 'update blog set views = views + 1 where id = ?';
    var params = [id];
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

function queryHotBlog(size, success) {
    var insertSql = 'select * from blog order by views desc limit ?;';
    var params = [size];
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
module.exports = {
    queryHotBlog: queryHotBlog,
    addViews: addViews,
    queryAllBlog: queryAllBlog,
    insertBlog: insertBlog,
    queryBlogByPage: queryBlogByPage,
    queryBlogCount: queryBlogCount,
    queryBlogById: queryBlogById
}