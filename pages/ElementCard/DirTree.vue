<template lang="tea">
  ul {
      li {
          ?: data.children.length
          ~~{{ data.label }}
          DirTree {
            %: data.children
            :data: $it
            :pkey: pkey != null ? `${pkey}-${$_i}` : $_i
          }
      }
      li {
          /
          ~~{{ data.label }}
      }
  }
</template>

<script>
export default {
    name: 'DirTree',
    props: {
        data: {
            type: Array | Object,
            default: () => {}
        },
        pkey: {
            type: String | Number,
            default: ''
        }
    }
}
</script>

<style>
</style>