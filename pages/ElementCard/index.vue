<template lang="tea">
    aside.element-card {
        div.select {
            span {
                @click: handleActive(1)
                :class: [{'active': active === 1}]
                ~~目录
            }
            span {
                @click: handleActive(2)
                :class: [{'active': active === 2}]
                ~~元素
            }
        }
        Direction {
            |: active === 1
        }
        NewCard {
            |: active === 2
        }
    }
</template>

<script>
import NewCard from './NewCard'
import Direction from './Direction'
import bus from '@/utils/eventBus'
export default {
    name: 'ElementCard',
    data: () => ({
        active: 1
    }),
    components: {
        NewCard,
        Direction
    },
    mounted() {
        bus.$on('select-file', isIcan => {
            // 用户双击选择了 .ican 文件
            if (isIcan) {
                this.active = 2
            } else {
            }
        })
    },
    methods: {
        handleActive(n) {
            this.active = n
        }
    }
}
</script>

<style lang="stylus" scoped>
    .element-card {
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: 1px solid rgba(85, 41, 91, 0.2);

        .select {
            width: 100%;
            height: 40px;
            display: flex;

            span {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: 0.4s all ease;

                &.active {
                    background: rgba(85, 41, 91, 0.6);
                    box-shadow: 0 0 10px rgba(85, 41, 91, 0.2);
                    border-radius: 4px;
                    color: #f1f1f1;
                }
            }
        }
    }
</style>