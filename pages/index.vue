<template lang="tea">
div.container {
  Header
  section.main {
    Preview
    ControlView
  }
}
</template>

<script>
import Header from '~/components/Header.vue'
import Preview from './Preview'
import ControlView from './ControlView'

export default {
    components: {
        Header,
        Preview,
        ControlView
    }
}
</script>

<style lang="stylus" scoped>
    .container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;

        .main {
            display: flex;
            height: 100%;
            flex: 1;
        }
    }
</style>
