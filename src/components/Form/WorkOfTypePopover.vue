<template>
  <div>
    <label v-for="item in modelValue" :key="item" class="el-checkbox selected-workoftype-label">{{
      getWorkOfTypeNameById(item)
    }}</label>
    <el-button v-if="!disabled" type="primary" link class="workoftype-btn" @click="visible = true"
      >选择工种</el-button
    >
    <ProDialog v-model="visible" destroy-on-close class="workoftype-dialog" @open="handleShow">
      <el-table
        class="workoftype-table"
        :max-height="500"
        :data="workOfTypeList"
        border
        header-cell-class-name="header-cell"
      >
        <el-table-column width="150" property="label" label="已选工种" class-name="label-cell">
          <template #default="{ row }">
            {{ row.name }}
          </template>
        </el-table-column>
        <el-table-column property="selectIds">
          <template #default="{ row }">
            <FieldCheckBox
              v-if="row.children?.length > 0"
              :value-enum="row.children"
              v-model="temporarySelectedWorkOfTypeList"
              enum-label-key="name"
              enum-value-key="id"
              :max="MaxSelectWorkOfTypeLimit"
            ></FieldCheckBox>
          </template>

          <template #header>
            <div class="el-checkbox-group">
              <label
                v-for="item in temporarySelectedWorkOfTypeList"
                :key="item"
                class="el-checkbox"
                >{{ getWorkOfTypeNameById(item) }}</label
              >
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
  </div>
</template>

<script setup lang="ts">
import { FieldCheckBox, ProDialog } from '@bole-core/components';
import { useWorkOfType } from '@/hooks';

defineOptions({
  name: 'WorkOfTypePopover',
});

type Props = {
  modelValue: string[];
  disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const visible = ref(false);

const { workOfTypeList, getWorkOfTypeNameById, MaxSelectWorkOfTypeLimit } = useWorkOfType();

const temporarySelectedWorkOfTypeList = ref<string[]>([]);

function handleShow() {
  temporarySelectedWorkOfTypeList.value = [...props.modelValue];
}

function handleConfirm() {
  emit('update:modelValue', temporarySelectedWorkOfTypeList.value);
  handleClose();
}

function handleClose() {
  visible.value = false;
}
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.btn-wrapper {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  border: 1px solid getCssVar('border-color', 'lighter');
  border-top: none;

  .el-button {
    padding: 9px 28px;
    font-size: 14px;
    border-radius: 6px;
  }
}

.workoftype-table {
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

.selected-workoftype-label {
  vertical-align: middle;

  &:last-of-type {
    margin-right: 30px;
  }
}
</style>
<style lang="scss">
.workoftype-dialog {
  .el-dialog__header {
    display: none;
  }
  /* --bole-pro-dialog-padding-vertical: 20px;
  --bole-pro-dialog-padding-horizontal: 20px; */
}
</style>
