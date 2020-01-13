export const state = () => ({
    isDrag: false,
    // modeCode: 1,
    cacheElement: null,
    activeMid: null
})

export const mutations = {
    changeDragStatus(state, status) {
        state.isDrag = status
    },
    setCacheElement(state, data) {
        state.cacheElement = data
    },
    setActiveMid(state, data) {
        state.activeMid = data
    }
    // changeModeCode(state, code) {
    //     state.modeCode = code
    // }
}
