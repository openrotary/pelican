<template lang="tea">
    section.set-el-view {
      nav {
        ~~布局模型
      }
      div.set-el {
        VsButton {
          color: primary
          type: border
          ~~Flex模型
        }
        VsButton {
          color: primary
          type: border
          ~~盒子模型
        }
        VsButton {
          color: primary
          type: border
          ~~定位模型
        }
      }
      nav {
        ~~属性设置
      }
      VsList {
        VsListHeader {
          title: 选项设置
        }
        div.sel {
          %: selectModel
          :key: $it.key
          span.checkbox {
            VsCheckbox {
              v-model: selectData
              :vs-value: $it.key
            }
          }
          div.select {
            VsListItem {
              :title: $it.key
              VsSelect {
                placeholder: Select
                label-placeholder: Multiple
                v-model: selectModel[$_i].data
                VsSelectItem {
                  v-for: sel in $it.value
                  :key: sel
                  :value: sel
                  :text: sel
                }
              }
            }
          }
        }
        VsListHeader {
          title: 输入设置
        }
        div.inp {
          %: inputModel
          :key: $it.key
          span.checkbox {
            VsCheckbox {
              v-model: selectData
              :vs-value: $it.key
            }
          }
          div.input {
            VsListItem {
              :title: $it.key
              :subtitle: $it.tips || ''
              span {
                ~~憨憨
              }
            }
          }
        }
    }
  }
</template>
<script>
import _setModel from './setModel'

const selectModel = _setModel()
  .filter(({ value }) => typeof value !== 'string')
  .map(({ value, ...item }) => ({ data: value[0], value, ...item }))
const inputModel = _setModel()
  .filter(({ value }) => typeof value === 'string')
  .map(({ value, ...item }) => ({ data: value, value, ...item }))

export default {
  name: 'LayoutModel',
  data: () => ({
    selectModel,
    inputModel,
    selectData: [],
    inputData: []
  })
}
</script>
<style lang="stylus" scoped>
nav {
  background: #55295b;
  color: #fff;
  padding: 0 20px;
  height: 40px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 5px #fff;
}

.set-el-view {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 400px;

  .set-el {
    padding: 15px 0;
    display: flex;
    justify-content: space-around;

    .vs-button {
      width: 100px;
    }
  }

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
}

/deep/ .vs-list .material-icons {
  font-size: 15px;
  color: #55295b;
}
</style>