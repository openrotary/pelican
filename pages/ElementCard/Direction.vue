<template lang="tea">
  section.tree {
      DirTree {
        %: tree
        :data: $it
      }
  }
</template>

<script>
import DirTree from './DirTree'

const arr = [
    {
        label: '1',
        value: '',
        options: {},
        active: true,
        children: []
    },
    {
        label: '2',
        value: '',
        options: {},
        active: true,
        children: [
            {
                label: '2-1',
                value: '',
                options: {},
                active: true,
                children: []
            },
            {
                label: '2-2',
                value: '',
                options: {},
                active: true,
                children: [
                    {
                        label: '2-2-1',
                        value: '',
                        options: {},
                        active: true,
                        children: [
                            {
                                label: '2-2-2-1',
                                value: '',
                                options: {},
                                active: true,
                                children: []
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: '3',
        value: '',
        options: {},
        active: true,
        children: []
    }
]

export default {
    name: 'Direction',
    components: {
        DirTree
    },
    // data: () => ({
    //     tree: []
    // }),
    data() {
        return {
            tree: []
        }
    },
    // asyncData(context) {
    //     console.log(axios)
    //     return axios.get('/getFile').then(res => {
    //         return { tree: res.data.data }
    //     })
    // },
    async asyncData({ $axios }) {
        console.log('lll')
        const res = await $axios.get('https://cmb.ygsoft.com/app/v1/version/getVersion/settledown')
        console.log(res)
    },
    // mounted() {
    //     this.$axios.get('/getFile').then(res => {
    //         this.tree = res.data.data
    //     })
    // },
    methods: {}
}
</script>

<style lang="stylus" scoped>
    .tree {
        width: 100%;
        padding: 10px;
        flex: 1;
    }
</style>