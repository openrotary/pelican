#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const commander = require('commander')
const start = require('./index')
const server = require('./server')

commander.version('1.0.0')

commander
    .command('ui')
    .description('检查并获取配置文件')
    .action(async () => {
        console.log('start Pelican UI')
        start()
        server()
    })

// 用于解析命令行参数
commander.parse(process.argv)
