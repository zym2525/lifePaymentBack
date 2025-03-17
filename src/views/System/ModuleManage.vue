<template>
  <LoadingLayout :loading="state.loading">
    <AppContainer>
      <ProTableQueryFilterBar @on-reset="handleReset">
        <template #query>
          <div class="query-filter-list-item">
            <SearchInput
              v-model="state.searchValue"
              placeholder="角色名称"
              @on-click-search="handleSearch"
              @keyup.enter="handleSearch()"
            >
            </SearchInput>
          </div>
        </template>
        <template #btn>
          <el-button @click="handleAddOrEditRootModule()" icon="Plus" type="primary"
            >新增</el-button
          >
          <el-button @click="toggleExpand(true)" icon="FolderOpened" type="primary"
            >全部展开</el-button
          >
          <el-button @click="toggleExpand(false)" icon="Folder" type="primary">全部折叠</el-button>
        </template>
      </ProTableQueryFilterBar>
      <ProTableV2
        :tableData="moduleTreeStore.data"
        :table-props="{
          rowKey: 'id',
        }"
        :tableRef="(r) => (tableRef = r)"
        :show-seq-column="false"
        :columns="ModuleColumns"
        :operationBtns="ModuleOperationBtns"
        :operationColumnWidth="300"
      >
        <template #columns="{ row, column }">
          <template v-if="column.property === 'isCache'">
            <el-switch
              v-show="!ModuleUtils.isRootModule(row)"
              v-model="row.isCache"
              inline-prompt
              @change="(v: boolean) => handleChangeStatus(v, row, 'isCache')"
            ></el-switch>
          </template>
          <template v-else-if="column.property === 'isMenu'">
            <el-switch
              v-model="row.isMenu"
              inline-prompt
              :active-value="1"
              :inactive-value="0"
              @change="(v: number) => handleChangeStatus(v, row, 'isMenu')"
            ></el-switch>
          </template>
          <template v-else-if="column.property === 'enabledMark'">
            <el-switch
              v-model="row.enabledMark"
              :active-value="1"
              :inactive-value="0"
              @change="(v: number) => handleChangeStatus(v, row, 'enabledMark')"
            ></el-switch>
          </template>
        </template>
      </ProTableV2>
      <AddOrEditModuleDialog
        v-model="editDialogFormVisible"
        v-model:form="editForm"
        :moduleTreeStore="moduleTreeStore"
        :currentAddingOrEditParentModule="currentAddingOrEditParentModule"
        @on-confirm="handleAddOrEditModule"
        @on-cancel="editDialogFormVisible = false"
      />
      <SubModuleEditDrawer
        v-model="drawerVisible"
        :title="SubModuleTitle[drawerState.type]"
        v-model:data="drawerState.tableData"
        :type="drawerState.type"
        @on-add-sub-module="handleAddSubModule"
        @on-batch-add-column="handleBatchAddColumn"
        @on-save-sub-module="handleSaveSubModule"
        @on-delete-sub-module="handleDeleteSubModule"
        @on-add-fast-btn="handleAddFastBtn"
        @on-batch-save-column="handelBatchSaveColumn"
      />
    </AppContainer>
  </LoadingLayout>
</template>

<script setup lang="ts">
import {
  ProTableQueryFilterBar,
  ProTableV2,
  AppContainer,
  LoadingLayout,
  OperationBtnType,
  SearchInput,
} from '@bole-core/components';
import * as baseModuleServices from '@/services/api/BaseModule';
import { ModuleUtils, TreeModuleDtoGroupDto, Message, TreeStore } from '@/utils';
import { TableInstance } from 'element-plus';
import { SubModuleType, SubModuleTitle, SubModuleKey, FastBtn, ModuleColumns } from '@/constants';
import SubModuleEditDrawer from './components/SubModuleEditDrawer.vue';
import AddOrEditModuleDialog from './components/AddOrEditModuleDialog.vue';
import { useDebounceFn } from '@vueuse/core';
import _ from 'lodash';
import { useReset } from '@bole-core/core';
defineOptions({
  name: 'ModuleManage',
});

