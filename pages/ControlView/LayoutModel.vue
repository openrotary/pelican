<template lang="tea">
section.layout-model {
    div.select {
        ?: hasActiveCssSelect
        span {
            ~~选择器
        }
        input {
            type: text
            v-model: cssSelect.select
            @blur: handleEditFinish
        }
    }
    ul.css-layout {
        ?: hasActiveCssSelect
        li.quick-layout {
            %: quickList
            nav {
                ~~{{ $it.key }}
            }
            span.range {
                @click: handleQuickClick(it.code)
                v-for: (it, index) in $it.range
                :key: index + it.code
                ~~{{ it.label }}
            }
        }
        li.normal {
            %: layoutList
            :key: $_i + 'layout'
            div.key-value {
                i.delete {
                    @dblclick: handleDelete($it.key)
                }
                span.key {
                    ~~{{ $it.key }}
                }
                span.value {
                    ?: $it.range.length
                    ~~{{ cssSelect.cssom && cssSelect.cssom[$it.key] ? cssSelect.cssom[$it.key] : '' }}
                }
                input.input-value {
                    /
                    type: text
                    @blur: handleEditFinish
                    v-model: cssSelect.cssom[$it.key]
                }
            }
            span.range {
                v-for: (it, index) in $it.range
                :key: index + it
                @click: handleClick($it.key, it)
                |: !cssSelect.cssom || !cssSelect.cssom[$it.key] || (cssSelect.cssom && cssSelect.cssom[$it.key] && (cssSelect.cssom[$it.key] !== it)) ? true : false
                ~~{{ it }}
            }
        }
    }
}
</template>
<script>
import { quickLayout, layoutModel, getCodeByCode } from './setModel'
import bus from '@/utils/eventBus'
const quickList = quickLayout()
const layoutList = layoutModel()
export default {
    name: 'LayoutModel',
    data: () => ({
        cssSelect: [],
        quickList,
        layoutList
    }),
    computed: {
        hasActiveCssSelect() {
            return this.$store.state.selectCssMid
        }
    },
    methods: {
        handleEditFinish() {
            const element = JSON.parse(JSON.stringify(this.$store.state.editElement))
            if (!element) {
                return
            }
            const data = this.cssSelect
            // 过滤掉所有css值为null的属性
            for (const key in data.cssom) {
                if (data.cssom[key] == null) {
                    console.log(`Delete ${key}`)
                    delete data.cssom[key]
                }
            }
            const css = element.css.map(item => (item._mid === data._mid ? data : item))
            element.css = css
            this.$store.commit('setEditElement', JSON.parse(JSON.stringify(element)))
            bus.$emit('change-css', data)
        },
        handleClick(key, value) {
            const data = Object.assign({}, this.cssSelect)
            data.cssom[key] = value
            this.cssSelect = data
            this.handleEditFinish()
        },
        handleQuickClick(code) {
            console.log('code', code)
            const data = Object.assign({}, this.cssSelect)
            const _data = getCodeByCode(code)
            for (const key in _data) {
                data.cssom[key] = _data[key]
            }
            this.cssSelect = data
            this.handleEditFinish()
        },
        handleDelete(key) {
            this.cssSelect.cssom[key] = null
            this.handleEditFinish()
        }
    },
    watch: {
        '$store.state.selectCssMid': {
            handler(value) {
                if (!value) {
                    return
                }
                const element = JSON.parse(JSON.stringify(this.$store.state.editElement))
                if (!element) {
                    return
                }
                const [cssSelect] = element.css.filter(item => item._mid === value)
                this.cssSelect = cssSelect
                bus.$emit('change-css', cssSelect)
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.layout-model {
    width: 400px;
    overflow: auto;
    padding: 15px;

    .select {
        display: flex;
        align-items: center;
        height: 30px;
        width: 100%;
        margin-bottom: 10px;
        font-size: 14px;

        span {
            width: 100px;
            color: rgba(85, 41, 91, 0.8);
        }

        input {
            width: 240px;
            height: 30px;
            border: none;
            border-bottom: 1px solid rgba(85, 41, 91, 0.5);
            font-size: 16px;
        }
    }

    .css-layout {
        > li {
            list-style: none;
        }

        .quick-layout {
            margin-bottom: 10px;

            nav {
                font-size: 14px;
            }
        }

        .normal {
        }

        .key-value {
            font-size: 16px;
            display: flex;
            align-items: center;
            height: 25px;
            user-select: none;

            .delete {
                cursor: pointer;
                display: flex;
                width: 20px;
                height: 20px;
                background-image: url('../../assets/icon-delete.svg');
                background-position: center center;
                background-size: 90% 90%;
                background-repeat: no-repeat;
                transform: translateX(-6px);
            }

            .key {
                color: rgba(85, 41, 91, 1);
                flex: 1;
            }

            .value {
                flex: 1;
                display: inline-flex;
                padding: 0 8px;
                height: 20px;
                align-items: center;
                border-bottom: 1px solid rgba(85, 41, 91, 0.5);
                color: rgba(85, 41, 91, 1);
                box-sizing: border-box;
            }

            .input-value {
                flex: 1;
                height: 20px;
                padding: 0 8px;
                font-size: 15px;
                border: none;
                border-bottom: 1px solid rgba(85, 41, 91, 0.5);
            }
        }

        .range {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            cursor: pointer;
            color: rgba(85, 41, 91, 0.7);
            font-size: 14px;
            padding: 0 10px;

            &:hover {
                background: rgba(85, 41, 91, 0.6);
                color: #fff;
            }
        }
    }
}
</style>