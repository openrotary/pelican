<template lang="tea">
section {
    :class: ['card', { 'top-line': !!treeData._pid && !isFirst}, {'bottom-line': !!treeData._pid && !isLast}]
    span.content {
        v-if: treeData.type === 1
        ~~{{ treeData.content }}
    }
    div {
        /
        @drop.stop: handleDropStop()
        :class: ['el-card', { 'ahead-line': !!treeData._pid}, {'behind-line': hasChildren}, {'is-active': isActive}]
        i.arrow {
            ?: !!treeData._pid
        }
        b {
            @dragenter: showMyAround(1)
            @dragleave: showMyAround(0)
            @drop.stop: handleDrop(1)
            :class: ['top-around', {'add-around': isDrag && !isDragMe}, {'show': showAroundIndex === 1}]
        } 
        b {
            @dragenter: showMyAround(2)
            @dragleave: showMyAround(0)
            @drop.stop: handleDrop(2)
            :class: ['behind-around', {'add-around': isDrag && !isDragMe }, {'show': showAroundIndex === 2}]
        }
        b {
            @dragenter: showMyAround(3)
            @dragleave: showMyAround(0)
            @drop.stop: handleDrop(3)
            :class: ['bottom-around', {'add-around': isDrag && !isDragMe}, {'show': showAroundIndex === 3}]
        }
        div.el-content {
            draggable: true
            @dragstart: handleDargStart($event, treeData)
            @dblclick: handleEdit(treeData._mid)
            @click.stop: handleSetActive(treeData)
            div.top {
                span.tag {
                    ~~{{ treeData.tagName }}
                }
                span.icon {
                    <!-- i.copy {
                        @click: handleCopy(treeData)
                    } -->
                    i.delete {
                        @click: handleDelete(treeData._mid)
                    }
                }
            }
        }
    }
    div.render-card {
        RenderCard {
            v-if: hasChildren
            %: treeData.children
            :treeData: $it
            :isFirst: !$_i
            :isLast: (treeData.children.length - 1) === $_i
        }
    }
}
</template>
<script>
import bus from '@/utils/eventBus'
export default {
    name: 'RenderCard',
    props: {
        treeData: {
            type: Object,
            default: () => {}
        },
        isFirst: {
            type: Boolean,
            default: false
        },
        isLast: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        showAroundIndex: 0
    }),
    computed: {
        isDragMe() {
            return this.$store.state.moveElement && this.treeData._mid === this.$store.state.moveElement._mid
        },
        hasChildren() {
            return this.treeData.children && this.treeData.children.length
        },
        isDrag() {
            return this.$store.state.isDrag
        },
        isActive() {
            return this.$store.state.activeMid && this.$store.state.activeMid === this.treeData._mid
        }
    },
    methods: {
        showMyAround(n) {
            this.showAroundIndex = n
        },
        handleDrop(n) {
            this.showMyAround(0)
            bus.$emit('append-node', this.treeData._mid, n)
        },
        handleDargStart(e, data) {
            bus.$emit('edit-element', null)
            this.$store.commit('setMoveElement', data)
            this.$store.commit('changeDragStatus', true)
        },
        handleDelete(mid) {
            bus.$emit('delete-node', mid)
        },
        handleEdit(mid) {
            bus.$emit('edit-element', mid)
        },
        handleDragoverStop() {
            return false
        },
        handleDropStop() {
            this.$store.commit('changeDragStatus', false)
            return false
        },
        handleSetActive({ _mid }) {
            bus.$emit('edit-element', null)
            this.$store.commit('setActiveMid', _mid)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .card {
        display: flex;
        align-items: center;
        user-select: none;

        &.top-line {
            position: relative;
            z-index: 1;

            &:before {
                z-index: -1;
                content: '';
                width: 2px;
                top: 0;
                bottom: 50%;
                background: #9d5b8b;
                position: absolute;
                left: 0;
            }
        }

        &.bottom-line {
            position: relative;
            z-index: 1;

            &:after {
                z-index: -1;
                content: '';
                width: 2px;
                top: 50%;
                bottom: 0;
                background: #9d5b8b;
                position: absolute;
                left: 0;
            }
        }

        > .el-card {
            height: 80px;
            min-width: 250px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 30px 0 30px 0;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(85, 41, 91, 0.3);
            position: relative;
            z-index: 1;
            transition: 0.3s all ease;

            &.is-active {
                box-shadow: 0 0 15px rgba(0, 163, 129, 0.5);
            }

            .el-content {
                background: rgba(255, 255, 255, 0.7);
                display: flex;
                flex-direction: column;
                cursor: pointer;
                height: 100%;
                width: 100%;

                .top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 36px;
                    width: 100%;
                    padding: 0 15px;

                    .tag {
                        cursor: pointer;
                        color: rgba(85, 41, 91, 0.8);

                        &:hover {
                            color: #55295b;
                            text-shadow: 0 0 3px rgba(85, 41, 91, 0.1);
                        }
                    }

                    .icon {
                        i {
                            display: inline-block;
                            width: 20px;
                            height: 20px;
                            background-repeat: no-repeat;
                            background-size: auto 100%;
                            background-position: center center;
                            cursor: pointer;

                            &.delete {
                                background-image: url('../../assets/icon-delete.svg');
                            }
                        }
                    }
                }
            }

            .behind-around {
                right: 0;
                top: 50%;
                transform: translate(50%, -50%);
            }

            .top-around {
                top: 0;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .bottom-around {
                bottom: 0;
                left: 50%;
                transform: translate(-50%, 50%);
            }

            .add-around {
                position: absolute;
                display: flex;
                z-index: 2;
                width: 75px;
                height: 75px;
                align-items: center;
                justify-content: center;

                // background: rgba(0, 164, 151, 0.1);
                &:before {
                    content: '';
                    display: none;
                    width: 15px;
                    height: 15px;
                    border: 1px solid #00a497;
                    border-radius: 50%;
                    background: #00a497;
                    box-shadow: 0 0 10px rgba(0, 164, 151, 0.5);
                }

                &.show {
                    &:before {
                        display: block;
                    }
                }
            }

            &.ahead-line {
                margin-left: 40px;

                &:before {
                    z-index: -1;
                    content: '';
                    width: 37px;
                    height: 2px;
                    position: absolute;
                    left: -3px;
                    background-color: #9d5b8b;
                    transform: translateX(-100%);
                }
            }

            &.behind-line {
                margin-right: 40px;

                &:after {
                    z-index: -1;
                    content: '';
                    width: 40px;
                    height: 2px;
                    background-color: #9d5b8b;
                    position: absolute;
                    right: 0;
                    transform: translateX(100%);
                }
            }

            .arrow {
                width: 20px;
                height: 20px;
                position: absolute;
                left: 0;
                transform: translateX(-100%);
                background-image: url('../../assets/icon-to-left.svg');
                background-repeat: no-repeat;
                background-size: 12px;
                background-position: right center;
            }
        }

        > .content {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            border-radius: 4px;
            background: #55295b;
            color: #fff;
            position: relative;
            z-index: 1;
        }

        .render-card {
            display: flex;
            flex-direction: column;
        }
    }
</style>