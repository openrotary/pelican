<template lang="tea">
  section.tree {
      DirTree {
        %: tree
        :data: $it
      }
      MyDialog {
          @close: handleClose
          :isActive: !!hasFileContent
          pre.code {
              code {
                  ~~{{ hasFileContent }}
              }
          }
      }
      ContextMenu {
        ?: menuList.length
        :list: menuList
        :coord: coord
        @click: handleSelectMenu
        @blur: handleBlurMenu
      }
      MobileInput {
         ?: isInputShow
         :coord: coord 
         @finish: handleFinishInput
      }
  }
</template>

<script>
import bus from '@/utils/eventBus'
import DirTree from './DirTree'
import MyDialog from '@/components/MyDialog'
import ContextMenu from '@/components/ContextMenu'
import MobileInput from '@/components/MobileInput'

const menuList = [
    { value: 1, label: '新建 .ican 文件' },
    { value: 0, label: '删除' }
]
export default {
    name: 'Direction',
    components: {
        DirTree,
        MyDialog,
        ContextMenu,
        MobileInput
    },
    data() {
        return {
            tree: [],
            menuList: [],
            coord: { x: 0, y: 0 },
            isInputShow: false
        }
    },
    async created() {
        this.tree = await this.getFile()
    },
    mounted() {
        bus.$on('show-menu', ({ x, y }, n, path) => {
            this.coord = { x: x + 15, y }
            this.menuList = menuList.filter(item => item.value <= n)
            this.$store.commit('setActivePath', path)
        })
        bus.$on('delete-file', path => {
            this.tree = this.deleteFile(path)
        })
    },
    computed: {
        hasFileContent() {
            return this.$store.state.fileContent || ''
        }
    },
    methods: {
        getFile() {
            return this.$axios.$get('/getFile').then(res => res.data)
        },

        handleClose() {
            this.$store.commit('setFileContent', null)
        },
        deleteFile(path) {
            return this.$axios.delete('/deleteFile', {
                params: { path }
            })
        },
        async handleSelectMenu(value) {
            if (value) {
                this.isInputShow = true
            } else {
                // 删除
                this.handleBlurMenu()
                const path = this.$store.state.activePath
                const { code } = await this.deleteFile(path)
                if (code) {
                    return
                }
                this.tree = await this.getFile()
            }
        },
        handleBlurMenu() {
            this.menuList = []
        },
        async handleFinishInput(name) {
            this.isInputShow = false
            console.log('关闭')
            if (!name) {
                return
            }
            const path = this.$store.state.activePath
            const { code, path: newPath } = await this.$axios.$post('/createFile', {
                type: 'ican',
                name,
                path
            })
            if (code) {
                return
            }
            bus.$emit('get-file-content', newPath)
            this.tree = await this.getFile()
        }
    }
}
</script>

<style lang="stylus" scoped>
.tree {
    width: 100%;
    padding: 10px;
    flex: 1;
    overflow: auto;
}

.code {
    padding: 15px;
    flex: 1;
    overflow: auto;
}
</style>