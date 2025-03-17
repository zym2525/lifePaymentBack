<template>
  <div class="checkbox-with-extra-wrapper">
    <ProFormCheckbox
      v-model="innerModelValue"
      :value-enum="checkList"
      v-bind="$attrs"
    ></ProFormCheckbox>
    <div class="checkbox-with-extra-input">
      <el-input
        class="checkbox-with-extra-input-view"
        v-model.trim="state.customInputValue"
        :placeholder="`请输入新${extraText}`"
        :maxlength="15"
        :validate-event="false"
      />
      <el-button
        class="checkbox-with-extra-input-button"
        link
        type="primary"
        @click="handleAddExtra"
      >
        新增{{ extraText }} <el-icon> <circle-plus /> </el-icon
      ></el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProFormCheckbox } from '@bole-core/components';
import { Message } from '@bole-core/core';
import * as searchSettingServices from '@/services/api/SearchSetting';
import _ from 'lodash';
import { useSearchSettingType } from '@/hooks';

defineOptions({
  name: 'CheckboxWithCustomize',
});

type Props = {
  modelValue: string[];
  extraText: string;
  searchType: number;
  cuntomizeSearchType: number;
  belongType?: number;
};

const props = withDefaults(defineProps<Props>(), {});
const state = reactive({
  customInputValue: '',
});

const { searchSettingTypeList: typeList } = useSearchSettingType({
  searchType: props.searchType,
  belongType: props.belongType,
});
const { searchSettingTypeList: cuntomizeList, refetchSearchSettingType } = useSearchSettingType({
  searchType: props.cuntomizeSearchType,
  belongType: props.belongType,
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: string[]): void;
  (e: 'handleChange'): void;
}>();

const innerModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

const checkList = computed(() => {
  return typeList.value.concat(cuntomizeList.value);
});

const handleAddExtra = _.debounce(
  async () => {
    if (!state.customInputValue) {
      Message.warnMessage(`请输入新${props.extraText}`);
      return;
    }
    await createExtra();
  },
  1000,
  {
    leading: true,
    trailing: false,
  }
);
async function createExtra() {
  try {
    let params: API.CreateOrEditSearchInput = {
      searchType: props.cuntomizeSearchType,
      belongType: props.belongType,
      name: state.customInputValue,
      sort: cuntomizeList.value.length + 1,
      status: true,
      src: '',
    };
    let res = await searchSettingServices.createOrEditSearchSetting(params);
    if (res) {
      refetchSearchSettingType();
    }
  } catch (error) {}
}
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.checkbox-with-extra-wrapper {
  display: inline-flex;
  align-items: flex-start;
  width: 100%;

  .checkbox-with-extra-input {
    display: inline-flex;
    margin-left: 10px;
    width: 250px;

    .checkbox-with-extra-input-view {
      width: 150px;
    }
  }
}
</style>
