// 递归遍历目录下所有文件
const fs = require('fs')
const prettier = require('prettier')
const Leaf = require('@openrotary/leafjs')
const stylusFormat = require('stylus-supremacy')
// const consola = require('consola')

function readDirSync(path) {
    const arr = []
    const _path = fs.readdirSync(path)
    _path.forEach(function(ele) {
        const stat = fs.statSync(`${path}/${ele}`)
        if (stat && stat.isDirectory()) {
            if (['node_modules', '.git'].includes(ele)) {
                arr.unshift({
                    value: `${path}/${ele}`,
                    label: ele,
                    expand: false,
                    children: [
                        {
                            value: null,
                            label: '该文件夹内容不展示',
                            expand: false,
                            children: []
                        }
                    ]
                })
            } else {
                arr.unshift({
                    children: readDirSync(`${path}/${ele}`),
                    value: `${path}/${ele}`,
                    label: ele,
                    expand: false
                })
            }
        } else {
            // 文件
            arr.push({
                label: ele,
                value: `${path}/${ele}`,
                children: null,
                expand: true
            })
        }
    })
    // 排序处理
    const node = arr.filter(ele => ele.label === 'node_modules')
    const dispear = arr.filter(ele => ele.label.indexOf('.') === 0)
    const other = arr.filter(ele => ele.label.indexOf('.') !== 0 && ele.label !== 'node_modules')
    return [].concat(node, dispear, other)
}

const getFileContent = path => {
    const content = fs.readFileSync(path, { encoding: 'utf-8' }, err => {
        err && console.log('报错：', err)
    })
    return content
}

const createFile = (path, name, type) => {
    fs.writeFile(`${path}/${name}.${type}`, JSON.stringify([]), 'utf8', err => {
        err && console.log('创建文件失败：', err)
    })
    if (type === 'ican') {
        fs.writeFile(`${path}/${name}.vue`, '', 'utf8', err => {
            err && console.log('创建文件失败：', err)
        })
    }
}
const deleteFile = path => {
    if (!fs.statSync(path).isDirectory()) {
        // 删除单个文件
        fs.unlinkSync(path)
        return
    }
    // 删除文件夹以其以下的文件
    let files = []
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path)
        files.forEach(file => {
            let curPath = path + '/' + file
            if (fs.statSync(curPath).isDirectory()) {
                delDir(curPath) //递归删除文件夹
            } else {
                fs.unlinkSync(curPath) //删除文件
            }
        })
        fs.rmdirSync(path)
    }
}

const getJSCode = string => {
    const startIndex = string.lastIndexOf('<script')
    if (!~startIndex) {
        return null
    }
    const endIndex = string.lastIndexOf('<style')
    if (!~endIndex) {
        return string.slice(startIndex)
    }
    return string.slice(0, endIndex).slice(startIndex)
}

const rewriteFile = (path, data) => {
    fs.writeFile(path, data, 'utf8', err => {
        err && console.log('重写.ican文件失败：', err)
    })
    const vuePath = path.replace(/\.ican/, '.vue')
    const content = fs.readFileSync(vuePath, { encoding: 'utf-8' }, err => {
        err && console.log('报错：', err)
    })
    const jsContent = getJSCode(content)
    if (!jsContent) {
        console.log('提取js代码出错', content, jsContent)
    }
    // 再写一次.vue文件
    const treeData = Leaf.data2tree(JSON.parse(data))
    // 生成html
    const DOM = Leaf.tree2DOM(treeData)
    // 生成css
    // const CSS = Leaf.tree2CSS(treeData).replace(/(\S+)\s{\s+}/gm, '')
    const CSS = Leaf.tree2CSS(treeData).replace(/.\S+\s{\s+?}/gm, '')
    const htmlCode = `<template> ${DOM} </template>`
    const jsCode = jsContent || `<script>export default {}</script>`
    const cssCode = `<style lang="stylus" scoped> ${stylusFormat.format(CSS, {
        insertColons: true,
        insertSemicolons: true,
        insertBraces: true
    })} </style>`
    const formatConfig = { semi: false, tabWidth: 4, parser: 'vue' }
    let formatCode = ''
    try {
        formatCode =
            prettier.format(htmlCode, formatConfig) +
            prettier.format(jsCode, formatConfig) +
            prettier.format(cssCode, formatConfig)
    } catch (err) {
        // 有可能是因为li标签嵌套了li标签
        console.log('格式化代码失败，有可能是因为li标签嵌套了li标签')
        return
    }
    fs.writeFile(vuePath, formatCode, 'utf8', err => {
        err && console.log('重写.vue文件失败：', err)
    })
}

// const rewriteFileSync = (path, data) => {
//     return new Promise((resolve, reject) => {
//         fs.writeFileSync(path, data)
//         const vuePath = path.replace(/\.ican/, '.vue')
//         const content = fs.readFileSync(vuePath)
//         const jsContent = getJSCode(content)
//         if (!jsContent) {
//             console.log('提取js代码出错', content, jsContent)
//         }
//         // 再写一次.vue文件
//         const treeData = Leaf.data2tree(JSON.parse(data))
//         // 生成html
//         const DOM = Leaf.tree2DOM(treeData)
//         // 生成css
//         // const CSS = Leaf.tree2CSS(treeData).replace(/(\S+)\s{\s+}/gm, '')
//         const CSS = Leaf.tree2CSS(treeData)
//         const htmlCode = `<template> ${DOM} </template>`
//         const jsCode = jsContent || `<script>export default {}</script>`
//         const cssCode = `<style lang="stylus" scoped> ${stylusFormat.format(CSS, {
//             insertColons: true,
//             insertSemicolons: true,
//             insertBraces: true
//         })} </style>`
//         const formatConfig = { semi: false, tabWidth: 4, parser: 'vue' }
//         let formatCode = ''
//         try {
//             formatCode =
//                 prettier.format(htmlCode, formatConfig) +
//                 prettier.format(jsCode, formatConfig) +
//                 prettier.format(cssCode, formatConfig)
//         } catch (err) {
//             // 有可能是因为li标签嵌套了li标签
//             console.log('格式化代码失败，有可能是因为li标签嵌套了li标签')
//             reject('格式化代码失败，有可能是因为li标签嵌套了li标签')
//         }
//         fs.writeFileSync(vuePath, formatCode)
//         resolve()
//     })
// }

module.exports = {
    readDirSync,
    getFileContent,
    createFile,
    rewriteFile,
    // rewriteFileSync,
    deleteFile
}
