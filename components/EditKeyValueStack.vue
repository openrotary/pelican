<template lang="tea">
    ul.stack {
        li.list {
            %: list
            span.show {
                ~~{{$it | formatAttr}}
            }
            span.icon {
                i.edit {
                    @click: handleEdit($_i)
                }
                i.delete {
                    @click: handleOrder($_i, 0)
                }
            }
        }
        li.add-li {
            div.key-value {
                MyInput {
                    title: Key
                    v-model: newKey
                }
                MyInput {
                    title: Value
                    @keyup-enter: handleAdd
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
import MyInput from './MyInput'

const ins = new Map()
    .set('%', 'v-for')
    .set('?', 'v-if')
    .set('/', 'v-else')
    .set('/?', 'v-else-if')
    .set('|', 'v-show')
const replaceKey = value => ins.get(value) || value
export default {
    name: 'EditKeyValueStack',
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    components: {
        MyInput
    },
    data: () => ({
        newKey: '',
        newValue: ''
    }),
    methods: {
        handleAdd() {
            const arr = this.list.concat()
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
            this.$emit('change', arr)
        },
        handleEdit(i) {
            const [key] = Object.keys(this.list[i])
            const [value] = Object.values(this.list[i])
            this.newKey = key
            this.newValue = value
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

                    &.edit {
                        background-image: url('../assets/icon-build.svg');
                    }

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

        .key-value {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 16px;
            margin-bottom: 10px;
            flex: 1;
            width: 100%;
            height: 60px;

            .key, .value {
                width: 100%;
                display: flex;
                align-items: center;
                margin-right: 10px;

                i {
                    color: rgba(85, 41, 91, 1);
                    width: 56px;
                    font-style: normal;
                }
            }

            input {
                flex: 1;
                height: 30px;
                width: 100%;
                display: flex;
                padding: 0 10px;
                margin: 5px 0;
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
            width: 100px;
            height: 34px;
            background: #55295b;
            color: #fff;
            flex-shrink: 0;
            align-self: flex-end;
            border-radius: 4px;
        }
    }
}
</style>