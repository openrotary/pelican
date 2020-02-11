const createCssom = mid => ({
    _mid: mid,
    _pid: null,
    _index: 0,
    isSingle: false,
    select: `.${num2ABC(mid.slice(-5))}`,
    cssom: {}
})

const createCssSelect = select => ({
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

export { createCssom, createCssSelect, num2ABC }
