#!/usr/bin/env node

const commander = require('commander')
const start = require('./index')
const server = require('./server')
// const spawn = require('cross-spawn')
// const which = require('npm-which')(__dirname)

commander.version('1.0.0')

commander
    .command('ui [isDev]')
    .description('检查并获取配置文件')
    .action(async (isDev = '') => {
        console.log('start Pelican UI')
        // console.log(which.sync('nuxt'))
        start(isDev === 'dev')
        server()
    })

// 用于解析命令行参数
commander.parse(process.argv)
