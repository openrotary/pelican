// 递归遍历目录下所有文件
const fs = require('fs')

function readDirSync(path) {
    const arr = []
    const _path = fs.readdirSync(path)
    _path.forEach(function(ele) {
        const stat = fs.statSync(`${path}/${ele}`)
        if (stat && stat.isDirectory()) {
            if (ele === 'node_modules') {
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

module.exports = {
    readDirSync
}
