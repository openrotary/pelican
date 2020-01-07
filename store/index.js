export const state = () => ({
    isDrag: false
})

export const mutations = {
    changeDragStatus(state, status) {
        state.isDrag = status
    }
}
