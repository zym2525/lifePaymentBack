<template>
  <el-dialog :title="editForm.title" draggable v-model="innerVisible" @close="onEditDialogClose">
    <el-form :rules="rules" :model="editForm" ref="editDialogForm" label-width="90px">
      <el-form-item label="编号" prop="enCode">
        <el-input placeholder="请输入编号" v-model.trim="editForm.enCode"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input placeholder="请输入名称" v-model.trim="editForm.name"></el-input>
      </el-form-item>
      <el-form-item v-if="editForm.showParentSelect" label="父级菜单" prop="parentId">
        <el-select v-model="editForm.parentId" placeholder="请选择父级菜单">
          <el-option
            v-for="(item, index) in selectModuleList"
            :key="index"
            :label="item.data.name"
            :value="item.data.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="editForm.showIconSelect" label="图片" prop="icon">
        <el-select v-model="editForm.icon" placeholder="请选择图片">
          <el-option v-for="(val, key) in MenuSvgIconMap" :key="key" :label="key" :value="val" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="editForm.showSubMenuIconSelect" label="图片" prop="icon">
        <el-select v-model="editForm.icon" placeholder="请选择图片" clearable popper-class="popper">
          <GridSelectItem :optionsList="subMenuIconList">
            <template #default="{ gridItem }">
              <el-option
                v-for="item in gridItem"
                :key="item.icon_id"
                :label="item.font_class"
                :value="item.font_class"
              >
                <span
                  class="iconfont"
                  style="font-size: 24px"
                  :class="`icon-${item.font_class}`"
                ></span>
              </el-option>
            </template>
          </GridSelectItem>
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="sortCode">
        <el-input-number
          placeholder="请输入排序"
          controls-position="right"
          :min="0"
          v-model="editForm.sortCode"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="路由" prop="path">
        <el-input placeholder="请输入路由地址" v-model.trim="editForm.path"></el-input>
      </el-form-item>
      <el-form-item v-if="editForm.showCacheSelect" label="缓存" prop="isCache">
        <el-switch v-model="editForm.isCache" />
      </el-form-item>
      <el-form-item label="菜单" prop="isMenu">
        <el-switch :active-value="1" :inactive-value="0" v-model="editForm.isMenu" />
      </el-form-item>
      <el-form-item label="有效" prop="enabledMark">
        <el-switch :active-value="1" :inactive-value="0" v-model="editForm.enabledMark" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('onCancel')">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { FormRules, FormInstance } from 'element-plus';
import { TreeModuleDtoGroupDto, TreeStore } from '@/utils';
import { MenuSvgIconMap } from '@/constants';
import { SubMenuManager, SubMenuIcon } from '@bole-core/theme';
import { GridSelectItem } from '@bole-core/components';

defineOptions({
  name: 'AddOrEditModuleDialog',
});

type Props = {
  modelValue: boolean;
  form: {
    enCode: string;
    name: string;
    icon: string;
    parentId: string;
    sortCode: number;
    path: string;
    isCache: boolean;
    isMenu: number;
    enabledMark: number;
    showCacheSelect: boolean;
    showIconSelect: boolean;
    showSubMenuIconSelect: boolean;
    showParentSelect: boolean;
    title: string;
  };
  currentAddingOrEditParentModule: TreeModuleDtoGroupDto;
  moduleTreeStore: TreeStore<TreeModuleDtoGroupDto>;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

const subMenuIconList = ref<SubMenuIcon[]>([]);

onMounted(async () => {
  let res = await SubMenuManager.getSubMenuIconList();
  subMenuIconList.value = res;
});

const selectModuleList = computed(() => {
  const currentTreeNode = props.moduleTreeStore.getNode(props.currentAddingOrEditParentModule.id);
  return currentTreeNode ? currentTreeNode.parent.childNodes : [];
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:form', value: Props['form']): void;
  (e: 'onConfirm'): void;
  (e: 'onCancel'): void;
}>();

const editDialogForm = ref<FormInstance>();

const innerVisible = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});
const editForm = computed({
  get() {
    return props.form;
  },
  set(val) {
    emit('update:form', val);
  },
});

const rules = reactive<FormRules>({
  enCode: [{ required: true, message: '请输入编号', trigger: 'blur' }],
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  // icon: [{ required: true, message: '请选择图片', trigger: 'change' }],
  sortCode: [{ required: true, message: '请输入排序', trigger: 'blur' }],
  path: [{ required: true, message: '请输入路由地址', trigger: 'blur' }],
});

function onEditDialogClose() {
  if (!editDialogForm.value) return;
  editDialogForm.value.resetFields();
}

function handleConfirm() {
  if (!editDialogForm.value) return;
  editDialogForm.value.validate((valid) => {
    if (valid) {
      emit('onConfirm');
    } else {
      return;
    }
  });
}
</script>
