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
import mockData from './mock'

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
        // this.elementList = mockData
        // this.renderTreeData = this.elementList.length ? Leaf.data2tree(this.elementList) : []
        bus.$on('append-node', (mid, n) => {
            // 从缓存中获取元素，插入到由引擎插入到合适的位置
            const card = this.$store.state.cacheElement
            this.elementList = leaf.appendNode(mid, n, card)
            this.renderTreeData = Leaf.data2tree(this.elementList)
            this.$store.commit('changeDragStatus', false)
            // console.log('拖拽状态', this.$store.state.isDrag)
        })
        bus.$on('delete-node', mid => {
            const mode = this.$store.state.modeCode
            if (mode === 1) {
                // 仅删除单个节点
                this.elementList = leaf.deleteNode(mid)
                this.renderTreeData = Leaf.data2tree(this.elementList)
            }
        })
        leaf.on('warn', msg => {
            this.$vs.notify({ title: '警告', text: msg, color: 'warning' })
        })
        leaf.on('success', msg => {
            this.$vs.notify({ title: '成功', text: msg, color: '#55295b' })
        })
    },
    methods: {
        handleDragover(e) {
            e.preventDefault()
            // console.log(e.clientX, e.clientY)
        },
        handleDrop(e) {
            // console.log('松手', e.clientX, e.clientY)
            this.$store.commit('changeDragStatus', false)
            // console.log('画布上结束结束拖拽')
            const cacheElement = this.$store.state.cacheElement
            // 插入数据
            this.elementList = leaf.appendRootNode(cacheElement)
            this.renderTreeData = Leaf.data2tree(this.elementList)
            // console.log('kkk', this.elementList)
            // console.log('你添加了一个根元素', this.renderTreeData)
            // console.log(this.tree)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .canvas {
        flex: 1;
        width: 1px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #55295b;

        .inside-around {
            padding: 40px;
            height: 100%;
            flex: 1;
            overflow: auto;
            background-color: #f1f1f1;
            background-image: url('../../assets/web-point.png');
            background-size: 40px;
        }
    }
</style>