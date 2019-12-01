<template lang="tea">
    section.control-view {
      LayoutModel
    }
</template>
<script>
import LayoutModel from './LayoutModel'
export default {
  name: 'ControlView',
  components: {
    LayoutModel
  }
}
</script>
<style lang="stylus" scoped>
.control-view {
  background: rgba(85, 41, 91, 0.3);
}
</style>