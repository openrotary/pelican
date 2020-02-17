<template lang="tea">
    section {
        :class: ['control-view', {'active': hasEditElement}]
        EditPage
        EditCss
        LayoutModel
    }
</template>
<script>
import EditPage from './EditPage'
import LayoutModel from './LayoutModel'
import EditCss from './EditCss'
export default {
    name: 'ControlView',
    components: {
        LayoutModel,
        EditCss,
        EditPage
    },
    computed: {
        hasEditElement() {
            return !!this.$store.state.editElement
        }
    }
}
</script>
<style lang="stylus">
.control-view {
    position: fixed;
    right: -1200px;
    top: 70px;
    bottom: 15px;
    z-index: 2;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px #55295C;
    background: #fff;
    display: flex;
    // 延时0.1秒
    transition: all 0.6s ease 0.1s;

    &.active {
        bottom: 15px;
        right: 20px;
    }
}
</style>