<template lang="tea">
  section {
      :class: ['my-dialog', {'active':isActive }]
      i {
          @click.stop: handleClose
          :class: ['mask', {'active':isActive }]
      }
      div.main {
          div.header {
              span.title {
                  ~~{{title}}
              }
              i.close {
                  @click.stop: handleClose
              }
          }
          slot
      }
  }
</template>

<script>
export default {
    name: 'MyDialog',
    props: {
        title: {
            type: String,
            default: '弹窗'
        },
        isActive: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClose() {
            this.$emit('close')
        }
    }
}
</script>

<style lang="stylus" scoped>
    .my-dialog {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
        display: none;
        justify-content: center;
        align-items: center;

        &.active {
            z-index: 10;
            display: flex;
        }

        .mask {
            display: block;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            position: absolute;
        }

        .main {
            display: flex;
            flex-direction: column;
            width: 80vw;
            height: 80vh;
            background: #f1f1f1;
            border-radius: 6px;
            overflow: hidden;
            z-index: 11;

            .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 15px;
                height: 40px;
                width: 100%;
                background: #233;

                .title {
                    color: #f1f1f1;
                }

                .close {
                    display: flex;
                    width: 20px;
                    height: 20px;
                    background-image: url('../assets/icon-close-fff.svg');
                    background-size: 80% 80%;
                    background-position: center center;
                    background-repeat: no-repeat;
                    cursor: pointer;
                }
            }
        }
    }
</style>