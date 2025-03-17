<template>
  <div :class="isDesktop ? 'desktop-no-data' : 'no-data'">
    <img v-if="type == 'content'" :src="noContent" />
    <img v-else-if="type == 'network'" :src="noNetwork" />
    <img v-else :src="noData" />
    <slot name="no-data-text">
      <div class="no-data-text">{{ noDataText }}</div>
    </slot>
  </div>
</template>
<script setup lang="ts">
import noContent from '@/assets/components/icon-no-data.png';
import noNetwork from '@/assets/components/icon-no-net.png';
import noData from '@/assets/components/icon-no-data.png';
const NoDataText = {
  content: '暂无内容',
  data: '暂无数据',
  network: '暂无网络',
};

type Props = {
  type?: keyof typeof NoDataText;
  text?: string;
  isDesktop?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  type: 'data',
  text: '',
  isDesktop: false,
});

const noDataText = computed(() => {
  return props.text ? props.text : NoDataText[props.type];
});
</script>

<style lang="scss" scoped>
.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // margin-top: 10vh;
  flex: 1;

  img {
    display: block;
    margin: 0 auto;
  }

  .no-data-text {
    margin-top: 20px;
    font-size: 22px;
    text-align: center;
    color: #67666e;
  }
}

.desktop-no-data {
  padding-bottom: 16px;

  img {
    display: block;
    margin: 0 auto;
    width: 14%;
  }

  .no-data-text {
    font-size: 20px;
    text-align: center;
    color: #67666e;
  }
}
</style>
