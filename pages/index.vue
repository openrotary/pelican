<template lang="tea">
div.container {
  Header
  section.main {
    ElementCard
    CanvasAround
    ControlView
  }
}
</template>

<script>
import Header from '~/components/Header.vue'
import ElementCard from './ElementCard'
import CanvasAround from './CanvasAround'
import ControlView from './ControlView'

import bus from '@/utils/eventBus'
// import { distinctUntilChanged } from 'rxjs/operators'

export default {
    components: {
        Header,
        ElementCard,
        CanvasAround,
        ControlView
    },
    data: () => ({}),
    mounted() {}
    // domStreams: ['mousemove$'],
    // subscriptions() {
    //     this.mousemove$.pipe(distinctUntilChanged()).subscribe(({ event }) => {
    //         if (!event || !this.isSelectElement) {
    //             // 如果当前未选中元素，则不广播鼠标移动的坐标
    //             return
    //         }
    //         const { clientX: x, clientY: y } = event
    //         bus.$emit('mouse-coord', { x, y })
    //     })
    // }
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
