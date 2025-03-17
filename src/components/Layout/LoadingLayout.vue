<template>
  <div class="loading-layout-wrapper">
    <div class="spinner-wrapper" v-if="props.loading">
      <div class="el-loading-spinner">
        <el-icon class="is-loading">
          <Loading />
        </el-icon>
        <p class="el-loading-text">拼命加载中</p>
      </div>
    </div>
    <template v-else>
      <div v-if="props.error">出错了</div>
      <template v-else>
        <slot></slot>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'LoadingLayout',
});

type Props = {
  loading?: boolean;
  error?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: false,
});
</script>

<style lang="scss" scoped>
.loading-layout-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.spinner-wrapper {
  min-height: calc(100vh - 80px);
  // position: relative;
}

.hasTagsView {
  .spinner-wrapper {
    min-height: calc(100vh - 124px);
  }
}
</style>
