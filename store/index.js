export const state = () => ({
    isDrag: false,
    cacheElement: null
})

export const mutations = {
    changeDragStatus(state, status) {
        state.isDrag = status
    },
    setCacheElement(state, data) {
        state.cacheElement = data
    }
}
