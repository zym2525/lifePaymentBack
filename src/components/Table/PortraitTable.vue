<template>
  <div class="portrait-table">
    <el-row v-for="(tableItem, tableIndex) in portraitTableList" :key="tableIndex">
      <el-col v-for="item in tableItem" :key="item.key" class="portrait-table-item">
        <div class="portrait-table-item-label-wrapper">
          <div
            class="label"
            :style="{
              width: labelWidth,
              textAlign: labelPosition,
            }"
          >
            <slot name="label">
              {{ item.label }}
            </slot>
          </div>
        </div>
        <div class="portrait-table-item-value-wrapper">
          <TextOverTooltip>
            <div class="value ellipsis">
              <slot :name="item.key">
                <ProTableColumn
                  v-bind="_.omit(item, 'label')"
                  :data="props.data[item.key]"
                  :row="props.data"
                ></ProTableColumn>
              </slot>
            </div>
          </TextOverTooltip>
        </div>
      </el-col>
    </el-row>
    <slot name="annex"> </slot>
  </div>
</template>

<script setup lang="ts">
import { ProTableColumn, TextOverTooltip } from '@bole-core/components';
import _ from 'lodash';
import { UsePortraitTableColumnsItem } from '@/hooks';

defineOptions({
  name: 'PortraitTable',
});

type Props = {
  columns: UsePortraitTableColumnsItem[];
  data: { [key: string]: any };
  labelWidth?: string;
  labelPosition?: any;
  colNumber?: number;
};

const props = withDefaults(defineProps<Props>(), {
  labelWidth: 'auto',
  labelPosition: 'right',
  colNumber: 2,
});

const portraitTableList = computed(() => {
  return _.chunk(props.columns, props.colNumber);
});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.portrait-table {
  --bole-pro-form-input-height: 14px;

  border: 1px solid #e8e8e8;
  border-radius: 4px;

  :deep(.el-row) {
    border-bottom: #e8e8e8 1px solid;

    &:last-child {
      border-bottom: none;
    }
  }

  .portrait-table-item {
    display: inline-flex;
    flex: 1;
    min-width: 0;

    .portrait-table-item-label-wrapper {
      display: flex;
      align-items: center;
      padding: 12px;
      background-color: #fafafa;
    }

    .label {
      font-size: 14px;
      color: getCssVar('text-color', 'regular');
      line-height: 19px;
    }

    .portrait-table-item-value-wrapper {
      padding: 12px;
      min-width: 0;
      flex: 1;
    }

    .value {
      font-size: 14px;
      color: getCssVar('text-color', 'primary');
      line-height: 19px;
      word-wrap: break-word;
    }
  }
}
</style>
