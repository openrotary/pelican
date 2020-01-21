#! /usr/bin/env node

const Koa = require('koa')
const cors = require('koa2-cors')
const corsError = require('koa2-cors-error')
const bodyParser = require('koa-bodyparser')
const router = require('./router')

const app = new Koa()

function server() {
    app.use(cors()) // 允许跨域
        .use(corsError())
        .use(bodyParser())
        .use(router.routes())
        .use(router.allowedMethods())

    // 监听
    app.listen(3030, () => {
        console.log('文件服务已开启，监听端口: 3030')
    })
}

module.exports = server
