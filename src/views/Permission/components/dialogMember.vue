<template>
  <el-dialog :modelValue="visibleId != ''" width="1080px" title="成员管理" @close="handleClose">
    <div class="setting-wrapper">
      <div class="setting-wrapper-left">
        <section class="table-wrapper">
          <el-table :data="state.originAccountList" size="mini" stripe :max-height="400">
            <el-table-column type="index" label="序号" width="100"> </el-table-column>
            <el-table-column prop="userName" label="登录账号"> </el-table-column>
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column label="" width="60">
              <template #default="scope">
                <el-button
                  :icon="!scope.row.isCheck ? 'plus' : 'delete'"
                  class="fa"
                  link
                  type="primary"
                  @click="handleAddOrNot(scope.row.id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>

          <div v-if="state.pagination.total !== 0" class="pagination-wrapper">
            <el-pagination
              layout=" prev, pager, next, jumper"
              :page-sizes="[20, 50, 100, 200, 400, 500]"
              :current-page="state.pagination.page"
              :page-size="50"
              :total="state.pagination.total"
              @current-change="getAccountList"
              @size-change="handleSizeChange"
            >
            </el-pagination>
          </div>
        </section>
      </div>
      <div class="setting-wrapper-right">
        <el-scrollbar>
          <el-table :data="state.checkedList" size="mini" stripe>
            <el-table-column type="index" label="序号" width="55"> </el-table-column>
            <el-table-column prop="userName" label="登录账号"> </el-table-column>
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column label="" width="60">
              <template #default="scope">
                <el-button icon="delete" link type="primary" @click="handleAddOrNot(scope.row.id)">
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose"> 取消 </el-button>
        <el-button type="primary" @click="changeRoleAccount" class="btn-submit"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import * as identityUserServices from '@/services/api/IdentityUser';
import * as userRoleServices from '@/services/api/UserRole';

import { Message } from '@bole-core/core';

const props = defineProps({
  visibleId: {
    type: String,
    default: '',
  },
});

const emit = defineEmits<{
  (e: 'update:visibleId', params: string): void;
}>();

watch(
  () => props.visibleId,
  async (newValue) => {
    if (newValue) {
      const result = await identityUserServices.getRoleUserList({
        id: newValue,
        pageModel: { rows: 100, page: 1 },
      });

      const { data } = result;
      const list = data.map((item) => {
        return {
          id: item.id,
          userName: item.userName,
          name: item.name,
        };
      });
      state.checkedList = list;
      getAccountList();
    }
  }
);

const state = reactive({
  checkedList: [],
  originAccountList: [],
  pagination: {
    rows: 20,
    page: 1,
    orderInput: [{ property: 'Id', order: 'asc' }],
    total: -1,
  },
});

function handleClose() {
  emit('update:visibleId', '');
}

function handleAddOrNot(id) {
  const hitIndex = state.checkedList.findIndex((x) => x.id === id);

  const isExistOrigin = state.originAccountList.findIndex((x) => x.id === id);

  // 已选
  if (hitIndex !== -1) {
    //如果 当前account 只有一个role且是当前的roleId visibleId的话就不能删除
    if (isExistOrigin !== -1) {
      const roles = state.originAccountList[isExistOrigin].roles;
      const roleIndex = roles.findIndex((role) => role.id === props.visibleId);
      if (roles.length === 1 && roleIndex !== -1) {
        Message.warnMessage('账号有且只有该角色，不能删除');
        return;
      }
    }
    state.checkedList.splice(hitIndex, 1);
  }

  //未选
  if (isExistOrigin !== -1) {
    state.originAccountList[isExistOrigin]['isCheck'] = hitIndex === -1;

    if (hitIndex === -1) {
      const current = state.originAccountList[isExistOrigin];
      state.checkedList.push({
        id: current.id,
        userName: current.userName,
        name: current.name,
        phone: current.phone,
        isCheck: true,
      });
    }
  }
}

async function getAccountList(pageIndex = 1) {
  try {
    state.pagination.page = pageIndex;

    let params = {
      pageModel: { rows: 100, page: 1 },
    };

    const result = await userRoleServices.getBackClientUsers(params);

    const { data, pageModel } = result;

    const { checkedList } = state;
    data.forEach((x) => {
      const isExistIndex = checkedList.findIndex((item) => x.id === item.id);
      if (isExistIndex !== -1) {
        //@ts-ignore
        x.isCheck = true;
      }
    });

    state.originAccountList = data;
    state.pagination.total = pageModel.totalCount;
  } catch (error) {
    console.log(error);
  }
}

function handleSizeChange(val) {
  state.pagination.rows = val;
  getAccountList();
}

async function changeRoleAccount() {
  try {
    const params = {
      userId: state.checkedList.map((x) => x.id),
      roleId: props.visibleId,
    };
    await identityUserServices.setRoleUser(params);
    Message.successMessage('设置成功!');
    handleClose();
  } catch (error) {
    Message.errorMessage(error.message || '设置失败!');
  }
}
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.setting-wrapper {
  display: flex;
  justify-content: space-between;
  // position: relative;
  width: 100%;
  height: 440px;
  border-bottom: 1px solid #e8e8e8;
  background-color: #f5f5f5;

  &-left {
    position: relative;
    display: flex;
    width: 55%;
    background-color: #ffffff;
    box-shadow: 0px 2px 5px 0px rgba(112, 114, 117, 0.3);

    .el-scrollbar {
      height: 360px;

      .el-scrollbar__bar.is-vertical {
        padding-bottom: 18px;
      }
    }

    .table-wrapper {
      display: flex;
      width: 100%;
      flex-direction: column;

      .pagination-wrapper {
        display: flex;
        justify-content: center;
        margin: 6px 0;
      }
    }
  }

  &-right {
    // width: 40%;
    margin-left: 12px;
    background-color: #ffffff;
    box-shadow: 0px 2px 5px 0px rgba(112, 114, 117, 0.3);
    flex: 1;

    ul.selected-wrapper {
      li {
        position: relative;
        padding-left: 30px;
        width: 100%;
        height: 47px;
        font-size: 14px;
        border-bottom: 1px solid #efefef;
        color: #999999;
        transition: all 0.45s ease;
        line-height: 47px;

        &:hover {
          color: #ffffff;
          background-color: boleGetCssVar('color', 'primary');

          .el-icon-delete {
            position: absolute;
            display: inline-block;
          }
        }
      }
    }
  }
}

.btn-wrapper {
  justify-content: center;
  padding: 4% 40px 4%;
}

:deep(.el-scrollbar) {
  height: 100%;

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
