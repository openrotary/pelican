<template lang="tea">
  section.canvas {
      div.around {
          @dragover: handleDragover
          @drop: handleDrop
      }
  }
</template>

<script>
export default {
    name: 'CanvasAround',
    methods: {
        handleDragover(e) {
            e.preventDefault()
            // console.log(e.clientX, e.clientY)
        },
        handleDrop(e) {
            console.log('松手', e.clientX, e.clientY)
            // 插入数据
        }
    }
}
</script>

<style lang="stylus" scoped>
    .canvas {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        .around {
            min-width: 100%;
            min-height: 100%;
            overflow: auto;
            background-color: #f1f1f1;
            background-image: url('../../assets/web-point.png');
            background-size: 40px;
        }
    }
</style>