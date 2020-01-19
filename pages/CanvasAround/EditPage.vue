<template lang="tea">
section {
    :class: ['edit-page', {'show': hasEditElement}]
    i.close {
        @click: handleClose
    }
    ul.attr {
        li {
            div.title {
                ~~元素名: {{ getEditElement ? getEditElement.tagName : '' }}
            }
        }
        li {
            div.title {
                ~~是否为单标签: {{ getEditElement ? getEditElement.isSingle : '' }}
            }
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
            const data = this.$store.state.editElement
            if (!data) {
                return null
            }
            const { _pid, _mid, _index, type, ..._data } = data
            return _data
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
        right: 440px;
        padding: 40px 0;
        box-sizing: border-box;

        &.show {
            top: 70px;
            bottom: 15px;
        }

        .attr {
            li {
                list-style-type: none;

                .title {
                    background: rgba(85, 41, 91, 0.1);
                    height: 30px;
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                }

                .css-code {
                    font-size: 12px;
                    padding: 10px 20px;
                }
            }
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