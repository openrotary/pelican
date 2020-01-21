// 递归遍历目录下所有文件
const fs = require('fs')
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
            arr.push({
                label: ele,
                value: `${path}/${ele}`,
                children: [],
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
}
const deleteFile = path => {
    fs.unlinkSync(path)
    // 删除文件夹或文件
    // let files = []
    // if (fs.existsSync(path)) {
    //     files = fs.readdirSync(path)
    //     files.forEach(file => {
    //         let curPath = path + '/' + file
    //         if (fs.statSync(curPath).isDirectory()) {
    //             delDir(curPath) //递归删除文件夹
    //         } else {
    //             fs.unlinkSync(curPath) //删除文件
    //         }
    //     })
    //     fs.rmdirSync(path)
    // }
}

module.exports = {
    readDirSync,
    getFileContent,
    createFile,
    deleteFile
}