const ModuleOperationBtns: OperationBtnType[] = [
  {
    data: {
      name: '编辑',
    },
    emits: {
      onClick: (row) => {
        ModuleUtils.isRootModule(row) ? handleAddOrEditRootModule(row) : handleEditChildModule(row);
      },
    },
  },
  {
    data: {
      name: '新增子菜单',
    },
    emits: {
      onClick: (row) => handleAddChildModule(row),
    },
  },
  {
    data: {
      name: '页面按钮',
    },
    emits: {
      onClick: (row) => openDrawer(row, SubModuleType.PageButton),
    },
    extraProps: {
      hide: (row) => ModuleUtils.isRootModule(row),
    },
  },
  {
    data: {
      name: '数据按钮',
    },
    emits: {
      onClick: (row) => openDrawer(row, SubModuleType.DataButton),
    },
    extraProps: {
      hide: (row) => ModuleUtils.isRootModule(row),
    },
  },
  {
    data: {
      name: '数据列',
    },
    emits: {
      onClick: (row) => openDrawer(row, SubModuleType.Column),
    },
    extraProps: {
      hide: (row) => ModuleUtils.isRootModule(row),
    },
  },
  {
    data: {
      name: '删除',
    },
    emits: {
      onClick: (row) => handleDelete(row),
    },
    props: { type: 'danger' },
  },
];
const BaseState = {
  loading: true,
  searchValue: '',
};
const state = reactive({ ...BaseState });
const moduleTreeStore = ref<TreeStore<TreeModuleDtoGroupDto>>();
// 源数据
const originModuleTree = ref<TreeModuleDtoGroupDto[]>([]);
const tableRef = ref<TableInstance>();
// form
const editDialogFormVisible = ref(false);
const BaseFormData = {
  enCode: '',
  name: '',
  icon: '',
  parentId: '',
  sortCode: 0,
  path: '',
  isCache: true,
  isMenu: 1,
  enabledMark: 1,
  showCacheSelect: false,
  showIconSelect: false,
  showSubMenuIconSelect: false,
  showParentSelect: false,
  title: '',
};
const editForm = reactive({ ...BaseFormData });
const currentDialogModule = ref<TreeModuleDtoGroupDto>({});
//drawer
const drawerVisible = ref(false);
const currentDrawerModule = ref<TreeModuleDtoGroupDto>({});
const drawerState = reactive<{
  type: SubModuleType;
  tableData: ValueOf<API.AllSubModule>;
}>({
  type: SubModuleType.PageButton,
  tableData: [],
});
onMounted(async () => {
  await getAllModule();
  state.loading = false;
});
async function getAllModule() {
  try {
    let res = await baseModuleServices.getAllModuleList({
      showLoading: !state.loading,
    });
    const treeStore = ModuleUtils.convertToModuleGroup(res);
    moduleTreeStore.value = treeStore;
    originModuleTree.value = [...treeStore.data];
  } catch (error) {}
}
type StatusEventType = {
  isCache: boolean;
  isMenu: number;
  enabledMark: number;
};
async function handleChangeStatus<T extends keyof StatusEventType>(
  value: StatusEventType[T],
  data: TreeModuleDtoGroupDto,
  statusType: T
) {
  try {
    let params = {
      ..._.omit(data, ['children', 'parentNode']),
      [statusType]: value,
    };
    await baseModuleServices.addOrEditModule(params);
  } catch (error) {
    Message.errorMessage('操作失败');
  }
}
function openDialog(options: {
  module?: TreeModuleDtoGroupDto;
  showCacheSelect: boolean;
  showIconSelect: boolean;
  showSubMenuIconSelect: boolean;
  showParentSelect: boolean;
  parentId: string;
  baseSortCode?: number;
}) {
  const {
    module,
    showCacheSelect,
    showIconSelect,
    showSubMenuIconSelect,
    showParentSelect,
    parentId,
    baseSortCode,
  } = options;
  if (module) {
    currentDialogModule.value = module;
    useSetReactive(editForm, {
      title: `${module.name}编辑`,
      enCode: module.enCode,
      name: module.name,
      icon: module.icon,
      sortCode: module.sortCode,
      path: module.path,
      isMenu: module.isMenu,
      enabledMark: module.enabledMark,
      parentId: parentId,
      showCacheSelect,
      showIconSelect,
      showSubMenuIconSelect,
      showParentSelect,
      isCache: module.isCache,
    });
  } else {
    currentDialogModule.value = {};
    useSetReactive(editForm, BaseFormData, {
      title: '新增功能模块',
      parentId: parentId,
      showCacheSelect,
      showIconSelect,
      showSubMenuIconSelect,
      showParentSelect,
      sortCode: baseSortCode,
    });
  }
  editDialogFormVisible.value = true;
}
function handleAddOrEditRootModule(module?: TreeModuleDtoGroupDto) {
  const showCacheSelect = false;
  const showIconSelect = true;
  const showSubMenuIconSelect = false;
  const showParentSelect = false;
  const parentId = '';
  openDialog({
    module,
    showCacheSelect,
    showIconSelect,
    showSubMenuIconSelect,
    showParentSelect,
    parentId,
    baseSortCode: ModuleUtils.getSortCode(moduleTreeStore.value, module) + 1,
  });
}
//当前正在新增子菜单的module或正在编辑的子菜单的父级菜单
const currentAddingOrEditParentModule = ref<TreeModuleDtoGroupDto>({});
function handleAddChildModule(parentModule: TreeModuleDtoGroupDto) {
  handleAddOrEditChildModule(parentModule);
}
function handleEditChildModule(module: TreeModuleDtoGroupDto) {
  const parentModule = ModuleUtils.getParentModule(moduleTreeStore.value, module);
  handleAddOrEditChildModule(parentModule, module);
}
function handleAddOrEditChildModule(
  parentModule: TreeModuleDtoGroupDto,
  module?: TreeModuleDtoGroupDto
) {
  const showCacheSelect = true;
  const showIconSelect = false;
  const showParentSelect = true;
  const parentId = parentModule.id;
  currentAddingOrEditParentModule.value = parentModule;
  //如果是编辑 SortCode为上一个加1
  const baseSortCode = ModuleUtils.getLastChildSortCode(moduleTreeStore.value, parentModule) + 1;
  openDialog({
    module: module,
    showCacheSelect,
    showIconSelect,
    showSubMenuIconSelect: true,
    showParentSelect,
    parentId,
    baseSortCode,
  });
}
async function handleAddOrEditModule() {
  try {
    let params: API.ModuleDto = {
      enCode: editForm.enCode,
      name: editForm.name,
      sortCode: editForm.sortCode,
      path: editForm.path,
      // isCache: true,
      isMenu: editForm.isMenu,
      enabledMark: editForm.enabledMark,
      icon: editForm.icon,
      // parentId:,
    };
    if (editForm.showCacheSelect) {
      params.isCache = editForm.isCache;
    }
    if (editForm.parentId) {
      params.parentId = editForm.parentId;
    }
    if (currentDialogModule.value.id) {
      params.id = currentDialogModule.value.id;
    }
    const res = await baseModuleServices.addOrEditModule(params);
    if (res) {
      Message.successMessage('保存成功');
      getAllModule();
      editDialogFormVisible.value = false;
    }
  } catch (e) {}
}

