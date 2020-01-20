<template lang="tea">
  section.tree {
      DirTree {
        %: tree
        :data: $it
        :pkey: $_i
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
const paddingLeftCount = key => {
    return key ? key.toString().split('-').length * 18 : 0
}

export default {
    name: 'Direction',
    components: {
        DirTree
    },
    data: () => ({
        tree: arr
    }),
    methods: {}
}
</script>

<style lang="stylus" scoped>
    .tree {
        border: 5px solid red;
        width: 100%;
        flex: 1;
    }
</style>