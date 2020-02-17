const createCssSelectNode = select => ({
    select,
    isSingle: false,
    cssom: {}
})

const hash = new Map()
    .set('0', 'a')
    .set('1', 'b')
    .set('2', 'c')
    .set('3', 'd')
    .set('4', 'e')
    .set('5', 'f')
    .set('6', 'g')
    .set('7', 'h')
    .set('8', 'i')
    .set('9', 'j')

const num2ABC = string =>
    string
        .split('')
        .map(n => hash.get(n) || n)
        .join('')

const createCssom = mid => ({
    _mid: mid,
    _pid: null,
    _index: 0,
    isSingle: false,
    select: `.${num2ABC(mid.slice(-5))}`,
    cssom: {}
})

const cssom2List = styleObj => {
    const byRange = []
    const byValue = []
    for (const key in styleObj) {
        if (styleObj[key]) {
            byRange.push({
                key,
                range: styleObj[key]
            })
            continue
        }
        byValue.push({
            key,
            range: null
        })
    }
    return byRange.concat(byValue)
}

export { createCssom, createCssSelectNode, num2ABC, cssom2List }
