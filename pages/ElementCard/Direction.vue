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
  }
</template>

<script>
import qs from 'qs'
import bus from '@/utils/eventBus'
import DirTree from './DirTree'
import MyDialog from '@/components/MyDialog'
import ContextMenu from '@/components/ContextMenu'

const menuList = [
    { value: 1, label: '新建 .ican 文件' },
    { value: 0, label: '删除' }
]
export default {
    name: 'Direction',
    components: {
        DirTree,
        MyDialog,
        ContextMenu
    },
    data() {
        return {
            tree: [],
            menuList: [],
            coord: { x: 0, y: 0 },
            activePath: ''
        }
    },
    async created() {
        this.tree = await this.getFile()
    },
    mounted() {
        bus.$on('get-file-content', async path => {
            const data = await this.getFileContent(path)
            this.$store.commit('setFileContent', data)
        })
        bus.$on('show-menu', ({ x, y }, n, path) => {
            this.coord = { x: x + 15, y }
            this.menuList = menuList.filter(item => item.value <= n)
            this.activePath = path
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
        getFileContent(path) {
            return this.$axios
                .$get('/getFileContent', {
                    params: {
                        path
                    }
                })
                .then(res => res.data)
        },
        handleClose() {
            this.$store.commit('setFileContent', null)
        },
        async handleSelectMenu(value) {
            const path = this.activePath
            this.handleBlurMenu()
            if (value) {
                const { code } = await this.$axios.$post('/createFile', null, {
                    params: {
                        type: 'ican',
                        name: 'newIcan',
                        path
                    }
                })
                if (code) {
                    return
                }
                this.tree = await this.getFile()
            }
        },
        handleBlurMenu() {
            this.menuList = []
            this.activePath = ''
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