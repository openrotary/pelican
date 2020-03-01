const Router = require('koa-router')
const router = new Router()
const version = require('../package.json')
const { Subject, timer } = require('rxjs')
const { debounce } = require('rxjs/operators')
const { readDirSync, getFileContent, createFile, rewriteFile, deleteFile } = require('./utils')

const _path = process.cwd()
const stream$ = new Subject()

const waitTime = 800 // 延迟800毫秒
stream$.pipe(debounce(() => timer(waitTime))).subscribe(({ path, data }) => {
    rewriteFile(path, data)
})

router
    .get('/getFile', ctx => {
        ctx.type = 'json'
        ctx.body = { code: 0, data: readDirSync(_path) }
    })
    .get('/getFileContent', ctx => {
        const { path } = ctx.query
        ctx.type = 'json'
        ctx.body = { code: 0, data: getFileContent(path) }
    })
    .post('/createFile', ctx => {
        const { path, name, type } = ctx.request.body
        createFile(path, name, type)
        ctx.type = 'json'
        ctx.body = { code: 0, path: `${path}/${name}.${type}` }
    })
    .post('/rewriteFile', ctx => {
        const { path, data } = ctx.request.body
        stream$.next({ path, data })
        ctx.type = 'json'
        ctx.body = { code: 0 }
    })
    .get('/yoyoyo', ctx => {
        console.log('测试接口')
        stream$.next({ path: '/Users/dark/Works/OpenRotary/pelican/test/myIcon.ican', data: '[]' })
        ctx.type = 'json'
        ctx.body = { code: 0 }
    })
    .delete('/deleteFile', (ctx, next) => {
        const { path } = ctx.query
        deleteFile(path)
        ctx.type = 'json'
        ctx.body = { code: 0 }
    })

module.exports = router
