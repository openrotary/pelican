export const state = () => ({
    isDrag: false,
    // modeCode: 1,
    moveElement: null,
    editElement: null,
    activeMid: null
})

export const mutations = {
    changeDragStatus(state, status) {
        state.isDrag = status
    },
    setMoveElement(state, data) {
        state.moveElement = data
    },
    setEditElement(state, data) {
        state.editElement = data
    },
    setActiveMid(state, data) {
        state.activeMid = data
    }
    // changeModeCode(state, code) {
    //     state.modeCode = code
    // }
}
