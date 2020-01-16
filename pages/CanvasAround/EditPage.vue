<template lang="tea">
section {
    :class: ['edit-page', {'show': hasEditElement}]
    i.close {
        @click: handleClose
    }
    ul {
        li {
            %: getEditElement
            ~~{{$_i}} ~ {{$it}}
        }
    }
}
</template>
<script>
import bus from '@/utils/eventBus'
export default {
    name: 'EditPage',
    methods: {
        handleClose() {
            // 清空缓存中的信息
            this.$store.commit('setEditElement', null)
        }
    },
    computed: {
        getEditElement() {
            return this.$store.state.editElement
        },
        hasEditElement() {
            return !!this.$store.state.editElement
        }
    }
}
</script>
<style lang="stylus" scoped>
    .edit-page {
        position: fixed;
        transition: all 0.6s ease;
        width: 400px;
        z-index: 2;
        border-radius: 10px;
        box-shadow: 0 0 10px #55295C;
        background: #fff;
        top: 100vh;
        bottom: 0;
        right: 415px;

        &.show {
            top: 70px;
            right: 415px;
            bottom: 15px;
        }

        .close {
            position: absolute;
            right: 10px;
            top: 10px;
            display: block;
            width: 25px;
            height: 25px;
            cursor: pointer;
            background-size: 100% 100%;
            background-position: center center;
            background-repeat: no-repeat;
            background-image: url('../../assets/icon-close.svg');
        }
    }
</style>