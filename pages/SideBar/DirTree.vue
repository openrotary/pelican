<template lang="tea">
  ul.dir-tree {
      li {
          ?: data.children.length
          :class: ['dir-li',{'dir-open': isDirOpen}]
          span.dir {
              @contextmenu.prevent: handleMenu($event, 1, data.value)
              :style: {paddingLeft: countPaddingLeft}
              @click.left: handleDir
              ~~{{ data.label }}
          }
          DirTree {
            %: data.children
            :data: $it
            :nodekey: nodekey ? `${nodekey}-${$_i}` : `${$_i}`
          }
      }
      li {
          /
          span.node {
              @contextmenu.prevent: handleMenu($event, 0, data.value)
              :style: {paddingLeft: countPaddingLeft}
              @dblclick: handleDBClick(data.value)
              ~~{{ data.label }}
          }
      }
  }
</template>

<script>
import bus from '@/utils/eventBus'
const paddingLeftCount = key => {
    return key ? key.toString().split('-').length * 18 + 5 : 5
}
export default {
    name: 'DirTree',
    props: {
        data: {
            type: Array | Object,
            default: () => {}
        },
        nodekey: {
            type: String,
            default: ''
        }
    },
    data: () => ({
        isDirOpen: false
    }),
    computed: {
        countPaddingLeft() {
            return paddingLeftCount(this.nodekey) + 'px'
        }
    },
    methods: {
        handleDir() {
            this.isDirOpen = !this.isDirOpen
        },
        handleDBClick(path) {
            bus.$emit('get-file-content', path)
        },
        handleMenu(e, n, path) {
            // n 为 1 代表文件夹，为 0 代表文件
            bus.$emit('show-menu', { x: e.clientX, y: e.clientY }, n, path)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .dir-tree {
        .dir-li {
            height: 30px;
            overflow: hidden;

            &.dir-open {
                height: auto;

                > .dir:before {
                    transform: rotate(0deg);
                }
            }
        }

        .dir {
            height: 30px;
            display: flex;
            align-items: center;
            cursor: pointer;
            color: #666;
            user-select: none;

            &:hover {
                background: rgba(85, 41, 91, 0.1);
            }

            &:before {
                content: '';
                display: flex;
                width: 15px;
                height: 15px;
                margin-right: 5px;
                background-image: url('../../assets/icon-dir.svg');
                background-repeat: no-repeat;
                background-size: 9px 9px;
                background-position: center center;
                transform: rotate(-90deg);
                transition: all 0.3s ease;
            }
        }

        .node {
            display: flex;
            align-items: center;
            height: 30px;
            cursor: pointer;
            user-select: none;
            color: rgba(85, 41, 91, 0.7);

            &:hover {
                color: #f1f1f1;
                background: rgba(85, 41, 91, 0.5);
            }
        }
    }
</style>