<template>
  <ProDialog v-model="visible" destroy-on-close class="table-select-dialog" @open="handleShow">
    <el-table
      class="select-table"
      :max-height="500"
      :data="data"
      border
      header-cell-class-name="header-cell"
    >
      <el-table-column width="150" property="label" label="不承保区域" class-name="label-cell">
        <template #default="{ row }">
          {{ row[enumLabelKey] }}
        </template>
      </el-table-column>
      <el-table-column property="selectIds">
        <template #default="{ row }">
          <FieldCheckBoxWithAll
            v-if="row[props.children]?.length > 0"
            :value-enum="row[props.children]"
            v-model="columnSelectedIdMap[row[enumValueKey]]"
            :enum-label-key="enumLabelKey"
            :enum-value-key="enumValueKey"
            :noAllCheckboxClass="false"
            :max="max"
          ></FieldCheckBoxWithAll>
        </template>

        <template #header>
          <div class="el-checkbox-group">
            <label v-for="item in selectedList" :key="item" class="el-checkbox">{{
              getLabelByValue(item)
            }}</label>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </template>
  </ProDialog>
</template>

<script setup lang="ts">
import { FieldCheckBox, ProDialog } from '@bole-core/components';
import { PropType } from 'vue';
import { flattenTree } from '@/utils';
import FieldCheckBoxWithAll from '../Form/FieldCheckBoxWithAll.vue';
import { uniq } from 'lodash';

defineOptions({
  name: 'CascaderTableSelectDialog',
});

type Props = {
  max?: number;
  enumLabelKey?: string;
  enumValueKey?: string;
  parentKey?: string;
  children?: string;
  data: { [key: string]: any }[];
};

const props = withDefaults(defineProps<Props>(), {
  enumLabelKey: 'name',
  enumValueKey: 'id',
  children: 'children',
  parentKey: 'parentId',
});

watch(
  () => props.data,
  () => {
    initColumnSelectedIdMap();
  }
);

function initColumnSelectedIdMap() {
  if (props.data?.length > 0) {
    props.data.forEach((item) => {
      columnSelectedIdMap[item[props.enumValueKey]] = [];
    });
  }
}

const flattenData = computed(() => flattenTree(props.data, { childrenKey: props.children }));

const visible = defineModel('visible', { type: Boolean });
const model = defineModel({ type: Array as PropType<(string | number)[]> });

const columnSelectedIdMap = reactive({});

const selectedList = computed(() => {
  let list = [] as (string | number)[];
  Object.keys(columnSelectedIdMap).forEach((key) => {
    if (columnSelectedIdMap[key] && columnSelectedIdMap[key].length > 0) {
      list = list.concat(columnSelectedIdMap[key]);
    }
  });
  return list;
});

function getLabelByValue(value: string | number) {
  const item = flattenData.value.find((x) => x[props.enumValueKey] === value);
  return item ? item[props.enumLabelKey] : '';
}

function handleShow() {
  initColumnSelectedIdMap();
  model.value.forEach((item) => {
    const workOfType = flattenData.value?.find((w) => w[props.enumValueKey] === item);
    if (workOfType) {
      columnSelectedIdMap[workOfType[props.parentKey]].push(workOfType[props.enumValueKey]);
      columnSelectedIdMap[workOfType[props.parentKey]] = uniq(
        columnSelectedIdMap[workOfType[props.parentKey]]
      );
    }
  });
}

function handleConfirm() {
  model.value = [...selectedList.value];
  handleClose();
}

function handleClose() {
  visible.value = false;
}
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.select-table {
  :deep() {
    .header-cell {
      font-weight: 500;
      color: getCssVar('text-color', 'regular');

      .cell {
        line-height: 32px;
      }
    }

    .label-cell {
      color: getCssVar('text-color', 'primary');
    }
  }
}
</style>

<style lang="scss">
.table-select-dialog {
  .el-dialog__header {
    display: none;
  }
}
</style>
