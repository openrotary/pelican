<template>
  <section class="set-el-view">
    <nav>布局模型</nav>
    <div class="set-el">
      <VsButton color="primary" type="border">Flex</VsButton>
      <VsButton color="primary" type="border">Grid</VsButton>
      <VsButton color="primary" type="border">Box</VsButton>
      <VsButton color="primary" type="border">Position</VsButton>
    </div>
    <nav>布局方式</nav>
    <div class="set-el">
      <VsButton color="primary" type="border">上下居中</VsButton>
      <VsButton color="primary" type="border">左右居中</VsButton>
      <VsButton color="primary" type="border">左右居中</VsButton>
    </div>
  </section>
</template>
<script>
export default {
    name: 'LayoutModel',
    components: {},
    data: () => ({}),
    methods: {},
    watch: {}
}
</script>
<style lang="stylus" scoped>
    nav {
        background: rgba(85, 41, 91, 0.1);
        color: #233;
        padding: 0 20px;
        height: 40px;
        display: flex;
        align-items: center;
        box-shadow: 0 0 5px #fff;
    }

    .set-el-view {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        width: 400px;

        .set-el {
            padding: 15px 0;
            display: flex;
            justify-content: space-around;

            .vs-button {
                font-size: 16px;
                width: 80px;
            }
        }
    }
</style>