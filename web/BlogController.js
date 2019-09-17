var blogDao = require('../dao/blogDao');
var tagsDao = require('../dao/tagsDao');
var tagBlogMappingDao = require('../dao/tagBlogMappingDao');
var resUtil = require('../util/resUtil');
var timeUtil = require('../util/timeUtil');
var url = require("url");

var path = new Map();

function queryBlogByPage(req, res) {
    var params = url.parse(req.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), result => {
        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, "");
            result[i].content = result[i].content.replace(/<[^<>]+>/g, "");
            result[i].content = result[i].content.substring(0, 300);
        }
        res.writeHead(200);
        res.write(resUtil.writeResult("success", "查询成功", result));
        res.end();
    })
}

function editBlog(req, res) {
    var params = url.parse(req.url, true).query;
    var tags = params.tags.replace(/ /g, "").replace("，", ",");
    req.on("data", data => {
        blogDao.insertBlog(params.title, data.toString(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), result => {
            res.writeHead(200);
            res.write(resUtil.writeResult("success", "添加成功", null));
            res.end();
            var blogId = result.insertId;
            var tagList = tags.split(",");
            for (let i = 0; i < tagList.length; i++) {
                if (tagList[i] == "") {
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        })
    })
}

function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, result => {
        if (result == null || result.length == 0) {
            insertTag(tag, blogId);
        } else {
            tagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), success => {

            });
        }
    })
}

function insertTag(tag, blogId) {
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), result => {
        insertTagBlogMapping(result.insertId, blogId, timeUtil.getNow(), timeUtil.getNow(), success => {

        });
    })
}

function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), result => {

    })
}



function queryBlogCount(req, res) {
    blogDao.queryBlogCount(result => {
        res.writeHead(200);
        res.write(resUtil.writeResult("success", "查询成功", result));
        res.end();
    })
}

function queryBlogById(req, res) {
    var params = url.parse(req.url, true).query;
    blogDao.queryBlogById(parseInt(params.bid), result => {
        res.writeHead(200);
        res.write(resUtil.writeResult("success", "查询成功", result));
        res.end();
        blogDao.addViews(parseInt(params.bid), (result) => {})
    })
}

function queryAllBlog(req, res) {
    blogDao.queryAllBlog(result => {
        res.writeHead(200);
        res.write(resUtil.writeResult("success", "查询成功", result));
        res.end();
    })
}

function queryHotBlog(req, res) {

    blogDao.queryHotBlog(10, result => {
        res.writeHead(200);
        res.write(resUtil.writeResult("success", "查询成功", result));
        res.end();
    })
}
path.set("/queryHotBlog", queryHotBlog)
path.set("/queryAllBlog", queryAllBlog)
path.set("/queryBlogById", queryBlogById)
path.set("/editBlog", editBlog);
path.set("/queryBlogByPage", queryBlogByPage);
path.set("/queryBlogCount", queryBlogCount);

module.exports.path = path;