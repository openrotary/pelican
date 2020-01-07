<template lang="tea">
  section.canvas {
      div.inside-around {
          @dragover: handleDragover
          @drop: handleDrop
          RenderCard {
              %: renderTreeData
              :treeData: $it
              :isFirst: !$_i
              :isLast: (renderTreeData.length - 1) === $_i
          }
      }
  }
</template>

<script>
import bus from '@/utils/eventBus.js'
import RenderCard from './RenderCard'
import Leaf from '@/packages/leaf-js'
const leaf = new Leaf()
export default {
    name: 'CanvasAround',
    components: {
        RenderCard
    },
    data: () => ({
        elementList: [],
        renderTreeData: []
    }),
    mounted() {
        this.elementList = [
            {
                tagName: 'div',
                isSingle: false,
                type: 2,
                _mid: 'gyutrgi',
                _index: 2,
                attr: {}
            },
            {
                tagName: 'section',
                isSingle: false,
                type: 2,
                _mid: 'kjkk',
                _index: 0,
                attr: {}
            },
            {
                tagName: 'header',
                isSingle: false,
                type: 2,
                _mid: 'defr',
                _pid: 'kjkk',
                _index: 0,
                attr: {}
            },
            {
                tagName: 'i',
                isSingle: false,
                type: 2,
                _mid: 'vfgfvu',
                _pid: 'defr',
                _index: 2,
                attr: {}
            },
            {
                tagName: 'i',
                isSingle: false,
                type: 2,
                _mid: 'fdtyrfihio',
                _pid: 'defr',
                _index: 1,
                attr: {}
            },
            {
                tagName: 'i',
                isSingle: false,
                type: 2,
                _mid: 'gyufuyv',
                _pid: 'defr',
                _index: 0,
                attr: {}
            },
            {
                tagName: 'footer',
                isSingle: false,
                type: 2,
                _mid: 'dwdew',
                _pid: 'kjkk',
                _index: 1,
                attr: {}
            },
            {
                tagName: 'span',
                isSingle: false,
                type: 2,
                _mid: 'reftrg',
                _pid: 'dwdew',
                _index: 0,
                attr: {}
            },
            {
                tagName: 'span',
                isSingle: false,
                type: 2,
                _mid: 'gyuguyee',
                _pid: 'dwdew',
                _index: 2,
                attr: {}
            },
            {
                tagName: 'span',
                isSingle: false,
                type: 2,
                _mid: 'dweffref',
                _pid: 'dwdew',
                _index: 1,
                attr: {}
            },
            {
                tagName: 'span',
                isSingle: false,
                type: 2,
                _mid: 'dwfrftgyh',
                _pid: 'dwdew',
                _index: 3,
                attr: {}
            },
            {
                tagName: 'aside',
                isSingle: false,
                type: 2,
                _mid: 'gyguigu',
                _index: 1,
                attr: {}
            },
            {
                tagName: 'nav',
                isSingle: false,
                type: 2,
                _pid: 'gyguigu',
                _mid: 'gyfyufi',
                _index: 1,
                attr: {}
            },
            {
                _mid: 'refdwde',
                type: 1,
                _index: 0,
                _pid: 'gyufuyv',
                content: 'JSON解析'
            }
        ]
        this.renderTreeData = Leaf.data2tree(this.elementList)
        // console.log(
        //     '%c 渲染数据 %c \n',
        //     'background-color: #82ae46; color: #fff;padding:3px;box-sizing: border-box;border-radius: 3px;',
        //     '',
        //     this.renderTreeData
        // )
    },
    methods: {
        handleDragover(e) {
            e.preventDefault()
            // console.log(e.clientX, e.clientY)
        },
        handleDrop(e) {
            console.log('松手', e.clientX, e.clientY)
            this.$store.commit('changeDragStatus', false)
            console.log('画布上结束结束拖拽')
            // 插入数据
            this.elementList = leaf.appendNode({ x: e.clientX, y: e.clientY })
            console.log('kkk', this.elementList)
            // console.log(this.tree)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .canvas {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid red;

        .inside-around {
            padding: 50px;
            min-width: 100%;
            min-height: 100%;
            background-color: #f1f1f1;
            background-image: url('../../assets/web-point.png');
            background-size: 40px;
        }
    }
</style>