<template lang="tea">
  ul {
      :class: ['css-node', {'isRoot': !treeData._pid}]
      li.block {
          div.content {
            span.select-name {
                ~~{{ treeData.select }}
            }
            span.add-icon.child
          }
          span.add-icon.borther {
              ?: isLast
          }
      }
      CssNode {
          v-if: hasChildren
          %: treeData.children
          :isLast: (treeData.children.length - 1) === $_i
          :treeData: $it
      }
  }
</template>
<script>
export default {
    name: 'CssNode',
    props: {
        treeData: {
            type: Object,
            default: () => {}
        },
        isLast: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        hasChildren() {
            return this.treeData.children && this.treeData.children.length
        }
    }
}
</script>

<style lang="stylus" scoped>
.css-node {
    margin-left: 50px;

    &.isRoot {
        margin-left: 0;
    }

    .block {
        list-style: none;
        display: inline-flex;
        flex-direction: column;

        .content {
            width: 180px;
            height: 40px;
            margin: 10px;
            display: flex;
            align-items: center;

            .select-name {
                border-radius: 6px;
                width: 100px;
                color: #ffffff;
                background: #55295b;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .add-icon {
            display: flex;
            flex-shrink: 0;
            width: 30px;
            height: 30px;
            margin-left: 10px;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 5px #55295b;
            background-size: 80%;
            background-repeat: no-repeat;
            background-position: center center;

            &:hover {
                box-shadow: 0 0 2px #55295b;
            }

            &.child {
                background-image: url('../../assets/icon-add-child.svg');
            }

            &.borther {
                background-image: url('../../assets/icon-add-borther.svg');
            }
        }
    }
}
</style>