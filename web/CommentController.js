var commentDao = require('../dao/commentDao');
var resUtil = require('../util/resUtil');
var timeUtil = require('../util/timeUtil');
var url = require("url");
var captcha = require("svg-captcha");

var path = new Map();

function addComment(req, res) {
    var params = url.parse(req.url, true).query;
    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.parentName, params.userName, params.email, params.comments, timeUtil.getNow(), timeUtil.getNow(), result => {
        res.writeHead(200);
        res.write(resUtil.writeResult("success", "评论成功", result));
        res.end();
    })
}

function queryRandomCode(req, res) {
    var img = captcha.create({
        fontSize: 50,
        width: 100,
        height: 34
    })
    res.writeHead(200);
    res.write(resUtil.writeResult("success", "评论成功", img));
    res.end();
}

function queryCommentsByBlogId(req, res) {
    var params = url.parse(req.url, true).query;
    commentDao.queryCommentsByBlogId(parseInt(params.bid), result => {
        res.writeHead(200);
        res.write(resUtil.writeResult("success", "评论成功", result));
        res.end();
    })
}

function queryCommentsCountByBlogId(req, res) {
    var params = url.parse(req.url, true).query;
    commentDao.queryCommentsCountByBlogId(parseInt(params.bid), result => {
        res.writeHead(200);
        res.write(resUtil.writeResult("success", "评论成功", result));
        res.end();
    })
}

function queryNewComments(req, res) {
    commentDao.queryNewComments(10, result => {
        res.writeHead(200);
        res.write(resUtil.writeResult("success", "评论成功", result));
        res.end();
    })
}
path.set("/queryNewComments", queryNewComments);
path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId);
path.set("/queryRandomCode", queryRandomCode);
path.set("/addComment", addComment);
path.set("/queryCommentsByBlogId", queryCommentsByBlogId);



module.exports.path = path;