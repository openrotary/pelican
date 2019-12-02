<template lang="tea">
    ul.often {
        li {
            %: getImg
            :style: {'background-image': `url(${$it})`}
            @click: handleClick($_i)
        }
    }
</template>

<script>
const getImg = [1, 2, 3, 4, 5, 6, 7].map(i => {
    return require(`@/assets/layout-${i}.svg`)
})
export default {
    name: 'OftenLayout',
    props: {
        status: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        colorx: '#4a5153',
        getImg
    }),
    methods: {
        handleClick(index) {
            this.$emit('select', index)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .often {
        li {
            height: 80px;
            margin: 5px 0;
            width: 100%;
            display: block;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center;

            &:hover {
                border: 2px solid #55295b;
            }
        }
    }
</style>