var express = require('express');
var globalConfig = require('./config');
var app = new express();
var loader = require('./loader');

app.use(express.static('./page/'));

app.post('/editEveryDay', loader.get('/editEveryDay'));
app.get('/queryEveryDay', loader.get('/queryEveryDay'));

app.listen(globalConfig.port, function () {
    console.log('服务器已启动');
})