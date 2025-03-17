<template>
  <div class="app-container">
    <el-aside v-if="!!slots.aside" class="app-aside">
      <slot name="aside" />
    </el-aside>

    <section class="app-main">
      <slot />
    </section>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AppContainer',
});

const slots = useSlots();
</script>

<style lang="scss">
@use '@/style/common.scss' as *;

.app-container {
  display: flex;
  padding: $bole-container-padding;
  height: 100%;
  // flex-direction: column;
  // border: 1px solid getCssVar('table-border', 'color');

  .app-aside {
    display: flex;
    overflow: hidden;
    margin-right: 10px;
    padding: 34px 28px 20px;
    width: 400px;
    background-color: getCssVar('color-white');
    flex-direction: column;
    @include utils-shadow;
  }

  .app-main {
    display: flex;
    width: 0;
    height: 100%;
    flex: 1;
    flex-direction: column;
  }
}
</style>
