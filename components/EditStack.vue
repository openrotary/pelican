<template lang="tea">
    ul.stack {
        li.list {
            %: list
            span.show {
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
        li.add-li {
            input {
                ?: mode === 1
                v-model: newValue
            }
            span.key-value {
                /
                input {
                    v-model: newKey
                }
                b {
                    ~~:
                }
                input {
                    v-model: newValue
                }
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
        },
        mode: {
            type: Number,
            default: 1
        }
    },
    data: () => ({
        newKey: '',
        newValue: ''
    }),
    methods: {
        handleAdd() {
            let value = ''
            if (this.mode === 1) {
                value = this.newValue.trim()
            } else {
                value = {
                    [this.newKey]: this.newValue
                }
            }
            if (!value) {
                this.newKey = this.newValue = ''
                return
            }
            const arr = this.list.concat()
            arr.push(value)
            this.$emit('change', arr)
            this.newKey = this.newValue = ''
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

            &.add-li {
                margin-top: 10px;
            }

            &.list {
                cursor: pointer;
                padding: 0 10px;
                display: flex;
                justify-content: space-between;

                &:hover {
                    background: rgba(85, 41, 91, 0.1);
                }

                .show {
                    color: rgba(85, 41, 91, 0.7);
                    font-size: 14px;
                    font-style: italic;
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

            >input {
                flex: 1;
                height: 28px;
                padding: 0 10px;
                font-size: 16px;
                margin-right: 20px;
                color: #55295b;
            }

            .key-value {
                display: flex;
                align-items: center;
                font-size: 16px;
                margin-right: 20px;
                flex: 1;
                width: 1px;

                input {
                    height: 28px;
                    padding: 0 10px;
                    width: 1px;
                    font-size: 16px;
                    color: #55295b;

                    &:first-child {
                        flex: 1;
                    }

                    &:last-child {
                        flex: 2;
                    }
                }

                b {
                    display: inline-block;
                    margin: 0 4px;
                }
            }

            .add {
                width: 60px;
                height: 28px;
                background: #55295b;
                color: #fff;
                flex-shrink: 0;
                border-radius: 4px;
            }
        }
    }
</style>