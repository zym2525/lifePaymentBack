<template>
  <el-dialog
    class="custom-dialog"
    width="55%"
    :title="dialogTitle"
    :modelValue="props.authorizeId != ''"
    :top="'10vh'"
    @close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="authorize-wrapper">
      <div class="container-wrapper left-wrapper">
        <el-scrollbar>
          <el-tree
            class="companyTree"
            :data="state.sysModules"
            :props="{
              children: 'children',
              label: 'name',
            }"
            node-key="id"
            :expand-on-click-node="false"
            :highlight-current="true"
            default-expand-all
            show-checkbox
            ref="moduleTree"
            :default-checked-keys="checkedModules"
          >
            <template #default="{ node }">
              <div class="custom-tree-node">
                <type-tip :typeTip="node.data.levelNum" :isMenu="node.data.isMenu" />
                <div class="node-text" @click="handleSelectModule(node.data)">
                  {{ node.label }}
                </div>
              </div>
            </template>
          </el-tree>
        </el-scrollbar>
      </div>

      <div class="container-wrapper">
        <div class="type-wrapper">
          {{ SubModuleTitle[SubModuleType.PageButton] }}
        </div>
        <el-scrollbar>
          <el-tree
            v-show="state.pageButton[state.currentModule]"
            :data="[
              {
                name: '全选',
                id: 'pageButtonAll',
                children: state.pageButton[state.currentModule],
              },
            ]"
            :props="{
              children: 'children',
              label: 'name',
            }"
            node-key="id"
            :expand-on-click-node="false"
            :highlight-current="true"
            default-expand-all
            show-checkbox
            ref="pageButtonTree"
            :default-checked-keys="checkedPageButton"
          >
            <template #default="{ node }">
              <div class="custom-tree-node">
                <span>{{ node.label }}</span>
              </div>
            </template>
          </el-tree>
        </el-scrollbar>
      </div>

      <div class="container-wrapper">
        <div class="type-wrapper">
          {{ SubModuleTitle[SubModuleType.DataButton] }}
        </div>
        <el-scrollbar>
          <el-tree
            v-show="state.dataButton[state.currentModule]"
            :data="[
              {
                name: '全选',
                id: 'dataButtonAll',
                children: state.dataButton[state.currentModule],
              },
            ]"
            :props="{
              children: 'children',
              label: 'name',
            }"
            node-key="id"
            :expand-on-click-node="false"
            :highlight-current="true"
            default-expand-all
            show-checkbox
            ref="dataButtonTree"
            :default-checked-keys="checkedDataButton"
          >
            <template #default="{ node }">
              <div class="custom-tree-node">
                <span>{{ node.label }}</span>
              </div>
            </template>
          </el-tree>
        </el-scrollbar>
      </div>

      <div class="container-wrapper">
        <div class="type-wrapper">
          {{ SubModuleTitle[SubModuleType.Column] }}
        </div>
        <el-scrollbar>
          <el-tree
            v-show="state.dataColumn[state.currentModule]"
            :data="[
              {
                name: '全选',
                id: 'dataColumnAll',
                children: state.dataColumn[state.currentModule],
              },
            ]"
            :props="{
              children: 'children',
              label: 'name',
            }"
            node-key="id"
            :expand-on-click-node="false"
            :highlight-current="true"
            default-expand-all
            show-checkbox
            ref="dataColumnTree"
            :default-checked-keys="checkedDataColumn"
          >
            <template #default="{ node }">
              <div class="custom-tree-node">
                <span>{{ node.label }}</span>
              </div>
            </template>
          </el-tree>
        </el-scrollbar>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitAuthorizeByID" class="btn-submit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import * as baseModuleServices from '@/services/api/BaseModule';
import { Message } from '@bole-core/core';
import { AuthorizeType, SubModuleType, SubModuleTitle } from '@/constants';
import { getTree } from '@/utils';
import { templateRef } from '@vueuse/core';

const TypeTip = defineComponent({
  name: 'TypeTip',
  props: ['typeTip', 'isMenu'],
  render() {
    const { typeTip, isMenu } = this;
    const tipText = isMenu ? `菜单` : '页面';
    return h(
      'span',
      {
        class: 'tip-text',
        style: {
          color: '#EB6100',
        },
      },
      '[' + tipText + ']'
    );
  },
});

const props = defineProps({
  authorizeId: {
    type: String,
    default: '',
  },
  authorizeType: {
    type: String,
    default: 'Role',
  },
});
const emit = defineEmits<{
  (e: 'update:authorizeId', params: string): void;
}>();

const state = reactive({
  sysModules: [],

  currentModule: '',

  pageButton: {},
  dataButton: {},
  dataColumn: {},

  checkedInfo: [],
});

const elModuleTree = templateRef<HTMLElement | any>('moduleTree', null);
const pageButtonTree = templateRef<HTMLElement | any>('pageButtonTree', null);
const dataButtonTree = templateRef<HTMLElement | any>('dataButtonTree', null);
const dataColumnTree = templateRef<HTMLElement | any>('dataColumnTree', null);

const dialogTitle = computed(() =>
  props.authorizeType === 'Role' ? '角色功能授权' : '账号功能授权'
);
const checkedModules = computed(() => initModeluChecked());
const checkedPageButton = computed(() => initChecked(2));
const checkedDataButton = computed(() => initChecked(3));
const checkedDataColumn = computed(() => initChecked(4));

