<template lang="tea">
  section.new-card {
      div.ele-card&ele-card {
        draggable: true
        @mousedown.left: handleMousedown
        i.material-icons.code {
            ~~code
        }
        div.ele {
            span.title {
                ~~Element
            }
        }
      }
  }
</template>

<script>
import bus from '@/utils/eventBus'
export default {
    name: 'NewCard',
    data: () => ({
        x: 0,
        y: 0
    }),
    mounted() {
        bus.$on('mouse-coord', ({ x, y }) => {
            this.x = x
            this.y = y
        })
    },
    methods: {
        handleMousedown(e) {}
    }
}
</script>

<style lang="stylus" scoped>
    .new-card {
        .ele-card {
            background: #fff;
            width: 250px;
            min-height: 80px;
            border-radius: 2px;
            cursor: move;
            display: flex;
            padding: 0 20px;

            .code {
                display: flex;
                align-items: center;
                font-size: 30px;
            }

            .ele {
                flex: 1;
                display: flex;
                align-items: center;

                .title {
                    display: flex;
                    padding: 0 20px;
                    height: 40px;
                    align-items: center;
                }
            }
        }

        .ele-card {
            transition: 0.3s all ease;

            // &.active {
            // background: rgba(85, 41, 91, 0.1);
            // }
            &:hover {
                box-shadow: 0 0 10px rgba(85, 41, 91, 0.4);
            }
        }
    }
</style>