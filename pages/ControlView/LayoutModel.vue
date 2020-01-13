<template>
  <section class="set-el-view">
    <nav>布局设置</nav>
    <div class="set-el">
      <VsButton color="primary" type="border">Flex模型</VsButton>
      <VsButton color="primary" type="border">Grid模型</VsButton>
      <VsButton color="primary" type="border">Box模型</VsButton>
      <VsButton color="primary" type="border">Position</VsButton>
      <!-- <VsButton @click="oftenLayoutStatus = true" color="primary" type="border">常用布局</VsButton> -->
    </div>
    <nav>参数设置</nav>
    <VsList>
      <VsListHeader title="选项设置" />
      <SelectInteraction :data="sel" :key="sel.key" v-for="sel in selectModel" />
      <VsListHeader title="输入设置" />
      <InputInteraction :data="inp" :key="inp.key" @set-number="handleSetNumber(index)" v-for="(inp, index) in inputModel" />
    </VsList>
    <div @blur="handleBlur" class="set-num" ref="setNum" tabindex="0" v-show="isSetNumShow">
      <SelectNum v-model="setValue" />
    </div>
    <vs-popup
      :active.sync="oftenLayoutStatus"
      background-color="rgba(255,255,255,.6)"
      background-color-popup="#fff"
      style="color:#55295b"
      title="常用布局"
    >
      <OftenLayout @select="handleSelectLayout" />
    </vs-popup>
  </section>
</template>
<script>
import _setModel from './setModel'
import SelectInteraction from '~/components/SelectInteraction'
import InputInteraction from '~/components/InputInteraction'
import SelectNum from '~/components/SelectNum'
import OftenLayout from '~/components/OftenLayout'

const selectModel = _setModel()
    .filter(({ value }) => typeof value !== 'string')
    .map(({ value, ...item }) => ({ data: value[0], value, ...item }))
const inputModel = _setModel()
    .filter(({ value }) => typeof value === 'string')
    .map(({ value, ...item }) => ({ data: value, unit: 'em', value, ...item }))

export default {
    name: 'LayoutModel',
    components: {
        SelectInteraction,
        InputInteraction,
        SelectNum,
        OftenLayout
    },
    data: () => ({
        selectModel,
        inputModel,
        inputData: [],
        oftenLayoutStatus: false,
        isSetNumShow: false,
        setValue: '',
        setIndex: 0
    }),
    methods: {
        handleBlur() {
            this.isSetNumShow = false
        },
        handleSetNumber(index) {
            this.setIndex = index
            this.setValue = this.inputModel[index].data
            this.isSetNumShow = true
            this.$nextTick(() => {
                this.$refs.setNum.focus()
            })
        },
        handleSelectLayout(index) {
            console.log(`选择了${index}号布局`)
            this.oftenLayoutStatus = false
        }
    },
    watch: {
        setValue(data) {
            const _data = this.inputModel[this.setIndex]
            this.$set(this.inputModel, this.setIndex, Object.assign(_data, { data: data }))
        }
    }
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
                width: 80px;
            }
        }
    }

    /deep/ .vs-list .material-icons {
        font-size: 15px;
        color: #55295b;
    }

    .set-num {
        position: fixed;
        right: 430px;
        top: 40vh;
    }
</style>