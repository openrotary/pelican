<template lang="tea">
  ul.css-node {
      li {
          %: list
      }
  }
</template>

<script>
const notRender = ['_index', '_pid', '_mid', 'children']
export default {
    name: 'CssNode',
    props: {
        list: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style lang="stylus" scoped>
.css-node {
}
</style>