<template>
  <el-checkbox-group style="flex: none" v-model="checkList">
    <el-checkbox
      :class="{ 'no-box': noAllCheckboxClass }"
      style="margin-right: 30px"
      :value="true"
      :indeterminate="state.isIndeterminate"
      @change="handleCheckAllChange"
      >全选</el-checkbox
    >
  </el-checkbox-group>

  <FieldCheckBox
    v-model="innerModelValue"
    :value-enum="valueEnum"
    :enumLabelKey="enumLabelKey"
    :enum-value-key="enumValueKey"
    @change="handleCheckedServicesChange"
    v-bind="$attrs"
  ></FieldCheckBox>
</template>

<script setup lang="ts">
import { FieldCheckBox } from '@bole-core/components';
import _ from 'lodash';

defineOptions({
  name: 'FieldCheckBoxWithAll',
});

type Props = {
  modelValue: any[];
  valueEnum: any[];
  enumLabelKey: string;
  enumValueKey: string;
  noAllCheckboxClass?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  noAllCheckboxClass: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: Props['modelValue']): void;
  (e: 'change'): void;
}>();

const checkList = ref([]);

const innerModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

const state = reactive({
  checkAll: false,
  isIndeterminate: false,
});

const handleCheckAllChange = (val: boolean) => {
  innerModelValue.value = val
    ? props.valueEnum.map((item) => {
        return needConvertValue(item[props.enumValueKey])
          ? Number(item[props.enumValueKey])
          : item[props.enumValueKey];
      })
    : [];
  // state.checkAll = val;
  checkList.value = [val];
  state.isIndeterminate = false;
  emit('change');
};

function needConvertValue(value: any) {
  return !_.isNaN(Number(value)) && !_.isBoolean(value);
}

const handleCheckedServicesChange = (list: string[]) => {
  const checkedCount = list.length;
  state.checkAll = checkedCount === props.valueEnum.length;
  checkList.value = checkedCount === props.valueEnum.length ? [true] : [];
  state.isIndeterminate = checkedCount > 0 && checkedCount < props.valueEnum.length;
  emit('change');
};
</script>
