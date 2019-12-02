<template lang="tea">
  div.sel {
    span.checkbox {
        VsCheckbox {
            v-model: isChecked
            :vs-value: data.key
        }
    }
    div.select {
        VsListItem {
            :title: data.key
                VsSelect {
                    placeholder: Select
                    label-placeholder: Multiple
                    v-model: data.data
                    VsSelectItem {
                        %: data.value
                        :value: $it
                        :text: $it
                    }
                }
            }
        }
    }
</template>

<script>
export default {
    name: 'SelectInteraction',
    props: {
        data: {
            type: Object,
            default: []
        }
    },
    data: () => ({
        selectData: '',
        isChecked: false
    })
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
        }
    }
</style>