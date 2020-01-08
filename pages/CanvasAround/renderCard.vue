<template lang="tea">
section {
    :class: ['card', { 'top-line': !!treeData._pid && !isFirst}, {'bottom-line': !!treeData._pid && !isLast}]
    span.content {
        v-if: treeData.type === 1
        ~~{{ treeData.content }}
    }
    div {
        /
        :class: ['el-card', { 'ahead-line': !!treeData._pid}, {'behind-line': hasChildren}]
        i.arrow {
            ?: !!treeData._pid
        }
        b {
            @dragover: showMyAround(1)
            @dragleave: showMyAround(0)
            @drop.stop: handleDrop(1)
            :class: ['top-light', {'add-light': isDrag}, {'show': showAroundIndex === 1}]
        } 
        b {
            @dragover: showMyAround(2)
            @dragleave: showMyAround(0)
            @drop.stop: handleDrop(2)
            :class: ['behind-light', {'add-light': isDrag}, {'show': showAroundIndex === 2}]
        }
        b {
            @dragover: showMyAround(3)
            @dragleave: showMyAround(0)
            @drop.stop: handleDrop(3)
            :class: ['bottom-light', {'add-light': isDrag}, {'show': showAroundIndex === 3}]
        }
        div.el-content {
            draggable: true
            ~~{{ treeData.tagName }}    
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
        hasChildren() {
            return this.treeData.children && this.treeData.children.length
        },
        isDrag() {
            return this.$store.state.isDrag
        }
    },
    methods: {
        showMyAround(n) {
            this.showAroundIndex = n
        },
        handleDrop(n) {
            console.log(`你在${this.treeData._mid}元素的${n}号点上释放了`)
            this.showMyAround(0)
            bus.$emit('append-node', this.treeData._mid, n)
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
                left: 40px;
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
                left: 40px;
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
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(85, 41, 91, 0.3);
            position: relative;
            z-index: 1;

            .el-content {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                width: 100%;
            }

            .add-light {
                position: absolute;
                display: flex;
                z-index: 3;
                width: 80px;
                height: 80px;
                align-items: center;
                justify-content: center;

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

            .behind-light {
                right: 0;
                top: 50%;
                transform: translate(50%, -50%);
            }

            .top-light {
                top: 0;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .bottom-light {
                bottom: 0;
                left: 50%;
                transform: translate(-50%, 50%);
            }

            &.ahead-line {
                margin-left: 80px;

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