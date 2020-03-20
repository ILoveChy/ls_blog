var blogDao = require('../dao/blogDao');
var tagsDao = require('../dao/tagsDao');
var tagBlogMappingDao = require('../dao/tagBlogMappingDao');
var resUtil = require('../util/resUtil');
var timeUtil = require('../util/timeUtil');
var url = require("url");

var path = new Map();

function queryRandomTags(req, res) {
  tagsDao.queryAllTag(result => {
    result.sort(() => {
      return Math.random() > 0.5 ? true : false
    });
    res.writeHead(200);
    res.write(resUtil.writeResult("success", "查询成功", result));
    res.end();
  })
}

function queryByTag(req, res) {
  var params = url.parse(req.url, true).query;
  console.log(params);

  tagsDao.queryTag(params.tag, function (result) {
    if (result == null || result.length == 0) {
      res.writeHead(200);
      res.write(resUtil.writeResult("success", "查询成功", result));
      res.end();
    } else {
      console.log(result[0].id, parseInt(params.page), parseInt(params.pageSize));

      tagBlogMappingDao.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), result => {
        var blogList = [];
        for (let i = 0; i < result.length; i++) {
          blogDao.queryBlogById(result[i].blog_id, result => {
            blogList.push(result[0]);
          })
        }
        getResult(blogList, result.length, res);

      })
    }

  })

}

function getResult(blogList, len, res) {
  if (blogList.length < len) {
    setTimeout(function () {
      getResult(blogList, len, res)
    }, 10)
  } else {
    for (let i = 0; i < blogList.length; i++) {
      blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/, "");
      blogList[i].content = blogList[i].content.replace(/<[^<>]+>/g, "");
      blogList[i].content = blogList[i].content.substring(0, 300);
    }
    res.writeHead(200);
    res.write(resUtil.writeResult("success", "查询成功", blogList));
    res.end();
  }
}

function queryByTagCount(req, res) {
  var params = url.parse(req.url, true).query;
  tagsDao.queryTag(params.tag, result => {
    tagBlogMappingDao.queryByTag(result[0].id, result => {
      res.writeHead(200);
      res.write(resUtil.writeResult("success", "查询成功", result));
      res.end();
    })
  })
}


path.set("/queryRandomTags", queryRandomTags);
path.set("/queryByTag", queryByTag);
path.set("/queryByTagCount", queryByTagCount);

module.exports.path = path;