watch(
  () => props.authorizeId,
  (newVal) => {
    if (newVal) {
      state.currentModule = '';
      state.checkedInfo = [];
      state.sysModules = [];
      state.pageButton = {};
      state.dataButton = {};
      state.dataColumn = {};
      try {
        // get had authorized by id
        getModulesByUserOrRoleId(newVal);
      } catch (error) {
        Message.errorMessage(error.message || '请求错误');
      }
    }
  }
);

async function submitAuthorizeByID() {
  try {
    handleSelectModule({
      id: state.currentModule,
    });
    const modules = elModuleTree.value.getCheckedNodes(false, true).map((x) => {
      return {
        moduleType: SubModuleType.MenuButton,
        moduleId: x.id,
      };
    });
    console.log('modules: ', modules);
    const moduleTypeInfo = state.checkedInfo.filter((x) => x.type !== SubModuleType.MenuButton);
    if (modules && modules.length) {
      moduleTypeInfo.push(...modules);
    }

    const { authorizeType, authorizeId } = props;

    const data = {
      objectType: AuthorizeType[authorizeType],
      objectId: authorizeId,
      moduleTypeInfo: moduleTypeInfo.map((x) => {
        return {
          moduleType: x.moduleType,
          moduleId: x.moduleId,
        };
      }),
    };

    const result = await baseModuleServices.addAuthorizeModule(data);
    if (result) {
      Message.successMessage('授权成功！');
    } else {
      Message.errorMessage('授权失败！');
    }
    handleClose();
  } catch (error) {}
}

function handleSelectModule(data) {
  const { currentModule } = state;
  const modules1 =
    dataButtonTree &&
    dataButtonTree.value.getCheckedKeys(true).map((x) => {
      return {
        moduleType: SubModuleType.DataButton,
        moduleId: x,
        currentModule,
      };
    });

  const modules2 =
    pageButtonTree &&
    pageButtonTree.value.getCheckedKeys(true).map((x) => {
      return {
        moduleType: SubModuleType.PageButton,
        moduleId: x,
        currentModule,
      };
    });

  const modules3 =
    dataColumnTree &&
    dataColumnTree.value.getCheckedKeys(true).map((x) => {
      return {
        moduleType: SubModuleType.Column,
        moduleId: x,
        currentModule,
      };
    });

  const checkExtends = state.checkedInfo.filter(
    (x) => x.currentModule !== currentModule && x.currentModule !== undefined
  );

  if (modules1 && modules1.length) {
    checkExtends.push(...modules1);
  }
  if (modules2 && modules2.length) {
    checkExtends.push(...modules2);
  }
  if (modules3 && modules3.length) {
    checkExtends.push(...modules3);
  }

  state.checkedInfo = checkExtends;
  state.currentModule = data.id;
}

async function getModulesByUserOrRoleId(id) {
  const { authorizeType } = props;

  const data = {
    objectType: AuthorizeType[authorizeType],
    id,
  };

  const result = await baseModuleServices.getUserOrRoleModuleList(data);

  state.sysModules = getTree(result, null);
  elModuleTree.value.setCheckedKeys(result.filter((x) => x.hasCheck).map((x) => x.id));

  initAuthorizeInfo(result, 1);

  getExtendsByRoleOrUser(data);
}

function initAuthorizeInfo(originData, type, targetKey = '') {
  originData.map((item) => {
    const { moduleId } = item;
    if (targetKey) {
      if (!state[targetKey][moduleId]) {
        state[targetKey][moduleId] = [];
      }

      state[targetKey][moduleId].push(item);
    }

    if (item.hasCheck) {
      state.checkedInfo.push({
        moduleType: type,
        moduleId: item.id,
        currentModule: item.moduleId,
        parentId: item.parentId,
      });
    }
  });
}

async function getExtendsByRoleOrUser(data) {
  try {
    let result = await baseModuleServices.getUserOrRoleSubModuleList(data);
    const { pageButton, dataButton, column } = result;
    initAuthorizeInfo(pageButton, 2, 'pageButton');
    initAuthorizeInfo(dataButton, 3, 'dataButton');
    initAuthorizeInfo(column, 4, 'dataColumn');
  } catch (error) {
    console.log(error);
  }
}

function initModeluChecked() {
  return state.checkedInfo
    .filter((x) => x.moduleType === SubModuleType.MenuButton && x.parentId)
    .map((x) => x.moduleId);
}

function initChecked(type) {
  return state.checkedInfo.filter((x) => x.moduleType === type).map((x) => x.moduleId);
}

function handleClose() {
  emit('update:authorizeId', '');
}
</script>

<style lang="scss" scoped>
:deep(.custom-dialog) {
  min-width: 900px;
}

.authorize-wrapper {
  display: flex;

  height: 500px;
  border-bottom: 2px solid #f5f5f5;
  background: #dddddd;

  .container-wrapper {
    width: calc(25%);
    border-right: 2px solid #f5f5f5;
    // margin-right: 7px;
    background: #ffffff;

    .type-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px 16px;
      border-bottom: 2px solid #f5f5f5;
      color: #333333;
    }

    &:last-of-type {
      margin-right: 0px;
    }

    &.left-wrapper {
      margin-right: 7px;
      padding-top: 10px;
      width: calc(35% - 7px);

      :deep(.el-scrollbar) {
        width: 100%;
        height: 98%;
      }
    }

    :deep(.el-scrollbar) {
      width: 100%;
      height: calc(98% - 43px);

      .el-scrollbar__wrap {
        overflow: auto;

        .custom-tree-node {
          display: flex;
        }
      }
    }
  }
}
</style>
