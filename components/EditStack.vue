<template lang="tea">
    ul.stack {
        li.list {
            %: list
            span.show {
                ~~{{$it | formatAttr}}
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
                placeholder: 变量或函数请以$符号开头
                @keyup.enter: handleAdd
                v-model: newValue
            }
            span.key-value {
                /
                input {
                    v-model: newKey
                    placeholder: key
                }
                input {
                    placeholder: value
                    @keyup.enter: handleAdd
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
const ins = new Map()
    .set('%', 'v-for')
    .set('?', 'v-if')
    .set('/', 'v-else')
    .set('/?', 'v-else-if')
    .set('|', 'v-show')
const replaceKey = value => ins.get(value) || value
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
            const arr = this.list.concat()
            if (this.mode === 1) {
                if (!this.newValue.trim()) {
                    return
                }
                value = this.newValue.trim()
                arr.push(value)
                this.$emit('change', arr)
                this.newKey = this.newValue = ''
                return
            }
            const attrObj = {}
            arr.forEach(item => {
                const [key] = Object.keys(item)
                const [value] = Object.values(item)
                attrObj[key] = value
            })
            let _key = this.newKey !== '' ? replaceKey(this.newKey) : '@click'
            let _value = this.newValue.trim() || null
            // if key is v-for
            if (_key === 'v-for') {
                !~_value.indexOf('in') && (_value = `($it, $_i) in ${_value}`)
                if (!attrObj[':key']) {
                    const res = _value.match(/(?<=\s)[\S]+?(?=\))/)
                    attrObj[':key'] = res[0]
                }
            }
            attrObj[_key] = _value
            const newArr = []
            for (const key in attrObj) {
                newArr.push({ [key]: attrObj[key] })
            }
            this.$emit('change', newArr)
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
    },
    filters: {
        formatAttr(value) {
            if (typeof value === 'object') {
                const [data] = Object.entries(value)
                return data[1] == null ? `${data[0]}` : `${data[0]}="${data[1]}"`
            }
            return value
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
        min-height: 26px;
        display: flex;
        align-items: center;

        &.add-li {
            display: flex;
            flex-direction: column;
            width: 100%;
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
            height: 34px;
            width: 100%;
            padding: 0 10px;
            margin-bottom: 10px;
            font-size: 16px;
            color: #55295b;
            border: none;
            border-bottom: 1px solid rgba(85, 41, 91, 0.7);

            &::placeholder {
                font-size: 12px;
                color: rgba(85, 41, 91, 0.3);
                font-style: italic;
            }
        }

        .key-value {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 16px;
            margin-bottom: 10px;
            flex: 1;
            width: 100%;
            height: 60px;

            input {
                flex-shrink: 0;
                height: 30px;
                width: 100%;
                display: flex;
                padding: 0 10px;
                font-size: 16px;
                color: #55295b;
                border: none;
                border-bottom: 1px solid rgba(85, 41, 91, 0.7);

                &[placeholder] {
                    color: #55295b;
                }

                &::placeholder {
                    font-size: 12px;
                    color: rgba(85, 41, 91, 0.3);
                    font-style: italic;
                }
            }
        }

        .add {
            width: 100%;
            height: 34px;
            background: #55295b;
            color: #fff;
            flex-shrink: 0;
            border-radius: 4px;
        }
    }
}
</style>