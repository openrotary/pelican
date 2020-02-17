<template lang="tea">
section.gfys {
    div.grjrt {
        div.vlw7.canvas {
            CssNode {
                %: cssTree
                :treeData: $it
                :isLast: (cssTree.length - 1) === $_i
            }
        }
        section.show-code {
            ?: cssSelect
            span {
                %: cssSelect.cssom
                ~~{{$_i}}: {{$it}}
            }
        }
    }
}
</template>
<script>
import Leaf from '@openrotary/leafjs'
import CssNode from './CssNode'
import bus from '@/utils/eventBus'
import { createCssSelectNode } from '@/utils/comput'

let leaf = new Leaf()
export default {
    name: 'EditCss',
    data: () => ({
        cssList: null,
        cssTree: [],
        cssSelect: null
    }),
    components: {
        CssNode
    },
    mounted() {
        bus.$on('append-css-node', (mid, n) => {
            const data = createCssSelectNode('&.newSelect')
            leaf.appendNode(mid, n, data)
            const cssMid = leaf.getActiveMid()
            console.log('after', cssMid)
            this.$store.commit('setSelectCssMid', cssMid)
        })
        bus.$on('select-css-node', mid => {
            this.$store.commit('setSelectCssMid', mid)
        })
        bus.$on('change-css', data => {
            this.cssSelect = data
        })
        bus.$on('delete-css-node', mid => {
            leaf.deleteNode(mid)
            const activeCSSMid = this.$store.state.selectCssMid
            if (activeCSSMid === mid) {
                this.$store.commit('setSelectCssMid', null)
            }
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
            handler(data, oldData) {
                if (!data) {
                    return
                }

                const { children, css, ..._data } = data
                const cssList = JSON.parse(JSON.stringify(css))
                leaf = new Leaf(cssList)
                this.leafListener()
                this.cssList = leaf.getElementList()
                this.cssTree = Leaf.data2tree(this.cssList)
                if (!oldData) {
                    // 默认选中根css
                    const cssMid = this.cssTree.length ? this.cssTree[0]._mid : null
                    console.log('before', cssMid)
                    this.$store.commit('setSelectCssMid', cssMid)
                    return
                }
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.gfys {
    width: 400px;
    border-right: 2px solid #55295b;

    .grjrt {
        width: 100%;
        height: 100%;
        overflow: auto;
        position: relative;

        .show-code {
            position: absolute;
            right: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
            background: rgba(85, 41, 91, 0.7);
            color: #fff;
            line-height: 1.2;
            padding: 15px;
            width: 400px;
            height: 600px;
        }
    }
}
</style>
