var everyDayDao = require('../dao/everyDayDao');
var path = new Map();
var resUtil = require('../util/resUtil');
var timeUtil = require('../util/timeUtil');

function editEveryDay(req, res) {
    req.on("data", data => {
        everyDayDao.insertEveryDay(data.toString().trim(), timeUtil.getNow(), result => {
            res.writeHead(200);
            res.write(resUtil.writeResult("success", "添加成功", null));
            res.end();
        })
    })
}

function queryEveryDay(req, res) {
    everyDayDao.queryEveryDay(result => {
        res.writeHead(200);
        res.write(resUtil.writeResult("success", "添加成功", result));
        res.end();
    })
}
path.set("/queryEveryDay", queryEveryDay);
path.set("/editEveryDay", editEveryDay);

module.exports.path = path;