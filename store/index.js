export const state = () => ({
    isDrag: false,
    // modeCode: 1,
    treeType: 1,
    moveElement: null,
    editElement: null,
    activeMid: null,
    fileContent: null,
    activePath: null
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
    },
    setFileContent(state, data) {
        state.fileContent = data
    },
    setActivePath(state, data) {
        state.activePath = data
    },
    setTreeType(state, value) {
        state.treeType = value
    }
    // changeModeCode(state, code) {
    //     state.modeCode = code
    // }
}
