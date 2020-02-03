<template lang="tea">
section {
    :class: ['edit-page', {'show': hasEditElement}]
    i.close {
        @click: handleClose
    }
    ul.attr {
        ?: hasEditElement
        li.inline {
            span.title {
                ~~元素名
            }
            input {
                v-model: dataModel.tagName
            } 
        }
        li.inline {
            span.title {
                ~~双 / 单标签
            }
            span.radio {
                VsRadio {
                    v-model: dataModel.isSingle
                    :vs-value: false
                    ~~双标签
                }
                VsRadio {
                    v-model: dataModel.isSingle
                    :vs-value: true
                    ~~单标签
                }
            }
        }
        li.inline {
            ?: !dataModel.isSingle
            span.title {
                ~~文本内容
            }
            input {
                @blur: handleBlur
                v-model: dataModel.content
            } 
        }
        li.block {
            span.title {
                ~~class
            }
            EditStack {
                :mode: 1
                :list: dataModel.class
                @change: handleUpdateClass
            }            
        }
        li.block {
            span.title {
                ~~属性
            }
            EditStack {
                :mode: 2
                :list: dataModel.attr
                @change: handleUpdateAttr
            }   
        }
        li {
            span.title {
                ~~css树
            }
        }
    }
}
</template>
<script>
import bus from '@/utils/eventBus'
import EditStack from '@/components/EditStack'
const makeMap = string => {
    const list = string.split(',')
    return tag => list.includes(tag)
}

const isSingleTag = makeMap('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr')
export default {
    name: 'EditPage',
    components: {
        EditStack
    },
    data: () => ({
        dataModel: {}
    }),
    methods: {
        handleClose() {
            this.handleBlur()
            this.$store.commit('setEditElement', null)
        },
        handleBlur() {
            // 清空缓存中的信息
            const data = this.dataModel
            if (isSingleTag(data.tagName)) {
                data.isSingle = true
                data.content = ''
            } else {
                data.isSingle = false
            }
            // 将信息保存到对应的位置
            bus.$emit('update-element', data._mid, data)
        },
        handleUpdateClass(data) {
            this.dataModel.class = data
            this.handleBlur()
        },
        handleUpdateAttr(data) {
            this.dataModel.attr = data
            this.handleBlur()
        }
    },
    computed: {
        hasEditElement() {
            return !!this.$store.state.editElement
        }
    },
    watch: {
        '$store.state.editElement': {
            handler(data) {
                if (!data) {
                    return
                }
                const { children, ..._data } = data
                this.dataModel = JSON.parse(JSON.stringify(_data))
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.edit-page {
    position: fixed;
    transition: all 0.6s ease;
    width: 400px;
    z-index: 2;
    border-radius: 10px;
    box-shadow: 0 0 10px #55295C;
    background: #fff;
    top: 100vh;
    bottom: 0;
    right: 1150px;
    padding: 40px 0;
    box-sizing: border-box;

    &.show {
        top: 70px;
        bottom: 15px;
    }

    .attr {
        li {
            list-style-type: none;

            &.inline {
                display: flex;
                align-items: center;
                height: 30px;
                margin-bottom: 10px;
            }

            &.block {
                border-bottom: 1px solid rgba(85, 41, 91, 0.2);
                padding: 10px 20px;

                .title {
                    padding: 0;
                }
            }

            >input {
                display: block;
                width: 240px;
                height: 100%;
                border: none;
                padding: 0 10px;
                border-bottom: 1px solid rgba(85, 41, 91, 0.5);
                font-size: 16px;
            }

            .radio {
                width: 200px;
                display: flex;
                justify-content: space-around;
            }

            .title {
                color: rgba(85, 41, 91, 0.8);
                width: 120px;
                height: 30px;
                padding-left: 20px;
                display: flex;
                align-items: center;
                font-size: 14px;
                user-select: none;
            }

            .css-code {
                font-size: 12px;
                padding: 10px 20px;
            }
        }
    }

    .close {
        position: absolute;
        right: 10px;
        top: 10px;
        display: block;
        width: 25px;
        height: 25px;
        cursor: pointer;
        border-radius: 50%;
        transition: all 0.4s ease;
        transform: rotate(0deg);
        background-color: #fff;
        background-size: 80% 80%;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: url('../../assets/icon-close.svg');

        &:hover {
            background-color: rgba(85, 41, 91, 0.2);
            transform: rotate(-90deg);
        }
    }
}
</style>