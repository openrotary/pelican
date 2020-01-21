<template lang="tea">
  ul.dir-tree {
      li {
          ?: data.children.length
          :class: ['dir-li',{'dir-open': isDirOpen}]
          span.dir {
              :style: {paddingLeft: countPaddingLeft}
              @click: handleDir
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
              :style: {paddingLeft: countPaddingLeft}
              @dblclick: handleDBClick(data.value)
              ~~{{ data.label }}
          }
      }
  }
</template>

<script>
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
        handleDBClick(fileName) {
            console.log(fileName)
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
            color: #999;
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

            &:hover {
                color: #f1f1f1;
                background: rgba(85, 41, 91, 0.5);
            }
        }
    }
</style>