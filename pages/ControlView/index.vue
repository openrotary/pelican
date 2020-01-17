<template lang="tea">
    section {
        :class: ['control-view', {'active': hasEditElement}]
        LayoutModel
    }
</template>
<script>
import LayoutModel from './LayoutModel'
export default {
    name: 'ControlView',
    components: {
        LayoutModel
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
        right: -500px;
        top: 70px;
        bottom: 15px;
        z-index: 2;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 10px #55295C;
        background: #fff;
        // 延时半秒
        transition: all 0.6s ease 0.5s;

        &.active {
            bottom: 15px;
            right: 20px;
        }
    }
</style>