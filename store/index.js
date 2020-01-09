export const state = () => ({
    isDrag: false,
    modeCode: 1,
    cacheElement: null
})

export const mutations = {
    changeDragStatus(state, status) {
        state.isDrag = status
    },
    setCacheElement(state, data) {
        state.cacheElement = data
    },
    changeModeCode(state, code) {
        state.modeCode = code
    }
}
