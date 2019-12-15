<template lang="tea">
  div {
      @click: handleClick
      :class: ['menu-left', {'active': status}]
      span.top 
      span.middle
      span.bottom
  }
</template>

<script>
export default {
    name: 'IconMenuLeft',
    data: () => ({
        status: false
    }),
    methods: {
        handleClick() {
            this.status = !this.status
        }
    }
}
</script>

<style lang="stylus" scoped>
.menu-left {
    width: 100px;
    height: 100px;
    background: #55295b;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px #55295b;
    cursor: pointer;

    span {
        background: #fff;
        display: block;
        width: 50px;
        height: 6px;
        transition: 0.4s all ease;
        box-shadow: 0 0 3px #fff;
        border-radius: 2px;
    }

    .top {
        transform: translate(0, -10px) rotate(0deg) scale(1, 1);
    }

    .middle {
        transform: rotate(0);
    }

    .bottom {
        transform: translate(0, 10px) rotate(0deg) scale(1, 1);
    }

    &.active {
        .top {
            transform: translate(-32%, -1px) rotate(135deg) scale(0.5, 1);
        }

        .middle {
            transform: rotate(180deg);
        }

        .bottom {
            transform: translate(-32%, 1px) rotate(-135deg) scale(0.5, 1);
        }
    }
}
</style>