<template lang="tea">
  section.mobile-input {
      :style: {'left': `${coord.x}px`, 'top': `${coord.y}px`}
      tabindex: 0
      @blur: handleBlur
      input&mobileInput {
          v-model: name
      }
      button {
          type: button
          @click: handleBlur
          ~~OK
      }
  }
</template>

<script>
export default {
    name: 'MobileInput',
    props: {
        coord: {
            type: Object,
            default: () => ({ x: 0, y: 0 })
        }
    },
    data: () => ({
        name: `myIcan-${String(Date.now()).slice(-4)}`
    }),
    mounted() {
        this.$refs.mobileInput.focus()
    },
    methods: {
        handleBlur() {
            this.$emit('finish', this.name.trim())
        }
    }
}
</script>

<style lang="stylus" scoped>
.mobile-input {
    position: fixed;
    z-index: 10;
    width: 200px;
    height: 35px;
    display: flex;
    background: #fff;
    box-shadow: 0 0 10px rgba(85, 41, 91, 0.7);

    input {
        flex: 1;
        padding: 0 5px;
        border: none;
    }

    button {
        flex-shrink: 0;
        width: 40px;
        margin-left: 10px;
        color: #fff;
        background: rgba(85, 41, 91, 0.9);
        border: none;
        border-radius: 4px;
    }
}
</style>