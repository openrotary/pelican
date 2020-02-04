const createCssom = mid => ({
    _mid: mid,
    _pid: null,
    _index: 0,
    isSingle: false,
    select: `.${mid.slice(-5)}`,
    cssom: {}
})

const createCssSelect = select => ({
    select,
    isSingle: false,
    cssom: {}
})

export { createCssom, createCssSelect }
