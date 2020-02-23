export const state = () => ({
    isDrag: false,
    // modeCode: 1,
    treeType: 1,
    moveElement: null,
    editElement: null,
    activeMid: null,
    selectCssMid: null,
    fileContent: null,
    activePath: null,
    copyTree: null
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
    setSelectCssMid(state, data) {
        state.selectCssMid = data
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
    },
    setCopyTree(state, value) {
        state.copyTree = value
    }
    // changeModeCode(state, code) {
    //     state.modeCode = code
    // }
}
