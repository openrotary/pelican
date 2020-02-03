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
import Leafjs from '../../packages/leafjs'
import CssNode from './CssNode'
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
        this.cssList = [
            {
                _pid: null,
                _mid: 'fghjk',
                _index: 0,
                select: '.fghjk',
                cssom: {
                    'font-size': '10px',
                    display: 'flex',
                    'text-align': 'center'
                }
            },
            {
                _pid: 'fghjk',
                _mid: 'dfghjuytrdfghj',
                select: '> div',
                _index: 0,
                cssom: {
                    'font-size': '10px',
                    display: 'flex',
                    'text-align': 'center'
                }
            },
            {
                _pid: 'fghjk',
                _mid: 'ddddffsdfgh',
                select: '.canvas',
                _index: 0,
                cssom: {
                    'font-size': '10px',
                    display: 'flex',
                    'text-align': 'center'
                }
            }
        ]
        this.cssTree = Leafjs.data2tree(this.cssList)
        console.log('cssTree', this.cssTree)
    },
    watch: {
        // '$store.state.editElement': {
        //     handler(data) {
        //         if (!data) {
        //             return
        //         }
        //         const { children, css, ..._data } = data
        //         this.cssList = JSON.parse(JSON.stringify(css))
        //         this.cssTree = Leafjs.data2tree(this.cssList)
        //     }
        // }
    }
}
</script>
<style lang="stylus" scoped>
.gfys {
    width: 700px;
    border: 1px solid red;

    .g9rt {
    }
}
</style>
