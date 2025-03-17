<template>
  <el-drawer v-model="innerVisible" size="760px" :title="title">
    <el-button style="margin-bottom: 6px" @click="emit('onAddSubModule')">新增</el-button>
    <el-row
      v-if="type != SubModuleType.Column && FastButtonMap[type] && FastButtonMap[type].length > 0"
      style="margin-bottom: 6px"
    >
      <span class="fast-btn-list-label">常用按钮添加: </span>
      <el-button
        v-for="(fastBtn, index) in FastButtonMap[type]"
        :key="index"
        @click="emit('onAddFastBtn', fastBtn)"
        >{{ fastBtn.name }}</el-button
      >
    </el-row>
    <el-row v-if="type === SubModuleType.Column" style="margin-bottom: 6px">
      <el-button @click="openAddInterface">根据interface快速添加</el-button>
    </el-row>
    <el-table :data="innerData" border>
      <el-table-column prop="enCode" label="编号">
        <template #default="{ row }">
          <el-input
            v-if="row.isEdit"
            placeholder="请输入编号"
            v-model.trim="row.enCode"
            autocomplete="off"
          ></el-input>
          <template v-else>{{ row.enCode }} </template>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称">
        <template #default="{ row }">
          <el-input
            v-if="row.isEdit"
            placeholder="请输入名称"
            v-model.trim="row.name"
            autocomplete="off"
          ></el-input>
          <template v-else>{{ row.name }} </template>
        </template>
      </el-table-column>
      <el-table-column prop="sortCode" label="排序">
        <template #default="{ row }">
          <el-input-number
            v-if="row.isEdit"
            placeholder="请输入排序"
            controls-position="right"
            :min="0"
            v-model="row.sortCode"
            style="width: 100%"
          ></el-input-number>
          <template v-else> {{ row.sortCode }} </template>
        </template>
      </el-table-column>
      <el-table-column v-if="type === SubModuleType.Column" prop="width" label="数据列宽度">
        <template #default="{ row }">
          <el-input-number
            v-if="row.isEdit"
            placeholder="请输入数据列宽度"
            controls-position="right"
            :min="0"
            :step="10"
            v-model="row.width"
            style="width: 100%"
          ></el-input-number>
          <template v-else> {{ row.width }} </template>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="{ row, $index }">
          <template v-if="row.isEdit">
            <ProTableOperationBtn @click="emit('onSaveSubModule', row)">保存</ProTableOperationBtn>
            <ProTableOperationBtn @click="handleCancel(row, $index)">取消</ProTableOperationBtn>
          </template>
          <template v-else>
            <ProTableOperationBtn @click="row.isEdit = !row.isEdit">编辑</ProTableOperationBtn>
            <ProTableOperationBtn @click="emit('onDeleteSubModule', row)" type="danger"
              >删除</ProTableOperationBtn
            >
          </template>
        </template>
      </el-table-column>
    </el-table>

    <el-row v-if="type === SubModuleType.Column" justify="center" style="margin-top: 10px">
      <el-button @click="emit('onBatchSaveColumn')">批量保存</el-button>
    </el-row>
  </el-drawer>
</template>

<script setup lang="ts">
import { SubModuleType, FastButtonMap, FastBtn } from '@/constants';
import { ProTableOperationBtn } from '@bole-core/components';
import { Message } from '@/utils';
import { ElMessageBox } from 'element-plus';

defineOptions({
  name: 'SubModuleEditDrawer',
});

type Props = {
  modelValue: boolean;
  title: string;
  type: SubModuleType;
  data: ValueOf<API.AllSubModule>;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
});

const innerData = computed({
  get() {
    return props.data;
  },
  set(val) {
    emit('update:data', val);
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:data', data: Props['data']): void;
  (e: 'onAddSubModule'): void;
  //批量添加
  (e: 'onBatchAddColumn', keys: string[]): void;
  (e: 'onAddFastBtn', fastBtn: FastBtn): void;
  (e: 'onSaveSubModule', subModule: API.ModuleButtonDto | API.ModuleColumnDto): void;
  (e: 'onBatchSaveColumn'): void;
  (e: 'onDeleteSubModule', subModule: API.ModuleButtonDto | API.ModuleColumnDto): void;
}>();

const innerVisible = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

async function openAddInterface() {
  try {
    let { value } = await ElMessageBox.prompt('请输入interface', '快速添加', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputType: 'textarea',
      customClass: 'add-interface-message-box',
    });
    let tmpInput = value.replace(/\?/g, '').replace(/:(.*);/g, ': 1,');
    let json = eval('(' + tmpInput + ')'); //JSON.parse(tmpInput);
    emit('onBatchAddColumn', Object.keys(json));
  } catch (error) {
    console.log('error: ', error);
    if (error === 'cancel') return;
    Message.errorMessage('interface格式错误');
  }
}

function handleCancel(row: any, index: number) {
  if (row.id) {
    row.isEdit = !row.isEdit;
  } else {
    //@ts-ignore
    innerData.value = innerData.value.filter((x, i) => i !== index);
  }
}
</script>

<style lang="scss">
@use '@/style/common.scss' as *;

.fast-btn-list-label {
  line-height: 32px;
  margin-right: 6px;
  color: getCssVar('text-color', 'regular');
}

.add-interface-message-box textarea {
  height: 200px;
  resize: none;
}
</style>
