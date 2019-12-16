<template lang="tea">
    aside.element-card {
        NewCard
    }
</template>

<script>
import NewCard from './NewCard'
export default {
    name: 'ElementCard',
    components: {
        NewCard
    }
}
</script>

<style lang="stylus" scoped>
    .element-card {
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px 0;
        border-right: 1px solid rgba(85, 41, 91, 0.2);
    }
</style>