async function handleDelete(module: TreeModuleDtoGroupDto) {
  try {
    await Message.deleteMessage();
    const res = await baseModuleServices.deleteModule({ id: module.id });
    if (res) {
      Message.successMessage('删除成功');
      getAllModule();
    }
  } catch (error) {}
}
function openDrawer(module: TreeModuleDtoGroupDto, type: SubModuleType) {
  drawerState.type = type;
  currentDrawerModule.value = module;
  getBaseModuleGetAllSubModule(module, type);
}
async function getBaseModuleGetAllSubModule(module: TreeModuleDtoGroupDto, type: SubModuleType) {
  try {
    let params = {
      moduleId: module.id,
    };
    const res = await baseModuleServices.getAllSubModule(params);
    drawerState.tableData = res[SubModuleKey[type]];
    drawerVisible.value = true;
  } catch (error) {}
}
function handleAddSubModule() {
  let sortCode = getDefaultSortCode();
  let baseData = {
    enCode: '',
    name: '',
    sortCode: sortCode,
    width: 0,
    isEdit: true,
    apiName: '',
    realColumn: '',
    isShow: true,
  };
  drawerState.tableData?.push(baseData);
}
function getDefaultSortCode() {
  return drawerState.tableData.length > 0
    ? drawerState.tableData[drawerState.tableData.length - 1].sortCode + 1
    : 0;
}
function handleBatchAddColumn(keys: string[]) {
  let sortCode = getDefaultSortCode();
  let baseDataList = keys.map((key, index) => ({
    enCode: key,
    name: '',
    sortCode: sortCode + index,
    width: 0,
    isEdit: true,
  }));
  drawerState.tableData?.push(...baseDataList);
}
function handleAddFastBtn(fastBtn: FastBtn) {
  let subModule: API.ModuleButtonDto | API.ModuleColumnDto = {
    enCode: fastBtn.enCode,
    name: fastBtn.name,
    sortCode: getDefaultSortCode(),
  };
  if (drawerState.type === SubModuleType.Column) {
    //@ts-ignore
    subModule.width = fastBtn.width;
  }
  handleSaveSubModule(subModule);
}
async function handleSaveSubModule(subModule: API.ModuleButtonDto | API.ModuleColumnDto) {
  try {
    let params = {
      moduleId: currentDrawerModule.value.id,
      enCode: subModule.enCode,
      name: subModule.name,
      sortCode: subModule.sortCode,
    };
    if (subModule.id) {
      //@ts-ignore
      params.id = subModule.id;
    }
    if (drawerState.type === SubModuleType.Column) {
      const _subModule = subModule as API.ModuleColumnDto;
      params = {
        ...params,
        //@ts-ignore
        width: _subModule.width,
        apiName: _subModule.apiName,
        realColumn: _subModule.realColumn,
        isShow: _subModule.isShow,
      };
    } else {
      //@ts-ignore
      params.buttonType = drawerState.type;
    }
    let res = null;
    if (drawerState.type === SubModuleType.Column) {
      res = await baseModuleServices.addOrEditModuleColumn(params);
    } else {
      res = await baseModuleServices.addOrEditModuleButton(params);
    }
    if (res) {
      getBaseModuleGetAllSubModule(currentDrawerModule.value, drawerState.type);
      Message.successMessage('保存成功');
    }
  } catch (error) {}
}
async function handelBatchSaveColumn() {
  try {
    if (drawerState.type === SubModuleType.Column) {
      let columnModuleList = drawerState.tableData as (API.ModuleColumnDto & { isEdit: boolean })[]; //.filter((d) => d.isEdit);
      if (columnModuleList.length > 0) {
        let params = columnModuleList.map((columnModule) => {
          let columnItem = {
            moduleId: currentDrawerModule.value.id,
            enCode: columnModule.enCode,
            name: columnModule.name,
            sortCode: columnModule.sortCode,
            apiName: columnModule.apiName,
            realColumn: columnModule.realColumn,
            isShow: columnModule.isShow,
            width: columnModule.width,
          };
          if (columnModule.id) {
            //@ts-ignore
            columnItem.id = columnModule.id;
          }
          return columnItem;
        });
        let res = await baseModuleServices.addModuleColumnList(params, {
          getResponse: true,
        });
        if (res) {
          getBaseModuleGetAllSubModule(currentDrawerModule.value, drawerState.type);
          Message.successMessage('保存成功');
        }
      }
    }
  } catch (error) {}
}

async function handleDeleteSubModule(subModule: API.ModuleButtonDto | API.ModuleColumnDto) {
  try {
    await Message.deleteMessage();
    let res = null;
    if (drawerState.type === SubModuleType.Column) {
      res = await baseModuleServices.deleteModuleColumn({ id: subModule.id });
    } else {
      res = await baseModuleServices.deleteModuleButton({ id: subModule.id });
    }
    if (res) {
      Message.successMessage('删除成功');
      getBaseModuleGetAllSubModule(currentDrawerModule.value, drawerState.type);
    }
  } catch (error) {}
}
function toggleExpand(expanded: boolean) {
  if (!tableRef.value) return;
  moduleTreeStore.value.data.forEach((module) => {
    tableRef.value?.toggleRowExpansion(module, expanded);
  });
}
const handleSearch = useDebounceFn(() => {
  if (state.searchValue) {
    // @ts-ignore
    moduleTreeStore.value.data = ModuleUtils.filterModuleTree(
      state.searchValue,
      originModuleTree.value
    );
    nextTick(() => {
      toggleExpand(true);
    });
  } else {
    moduleTreeStore.value.data = originModuleTree.value;
  }
});
const handleReset = useReset(state, BaseState, getAllModule);
</script>
