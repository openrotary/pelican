<template lang="tea">
section {
    :class: ['card', `type${treeType}`, {'isParent': !treeData._pid}, { 'row-top-line': showTopLine}, {'row-bottom-line': showBottomLine}, {'column-line': treeType==2}]
    div {
        @drop.stop: handleDropStop()
        :class: ['el-card', `type${treeType}`, { 'ahead-line': !!treeData._pid}, {'behind-line': hasChildren}, {'is-active': isActive}]
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
            div.bottom {
                span.content {
                    ~~{{treeData.content}}
                }
            }
        }
    }
    div.render-card {
        RenderCard {
            v-if: hasChildren
            %: treeData.children
            :treeType: treeType
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
        },
        treeType: {
            type: Number | String,
            default: 1
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
        },
        showTopLine() {
            // 这里用两个等号是为了兼容 数字和字符串
            return this.treeType == 1 && !!this.treeData._pid && !this.isFirst
        },
        showBottomLine() {
            // 这里用两个等号是为了兼容 数字和字符串
            return this.treeType == 1 && !!this.treeData._pid && !this.isLast
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
    user-select: none;

    &.row-top-line, &.row-bottom-line, &.column-line {
        position: relative;
        z-index: 1;
    }

    &.row-top-line:before, &.row-bottom-line:after, &.column-line:before, &.column-line:after {
        z-index: -1;
        content: '';
        background: #9d5b8b;
        position: absolute;
    }

    &.type1 {
        align-items: center;
    }

    &.type2 {
        flex-direction: column;
        margin-left: 165px;

        &.isParent {
            margin-left: 0;

            &.column-line:before, &.column-line:after {
                display: none;
            }

            >.render-card > .card.type2 {
                margin-left: 125px;
            }
        }
    }

    &.type1.row-top-line {
        &:before {
            width: 2px;
            top: 0;
            bottom: 50%;
            left: 0;
        }
    }

    &.type1.row-bottom-line {
        &:after {
            width: 2px;
            top: 50%;
            bottom: 0;
            left: 0;
        }
    }

    &.type2.column-line {
        &:before {
            width: 2px;
            top: -30px;
            height: 95px;
            left: 0px;
        }

        &:after {
            width: 2px;
            top: 0px;
            bottom: 30px;
            left: 0px;
        }

        &:last-child:after {
            display: none;
        }
    }

    > .el-card {
        height: 80px;
        width: 250px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
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
            justify-content: space-between;
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

            .bottom {
                height: 22px;
                border-top: 1px solid rgba(85, 41, 91, 0.2);
                display: flex;
                align-items: center;

                .content {
                    padding: 0 10px;
                    font-size: 12px;
                    color: rgba(85, 41, 91, 0.6);
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

        &.type1 {
            margin: 30px 0 30px 0;
        }

        &.type2 {
            margin: 25px 0 30px 0;
        }

        &.ahead-line:before, &.behind-line:after {
            z-index: -1;
            content: '';
            position: absolute;
            background-color: #9d5b8b;
        }

        &.type1.ahead-line {
            margin-left: 40px;

            &:before {
                width: 37px;
                height: 2px;
                left: -3px;
                transform: translateX(-100%);
            }
        }

        &.type1.behind-line {
            margin-right: 40px;

            &:after {
                width: 40px;
                height: 2px;
                right: 0;
                transform: translateX(100%);
            }
        }

        &.type2.ahead-line {
            margin-left: 40px;

            &:before {
                width: 37px;
                height: 2px;
                left: -3px;
                transform: translateX(-100%);
            }
        }

        &.type2.behind-line {
            margin-right: 40px;
        }

        .arrow {
            position: absolute;
            background-image: url('../../assets/icon-to-left.svg');
            background-repeat: no-repeat;
            background-size: 12px;
            width: 20px;
            height: 20px;
            left: 0;
            transform: translateX(-100%);
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