const Router = require('koa-router')
const router = new Router()
const { readDirSync } = require('./getDir')

const _path = process.cwd()

router.get('/getFile', (ctx, next) => {
    console.log('arrive')
    ctx.response.type = 'json'
    ctx.response.body = { data: readDirSync(_path) }
})

module.exports = router
