<template lang="tea">
  ul.menu&contextMenu {
      :style: {'left': `${coord.x}px`, 'top': `${coord.y}px`}
      tabindex: 0
      @blur: handleBlur
      li {
          v-for: list
          @click: handleClick($it.value)
          ~~{{$it.label}}
      }
  }
</template>

<script>
export default {
    name: 'ContextMenu',
    props: {
        coord: {
            type: Object,
            default: () => ({ x: 0, y: 0 })
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    mounted() {
        this.$refs.contextMenu.focus()
    },
    methods: {
        handleClick(value) {
            this.$emit('click', value)
        },
        handleBlur() {
            this.$emit('blur')
        }
    }
}
</script>

<style lang="stylus" scoped>
.menu {
    position: fixed;
    z-index: 10;
    width: 180px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

    li {
        height: 34px;
        border-bottom: 1px solid rgba(85, 41, 91, 0.4);
        list-style: none;
        padding: 0 10px;
        display: flex;
        align-items: center;
        font-size: 14px;
        cursor: pointer;
        user-select: none;
        color: #555;

        &:hover {
            color: rgba(85, 41, 91, 1);
            background: rgba(85, 41, 91, 0.1);
        }

        &:last-child {
            border-bottom: none;
        }
    }
}
</style>