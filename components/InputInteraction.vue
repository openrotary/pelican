<template lang="tea">
  div.inp {
    span.checkbox {
        VsCheckbox {
            v-model: isChecked
            :vs-value: data.key
        }
    }
    div.input {
        VsListItem {
            :title: data.key
            :subtitle: data.tips || ''
            div.inline {
                button {
                    ~~Set
                    @click: handleSelect
                }
                input {
                    v-model: data.data
                }
                SelectUnit  {
                    v-model: data.unit
                }
            }
        }
    }
}
</template>

<script>
import SelectUnit from '~/components/SelectUnit'

export default {
    name: 'InputInteraction',
    props: {
        data: {
            type: Object,
            default: []
        }
    },
    components: {
        SelectUnit
    },
    data: () => ({
        isChecked: false
    }),
    methods: {
        handleSelect(e) {
            this.$emit('set-number')
        }
    }
}
</script>

<style lang="stylus" scoped>
    .sel, .inp {
        display: flex;
        align-items: center;

        .checkbox {
        }

        .select, .input {
            display: flex;
            flex: 1;
            justify-content: space-between;

            .vs-list--item {
                // 修改框架样式
                width: 100%;
            }

            .inline {
                display: flex;
                width: 160px;
                align-items: center;
                justify-content: space-between;

                input {
                    width: 50px;
                    height: 26px;
                    border-radius: 4px;
                    border: none;
                    padding: 0 8px;
                    font-size: 16px;
                    color: #cc7eb1;
                }

                button {
                    width: 50px;
                    height: 26px;
                    background: #55295b;
                    border-radius: 4px;
                    border: none;
                    padding: 0 8px;
                    font-size: 16px;
                    color: #fff;
                    text-shadow: 0 0 2px #fff;
                }
            }
        }
    }

    .select-num {
        position: fixed;
    }
</style>