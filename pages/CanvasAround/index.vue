<template lang="tea">
  section.canvas {
      div {
          :class: ['search', {'active': isSearch}]
        i.icon {
            @click: handleClickSearch
        }
        input&search {
            :class: [{'active': isSearch}]
            type: text
            @enter: handleSearch
            v-model: searchContent
        }
      }
      EditPage
      div.inside-around {
          @dragover: handleDragover
          @drop: handleDrop
          @click: handleClickCanvas
          
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
import EditPage from './EditPage'
import Leaf from '@/packages/leafjs'
let leaf = new Leaf()
export default {
    name: 'CanvasAround',
    components: {
        RenderCard,
        EditPage
    },
    data: () => ({
        elementList: [],
        renderTreeData: [],
        isSearch: false,
        searchContent: ''
    }),
    mounted() {
        bus.$on('append-node', (mid, n) => {
            // 从缓存中获取元素，插入到由引擎插入到合适的位置
            const card = this.$store.state.moveElement
            leaf.appendNode(mid, n, card, data => ({ class: [data._mid.slice(-5)], attr: [], css: [], ...data }))
            this.$store.commit('changeDragStatus', false)
            this.$store.commit('setActiveMid', leaf.getActiveMid())
            // console.log('拖拽状态', this.$store.state.isDrag)
        })
        bus.$on('delete-node', mid => {
            // 仅删除单个节点
            leaf.deleteNode(mid)
            const activeMid = this.$store.state.activeMid
            if (activeMid === mid) {
                this.$store.commit('setActiveMid', null)
            }
        })
        bus.$on('edit-element', mid => {
            if (!mid) {
                this.$store.commit('setEditElement', null)
                return
            }
            const [element] = this.elementList
                .filter(item => item._mid === mid)
                .map(({ children, ...item }) => ({ ...item }))
            this.$store.commit('setEditElement', element)
        })
        bus.$on('update-element', (mid, element) => {
            leaf.updateElement(mid, element)
            // const [el] = leaf.getElementList().filter(item => item._mid === mid)
            this.$store.commit('setEditElement', null)
        })
        bus.$on('init-canvas', data => {
            // 接收到画布的数据
            leaf = new Leaf(JSON.parse(data))
            this.elementList = leaf.getElementList()
            this.renderTreeData = Leaf.data2tree(this.elementList)
            // 初始化的时候需要重新设置监听
            this.leafListener()
        })
        this.leafListener()
    },
    methods: {
        leafListener() {
            leaf.on('warn', msg => {
                this.$vs.notify({ title: '操作警告', text: msg, color: '#fabf14', position: 'top-center' })
            })
            leaf.on('error', msg => {
                this.$vs.notify({ title: '操作错误', text: msg, color: '#bb5548', position: 'top-center' })
            })
            leaf.on('success', msg => {
                this.$vs.notify({ title: '操作成功', text: msg, color: '#82ae46', position: 'top-center' })
            })
            leaf.on('change', elementList => {
                const path = this.$store.state.activePath
                if (!path || path.slice(-5) !== '.ican') {
                    this.$vs.notify({
                        title: '操作错误',
                        text: '当前活动的文件路径不是 .ican 文件',
                        color: '#bb5548',
                        position: 'top-center'
                    })
                    return
                }
                this.elementList = elementList
                this.renderTreeData = Leaf.data2tree(this.elementList)
                const data = JSON.stringify(this.elementList)
                // 将数据写入文件中
                const { code } = this.$axios.$post('/rewriteFile', {
                    path,
                    data
                })
                if (!code) {
                    console.log('文件写入成功')
                }
            })
        },
        handleDragover(e) {
            // console.log('不必要的冒泡，有待优化')
            e.preventDefault()
        },
        handleDrop(e) {
            // console.log('松手', e.clientX, e.clientY)
            this.$store.commit('changeDragStatus', false)
            // console.log('画布上结束结束拖拽')
            const moveElement = this.$store.state.moveElement
            // 插入数据
            leaf.appendRootNode(moveElement, data => {
                return {
                    class: [data._mid.slice(-5)],
                    attr: [],
                    css: [],
                    ...data
                }
                // return { class: [data._mid.slice(-5)], attr: [], css: [], ...data }
            })
            this.$store.commit('setActiveMid', leaf.getActiveMid())
            // console.log('kkk', this.elementList)
            // console.log('你添加了一个根元素', this.renderTreeData)
            // console.log(this.tree)
        },
        handleClickCanvas() {
            this.isSearch = false
            this.$store.commit('setActiveMid', null)
        },
        handleSearch() {
            const mid = leaf.search(this.searchContent)
            if (!mid) {
                return
            }
            this.$store.commit('setActiveMid', mid)
        },
        handleClickSearch() {
            this.isSearch = !this.isSearch
            this.$nextTick(() => {
                if (this.isSearch) {
                    this.$refs.search.focus()
                }
            })
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
        position: relative;

        .search {
            position: absolute;
            right: 20px;
            top: 20px;
            display: block;
            height: 40px;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            border-radius: 40px;
            box-shadow: 0 0 10px #55295b;
            transition: all 0.3s ease-out;

            &.active {
                width: 220px;
            }

            .icon {
                position: absolute;
                left: 7px;
                display: block;
                width: 26px;
                height: 26px;
                background-image: url('../../assets/icon-search.svg');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                background-position: center center;
                cursor: pointer;
            }

            input {
                height: 90%;
                font-size: 16px;
                width: 0;
                padding: 0 6px;
                border: none;
                transition: all 0.3s ease-out;

                &.active {
                    width: 160px;
                }
            }
        }

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