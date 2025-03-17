<template>
  <div class="detail-card-info-itemv3 ellipsis">
    <div
      class="detail-card-info-itemv3-label"
      :style="{ width: `${props.laelWidth}px`, textAlign: textAlign }"
    >
      {{ props.title }}
    </div>
    <div class="detail-card-info-itemv3-del" :class="{ ellipsis: props.ellipsis }">
      <slot>{{ props.content }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DetailCardInfoItemV3',
});

type Props = {
  title: string;
  content?: string | number;
  laelWidth?: string | number;
  textAlign?: any;
  ellipsis?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  content: '',
  laelWidth: 80,
  textAlign: 'right',
  ellipsis: false,
});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.detail-card-info-itemv3 {
  display: flex;
  align-items: baseline;
  margin-bottom: 16px;
  font-size: 14px;

  .detail-card-info-itemv3-label {
    word-break: keep-all;
    color: #7c7c7c;
  }

  .detail-card-info-itemv3-del {
    /* width: calc(100% - 100px); */
    flex: 1;
    min-width: 0;
    color: getCssVar('text-color', 'primary');
    line-height: 20px;
    @include utils-ellipsis;
  }
}
</style>
