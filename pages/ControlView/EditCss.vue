<template lang="tea">
section.gfys {
    div.g9rt {
        div.vlw7.canvas {
            CssNode {
                %: cssTree
                :treeData: $it
                :isLast: (cssTree.length - 1) === $_i
            }
        }
    }
}
</template>
<script>
import Leaf from '@openrotary/leafjs'
import CssNode from './CssNode'
import bus from '@/utils/eventBus'
import { createCssSelect } from '@/utils/comput'

let leaf = new Leaf()
export default {
    name: 'EditCss',
    data: () => ({
        cssList: null,
        cssTree: []
    }),
    components: {
        CssNode
    },
    mounted() {
        bus.$on('append-css-node', (mid, n) => {
            const data = createCssSelect('.wokao')
            leaf.appendNode(mid, n, data)
        })
        bus.$on('select-css-node', mid => {
            this.$store.commit('setSelectCssMid', mid)
        })
        this.leafListener()
    },
    methods: {
        leafListener() {
            leaf.on('error', msg => {
                console.log('Leaf引擎error事件', msg)
            })
            leaf.on('success', msg => {
                console.log('Leaf引擎success事件', msg)
            })
            leaf.on('change', cssList => {
                // 更新画布上的数据
                this.cssList = cssList
                this.cssTree = Leaf.data2tree(this.cssList)
                this.setEditElemet(cssList)
            })
        },
        setEditElemet(css) {
            const _data = this.$store.state.editElement
            if (!_data) {
                console.log('editElement为空')
                return
            }
            const data = JSON.parse(JSON.stringify(_data))
            data.css = css
            this.$store.commit('setEditElement', data)
        }
    },
    watch: {
        '$store.state.editElement': {
            handler(data) {
                if (!data) {
                    return
                }
                const { children, css, ..._data } = data
                const cssList = JSON.parse(JSON.stringify(css))
                leaf = new Leaf(cssList)
                this.leafListener()
                this.cssList = leaf.getElementList()
                this.cssTree = Leaf.data2tree(this.cssList)
                console.log(this.cssList)
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.gfys {
    width: 700px;
    border-right: 2px solid #55295b;

    .g9rt {
        width: 100%;
        height: 100%;
        overflow: auto;
    }
}
</style>
