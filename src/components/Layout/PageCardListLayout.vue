<template>
  <component
    :is="view"
    class="page-card-list-layout"
    :class="[{ scrollEnable }]"
    v-if="tableData.length > 0"
    v-bind="$attrs"
  >
    <template v-if="useChunk">
      <!-- <div v-for="(group, index) in chunkGroup" :key="index" class="page-card-list-row-wrapper">
        <el-row :gutter="gutter">
          <el-col :span="colSpan" v-for="(item, i) in group" :key="i">
            <slot name="item" :item="item" :index="index * chunkSize + i" />
          </el-col>
        </el-row>
      </div> -->
      <GridView :chunkSize="chunkSize" :gutter="gutter" :tableData="tableData">
        <template #item="{ item, index }">
          <slot name="item" :item="item" :index="index" />
        </template>
      </GridView>
    </template>
    <template v-else>
      <template v-for="(item, index) in tableData">
        <slot name="item" :item="item" :index="index" />
      </template>
    </template>
  </component>
  <div v-if="showPagination" class="page-card-list-layout-pagination">
    <ProPagination
      @getDataSource="$emit('getDataSource', $event)"
      @update:page-size="(val:number) => $emit('update:page-size',val)"
      v-bind="paginationProps"
      :tableData="tableData"
    />
  </div>
  <NoData v-if="tableData.length === 0" style="margin-top: 170px"> </NoData>
</template>

<script lang="ts">
import type { PaginationProps } from 'element-plus';
import { paginationEmits, ElScrollbar } from 'element-plus';
import { ProPagination } from '@bole-core/components';
import _ from 'lodash';
import GridView from './GridView.vue';
// import PaginationCardContainer from './PaginationCardContainer.vue';

export default defineComponent({
  name: 'PageCardListLayout',
  inheritAttrs: false,
  components: { ProPagination, ElScrollbar, GridView },
  props: {
    paginationProps: {
      type: Object as PropType<Partial<PaginationProps>>,
      default: () => ({} as Partial<PaginationProps>),
    },
    tableData: {
      type: Array as PropType<any[]>,
      default: () => [],
      required: true,
    },
    showPagination: {
      type: Boolean,
      default: false,
    },
    chunkSize: {
      type: Number,
      default: 0,
    },
    gutter: {
      type: Number,
      default: 0,
    },
    useScrollBar: {
      type: Boolean,
      default: true,
    },
    scrollEnable: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    ...paginationEmits,
    getDataSource: (pageIndex: number) => typeof pageIndex === 'number',
  },

  setup(props) {
    const colSpan = computed(() => Math.ceil(24 / props.chunkSize));

    const chunkGroup = computed(() => _.chunk(props.tableData, props.chunkSize));

    const useChunk = computed(() => props.chunkSize !== 0);

    // const gutterStyle = computed(() => props.gutter / 2);

    const view = computed(() => (props.useScrollBar ? 'el-scrollbar' : 'div'));

    return {
      chunkGroup,
      useChunk,
      colSpan,
      view,
    };
  },
});
</script>

<style lang="scss" scoped>
.page-card-list-layout {
  padding: 20px;
  padding-bottom: 0;
  min-height: 0;
  background-color: #ffffff;
  flex: 1;

  &.scrollEnable {
    overflow-y: auto;
  }

  :deep(.el-scrollbar__wrap) {
    overflow-x: hidden;
    overflow-y: auto;
  }

  .page-card-list-row-wrapper {
    overflow: hidden;

    :deep(.el-row) {
      // width: 100%;
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.page-card-list-layout-pagination {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  background-color: #ffffff;
}
</style>

<style lang="scss">
.center-layout-main-container .page-card-list-layout {
  padding: 20px 30px;
}
</style>
