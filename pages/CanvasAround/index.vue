<template lang="tea">
  section.canvas {
      div.around {
          @dragover: handleDragover
          @drop: handleDrop
          RenderCard {
              %: tree
              :data: $it
          }
      }
  }
</template>

<script>
import RenderCard from './RenderCard'
import Leaf from '@/packages/leaf-js'
const leaf = new Leaf()
export default {
    name: 'CanvasAround',
    components: {
        RenderCard
    },
    data: () => ({
        tree: [],
        renderData: []
    }),
    mounted() {
        this.tree = [
            {
                tagName: 'section',
                isSingle: false,
                type: 2,
                children: [
                    { tagName: 'div', isSingle: false, type: 2, children: [{ type: 1, content: 'JSON解析' }], attr: {} }
                ],
                attr: {}
            }
        ]
        this.renderData = Leaf.tree2arr(this.tree)
        console.log(this.renderData)
    },
    methods: {
        handleDragover(e) {
            e.preventDefault()
            // console.log(e.clientX, e.clientY)
        },
        handleDrop(e) {
            console.log('松手', e.clientX, e.clientY)
            // 插入数据
            // this.tree = leaf.appendNode({ x: e.clientX, y: e.clientY })
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

        .around {
            padding: 50px;
            min-width: 100%;
            min-height: 100%;
            overflow: auto;
            background-color: #f1f1f1;
            background-image: url('../../assets/web-point.png');
            background-size: 40px;
        }
    }
</style>