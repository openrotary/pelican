<template lang="tea">
  div.select-unit {
      i {
          :class: ['value', {isShow: isShow}]
          ~~{{value}}
          @click: handleClick(isShow)
      }
      ul.show&showUnitList {
          |: isShow
          @blur: handleBlur
          tabindex: 1
          li {
              %: list
              ~~{{$it}}
              @click: handleSelect($it)
          }
      }
  }
</template>

<script>
const list = ['em', 'rem', 'px']
export default {
    name: 'SelectUnit',
    props: {
        value: {
            type: String,
            default: 'px'
        }
    },
    data: () => ({
        isShow: false,
        timer: null,
        list
    }),
    methods: {
        handleBlur() {
            this.isShow = false
            this.timer = Date.now()
        },
        handleClick(status) {
            const res = Date.now() - this.timer < 200
            if (res) {
                return
            }
            this.isShow = !status
            this.$nextTick().then(() => {
                !status && this.$refs.showUnitList.focus()
            })
        },
        handleSelect(value) {
            this.isShow = false
            this.$emit('input', value)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .select-unit {
        position: relative;

        .show {
            position: absolute;
            left: -35px;
            top: 50%;
            transform: translateY(-50%);
            transition: 0.4s all ease;

            li {
                list-style: none;
                display: flex;
                height: 40px;
                width: 40px;
                align-items: center;
                justify-content: center;
                border-radius: 40px;
                background: #cc7eb1;
                color: #fff;
                box-shadow: 0 0 10px #fff;
                user-select: none;
                cursor: pointer;

                &:nth-child(2) {
                    transform: translateX(-20px);
                }
            }
        }

        .value {
            color: #cc7eb1;
            display: inline-flex;
            width: 40px;
            align-items: center;
            justify-content: center;
            height: 100%;
            font-size: 20px;
            cursor: pointer;
            user-select: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0);

            &.isShow {
                border-bottom: 1px solid #cc7eb1;
            }
        }
    }
</style>