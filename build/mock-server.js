var path = require('path')
var express = require('express')
var devIp = require('dev-ip'); //用来获取本机ip地址
var mock = require('express-mockjs')
var request = require('supertest');

var app = express();
var host = devIp();

console.warn = function () {};

app.use('/mocks', mock(path.join(process.cwd(), 'mocks')))

// 这里可以添加你的自定义代码.
app.listen(8082, function () {
    console.log('mock server listening at http://localhost:8082/mocks');
});
