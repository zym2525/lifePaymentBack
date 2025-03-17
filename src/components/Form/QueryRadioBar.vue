<template>
  <section class="query-radio-bar-wrapper">
    <div class="query-radio-bar-label">{{ label }}</div>
    <div class="query-radio-bar-group-wrapper" ref="groupWrapperRef">
      <el-radio-group
        v-model="innerModelValue"
        :class="{ collapsed }"
        ref="groupRef"
        :style="{ height: collapsed ? '20px' : `${groupHeight}px` }"
        @change="(ev) => emit('change', ev)"
      >
        <slot></slot>
      </el-radio-group>
    </div>
    <el-icon
      v-if="showCollapseBtn"
      :class="['query-radio-bar-icon', { uncollapse: !collapsed }]"
      @click="handleCollapse"
    >
      <arrow-down />
    </el-icon>
  </section>
</template>

<script setup lang="ts">
import { useElementSize, useCssVar, useMutationObserver } from '@vueuse/core';
import _ from 'lodash';
// import { extractChildren } from '@/utils';

defineOptions({
  name: 'QueryRadioBar',
});

type Props = {
  label?: string;
  modelValue?: string | number | boolean;
  hasBtn?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  hasBtn: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number | boolean): void;
  (e: 'change', val: string | number | boolean): void;
}>();

const innerModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

const collapsed = ref(true);

function handleCollapse() {
  collapsed.value = !collapsed.value;
}

const groupRef = ref();
const groupWrapperRef = ref();
// const collapseButtonWidth = ref(20);

const groupHeight = computed(() => {
  if (!groupRef.value?.$el) {
    return 0;
  }
  const $group = groupRef.value.$el;
  return $group.scrollHeight;
});

const { width: groupWrapperWidth } = useElementSize(groupWrapperRef);

const margin = useCssVar('--bole-query-bar-group-item-margin');

const groupItemWidthList = ref<number[]>([]);

onMounted(() => {
  setGroupItemWidthList();
});

useMutationObserver(
  groupRef,
  (mutations) => {
    if (mutations.length) {
      setGroupItemWidthList();
    } else {
      groupItemWidthList.value = [];
    }
  },
  {
    childList: true,
  }
);

function setGroupItemWidthList() {
  const $group = groupRef.value.$el;
  let list = [];
  let groupItems = [].slice.call($group.querySelectorAll('label'));

  for (let index = 0; index < groupItems.length; index++) {
    const element = groupItems[index];
    list.push(element.getBoundingClientRect().width + parseInt(margin.value));
  }
  groupItemWidthList.value = list;
}

const showCollapseBtn = computed(() => _.sum(groupItemWidthList.value) > groupWrapperWidth.value);
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.query-radio-bar-wrapper {
  display: flex;
  align-items: flex-start;
  padding-right: boleGetCssVar('proTable', 'filter-bar-horizontal-padding');
  padding-bottom: 10px;
  padding-left: boleGetCssVar('proTable', 'filter-bar-horizontal-padding');
  background-color: #ffffff;

  &:first-of-type {
    margin-top: -10px;
  }

  .query-radio-bar-label {
    padding-right: 12px;
    font-size: 14px;
    color: getCssVar('text-color', 'regular');
    line-height: 20px;
  }

  :deep(.el-radio__input) {
    display: none;
  }

  :deep(.el-radio__label) {
    padding-left: 0;
  }

  :deep(.el-radio) {
    margin-right: boleGetCssVar('query-bar', 'group-item-margin');
    height: 20px;
  }

  .query-radio-bar-group-wrapper {
    overflow: hidden;
    min-width: 0;
    flex: 1;
  }

  .el-radio-group {
    align-items: flex-start;
    overflow: hidden;
    transition: height 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

    &.collapsed {
      overflow: hidden;
      // height: 20px;
    }
  }

  .query-radio-bar-icon {
    font-size: 20px;
    color: boleGetCssVar('color', 'primary');
    cursor: pointer;
    transition: all 0.3s;

    &.uncollapse {
      transform: rotate(180deg);
    }
  }
}
</style>
