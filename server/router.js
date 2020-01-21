const Router = require('koa-router')
const router = new Router()
const { readDirSync, getFileContent, createFile } = require('./utils')

const _path = process.cwd()

router
    .get('/getFile', (ctx, next) => {
        ctx.type = 'json'
        ctx.body = { code: 0, data: readDirSync(_path) }
    })
    .get('/getFileContent', (ctx, next) => {
        const { path } = ctx.query
        ctx.type = 'json'
        ctx.body = { code: 0, data: getFileContent(path) }
    })
    .post('/createFile', (ctx, next) => {
        const { path, name, type } = ctx.query
        createFile(path, name, type)
        ctx.type = 'json'
        ctx.body = { code: 0 }
    })
    .delete('/deleteFile', (ctx, next) => {
        const { path } = ctx.query
        ctx.type = 'json'
        ctx.body = { code: 0 }
    })

module.exports = router
