<template lang="tea">
section {
    :class: ['edit-page', {'show': hasEditElement}]
    i.close {
        @click: handleClose
    }
    i.modal {
        ?: hasEditElement
        @click: handleClose
    }
    ul.attr {
        ?: hasEditElement
        li.inline {
            MyInput {
                title: 元素名
                @blur: handleUpdate
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
            MyInput {
                title: 文本内容
                @blur: handleUpdate
                @keyup.enter: handleUpdate
                v-model: dataModel.content
            } 
        }
        li.block {
            ?: isHTMLElement
            span.title {
                ~~样式class
            }
            EditStack {
                :list: dataModel.class
                @change: handleUpdateClass
            }            
        }
        li.block {
            span.title {
                ~~属性
            }
            EditKeyValueStack {
                :list: dataModel.attr
                @change: handleUpdateAttr
            }   
        }
        li.block {
            span.title {
                ~~功能模板
            }
        }
    }
}
</template>
<script>
import bus from '@/utils/eventBus'
import EditStack from '@/components/EditStack'
import MyInput from '@/components/MyInput'
import EditKeyValueStack from '@/components/EditKeyValueStack'
import { num2ABC } from '@/utils/comput'
const makeMap = string => {
    const list = string.split(',')
    return tag => list.includes(tag)
}

const isSingleTag = makeMap('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr')
const isHTMLTag = makeMap(
    `html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot`
)
export default {
    name: 'EditPage',
    components: {
        MyInput,
        EditStack,
        EditKeyValueStack
    },
    data: () => ({
        dataModel: {}
    }),
    methods: {
        handleClose() {
            this.handleUpdate()
            this.$store.commit('setEditElement', null)
            this.$store.commit('setSelectCssMid', null)
            bus.$emit('change-css', null)
        },
        handleUpdate() {
            // 清空缓存中的信息
            const data = this.dataModel
            if (isSingleTag(data.tagName)) {
                data.isSingle = true
                data.content = ''
            } else {
                data.isSingle = false
            }
            if (!isHTMLTag(data.tagName)) {
                // 不是html原生标签，清空class属性
                data.class = []
            } else {
                // 是html原生标签, 如果需要，给默认class
                !data.class.length && (data.class = [num2ABC(data._mid.slice(-5))])
                console.log(data.class)
            }
            // 将信息保存到对应的位置
            bus.$emit('update-element', data._mid, data)
        },
        handleUpdateClass(data) {
            this.dataModel.class = data
            this.handleUpdate()
        },
        handleUpdateAttr(data) {
            console.log(data)
            this.dataModel.attr = data
            this.handleUpdate()
        }
    },
    computed: {
        hasEditElement() {
            return !!this.$store.state.editElement
        },
        isHTMLElement() {
            return isHTMLTag(this.dataModel.tagName)
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
        transition: all 0.4s ease;
        width: 600px;
        z-index: 2;
        border-radius: 10px;
        box-shadow: 0 0 10px #55295C;
        background: #fff;
        top: 100vh;
        bottom: 0;
        right: 840px;
        padding: 50px 0;
        box-sizing: border-box;

        &.show {
            top: 70px;
            bottom: 15px;
        }

        .attr {
            li {
                list-style-type: none;

                &.inline {
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    height: 30px;
                    margin-bottom: 30px;
                }

                &.block {
                    border-bottom: 1px solid #f1f1f1;
                    padding: 10px 20px;

                    .title {
                        padding: 0;
                    }
                }

                >input {
                    flex: 1;
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