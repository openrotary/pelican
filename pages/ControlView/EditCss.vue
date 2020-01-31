<template>
  <section :class="['gfys']">
    <!-- <header :class="['8ef0']">样式结构</header> -->
    <div :class="['g9rt']">
      <div :class="['vlw7', 'canvas']">
        <CssNode :key="index" v-for="(item, index) in cssTree"></CssNode>
      </div>
    </div>
  </section>
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
                'font-size': '10px',
                display: 'flex',
                'text-align': 'center'
            }
        ]
        this.cssTree = Leafjs.data2tree(this.cssList)
        console.log(this.cssTree)
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
