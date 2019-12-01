<template lang="tea">
  div.select-num {
    i.material-icons.add {
      ~~add
    }
    ~~{{ count }}
    v-stream:mousewheel: scroll$
    @click.left: handleClick(+step)
    @click.right.prevent: handleClick(-step)
    i.material-icons.remove {
      ~~remove
    }
  }
</template>

<script>
// import { merge } from 'rxjs'
import { map, startWith, scan } from 'rxjs/operators'
export default {
  name: 'SelectNum',
  props: {
    range: {
      typs: Array,
      default: () => [10, 15, 100]
    },
    step: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleClick(step) {
      // 添加范围校验
      const value = this.count + step
      if (value < this.range[0] || value > this.range[2]) {
        return
      }
      this.count = value
    }
  },
  domStreams: ['scroll$'],
  subscriptions() {
    return {
      count: this.scroll$.pipe(
        map(e => (e.event.wheelDelta > 0 ? this.step * 3 : this.step * -3)),
        startWith(this.range[1]),
        scan((total, change) => {
          const value = total + change
          if (value < this.range[0]) {
            return this.range[0]
          }
          if (value > this.range[2]) {
            return this.range[2]
          }
          return value
        })
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
.select-num {
  width: 300px;
  height: 300px;
  color: #f1f1f1;
  font-size: 80px;
  text-shadow: 0 0 7px rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 0 22px rgba(85, 41, 91, 1);
  border: 3px solid rgba(136, 72, 152, 0.4);
  background-color: #55295b;
  user-select: none;
  cursor: pointer;
  position: relative;

  .material-icons {
    position: absolute;

    &.add {
      left: 20px;
    }

    &.remove {
      right: 20px;
    }
  }
}
</style>