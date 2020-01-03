<template lang="tea">
section.card {
    renderCard {
        ?: data.children
        %: data.children
        :data: $it
    }
    div {
        /
        ~~{{data.tagName}}
    }
}
</template>
<script>
export default {
    name: 'renderCard',
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style lang="stylus" scoped>
    .card {
        display: flex;

        > div {
            height: 80px;
            min-width: 250px;
            background: #fff;
        }
    }
</style>