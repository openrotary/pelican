<template lang="tea">
  section.new-card {
      div.ele-card {
        %: cardList
        draggable: true
        @dragstart: handleDargStart($event, $it)
        @dragend: handleDragEnd
        i.material-icons.code {
            ~~code
        }
        div.ele {
            span.title {
                ~~{{$it.tagName}}
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
        cardList: [
            {
                tagName: 'section',
                isSingle: false,
                type: 2
            },
            {
                tagName: 'div',
                isSingle: false,
                type: 2
            },
            {
                tagName: 'span',
                isSingle: false,
                type: 2
            },
            {
                tagName: 'i',
                isSingle: false,
                type: 2
            },
            {
                tagName: 'input',
                isSingle: true,
                type: 2
            }
        ]
    }),
    mounted() {
        // bus.$on('mouse-coord', ({ x, y }) => {
        //     this.x = x
        //     this.y = y
        // })
    },
    methods: {
        handleDargStart(e, data) {
            this.$store.commit('changeDragStatus', true)
            // console.log('开始拖拽')
            this.$store.commit('setCacheElement', data)
        },
        handleDragEnd() {
            this.$store.commit('changeDragStatus', false)
            // console.log('结束拖拽')
            this.$store.commit('setCacheElement', null)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .new-card {
        .ele-card {
            background: rgba(255, 255, 255, 0.7);
            width: 250px;
            min-height: 80px;
            border-radius: 2px;
            cursor: move;
            display: flex;
            padding: 0 20px;
            margin: 10px 0;

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
                    font-size: 22px;
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