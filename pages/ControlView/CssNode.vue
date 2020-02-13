<template lang="tea">
    ul {
        :class: ['css-node', {'isRoot': !treeData._pid}]
        li.block {
            div.content {
                span {
                    :class: ['select-name', {isActive}]
                    @dblclick: handleDBClick
                    ~~{{ treeData.select }}
                }
                span.add-icon.child {
                    @click: handleAddNode(2)
                }
                i.close-icon {
                    @click: handleDeleteNode
                }
            }
            span.add-icon.borther {
                ?: isLast
                @click: handleAddNode(3)
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
import bus from '@/utils/eventBus'
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
    methods: {
        handleAddNode(n) {
            bus.$emit('append-css-node', this.treeData._mid, n)
        },
        handleDBClick() {
            bus.$emit('select-css-node', this.treeData._mid)
        },
        handleDeleteNode() {
            bus.$emit('delete-css-node', this.treeData._mid)
        }
    },
    computed: {
        hasChildren() {
            return this.treeData.children && this.treeData.children.length
        },
        isActive() {
            return this.treeData._mid === this.$store.state.selectCssMid
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
            height: 40px;
            margin: 10px;
            display: flex;
            align-items: center;
            position: relative;

            &:hover {
                .close-icon {
                    display: flex;
                }
            }

            .select-name {
                padding: 0 7px;
                border-radius: 6px;
                min-width: 100px;
                color: #ffffff;
                background: #55295b;
                width: 100%;
                height: 100%;
                display: flex;
                cursor: pointer;
                align-items: center;
                justify-content: center;

                &.isActive {
                    position: relative;
                    overflow: hidden;

                    &:after {
                        content: '';
                        display: block;
                        position: absolute;
                        width: 0;
                        height: 0;
                        right: -9px;
                        top: -2px;
                        border-left: 13px solid transparent;
                        border-right: 13px solid transparent;
                        border-bottom: 13px solid rgba(0, 163, 129, 1);
                        transform: rotate(45deg);
                    }
                }
            }

            .close-icon {
                display: none;
                position: absolute;
                right: 32px;
                top: -8px;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-image: url('../../assets/icon-close-fff.svg');
                background-size: 70% 70%;
                background-position: center center;
                background-repeat: no-repeat;
                background-color: #d9333f;
                border: 1px solid #fff;
                cursor: pointer;
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
            box-shadow: 0 0 1px #55295b;
            background-size: 80%;
            background-repeat: no-repeat;
            background-position: center center;

            &:hover {
                box-shadow: 0 0 5px #55295b;
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