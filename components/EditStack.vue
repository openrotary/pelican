<template lang="tea">
    ul.stack {
        li.list {
            %: list
            span {
                ~~{{$it}}
            }
            span.icon {
                i.up {
                    @click: handleOrder($_i, 1)
                }
                i.down {
                    @click: handleOrder($_i, 2)
                }
                i.delete {
                    @click: handleOrder($_i, 0)
                }
            }
        }
        li {
            input {
                v-model: newAttr
            }
            button.add {
                @click: handleAdd
                ~~Add
            }
        }
    }
</template>

<script>
export default {
    name: 'EditStack',
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({
        newAttr: ''
    }),
    methods: {
        handleAdd() {
            const arr = this.list.concat()
            arr.push(this.newAttr.trim())
            this.$emit('change', arr)
            this.newAttr = ''
        },
        handleOrder(i, n) {
            const arr = this.list.concat()
            const [data] = arr.splice(i, 1)
            if (n === 1) {
                // 置顶
                arr.unshift(data)
            }
            if (n === 2) {
                arr.push(data)
            }
            this.$emit('change', arr)
        }
    }
}
</script>

<style lang="stylus" scoped>
.stack {
    display: flex;
    flex-direction: column;
    flex: 1;

    li {
        list-style: none;
        height: 26px;
        display: flex;
        align-items: center;

        &.list {
            cursor: pointer;
            padding: 0 10px;
            display: flex;
            justify-content: space-between;

            &:hover {
                background: rgba(85, 41, 91, 0.1);
            }

            .icon {
                display: flex;
                align-items: center;

                i {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-size: 80% 80%;

                    &.up {
                        background-image: url('../assets/icon-up.svg');
                    }

                    &.down {
                        background-image: url('../assets/icon-down.svg');
                    }

                    &.delete {
                        background-image: url('../assets/icon-delete.svg');
                    }
                }
            }
        }

        input {
            flex: 1;
            height: 28px;
            padding: 0 10px;
            font-size: 16px;
            margin-right: 20px;
        }

        .add {
            width: 60px;
            height: 28px;
            background: #55295b;
            color: #fff;
            border-radius: 4px;
        }
    }
}
</style>