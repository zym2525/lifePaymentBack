<template>
  <PageFormLayout>
    <ProForm :model="form" ref="formRef" label-width="120px" class="platform-user-form">
      <ProFormCol>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="账号:" prop="userName">
            <ProFormText v-model.trim="form.userName" style="width: 300px" disabled> </ProFormText>
            <el-button type="default" @click="handleChangeUserName()">修改账号</el-button>
          </ProFormItemV2>
        </ProFormColItem>
      </ProFormCol>
      <ProFormCol>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="用户手机号:" prop="phoneNumber">
            <ProFormText v-model.trim="form.phoneNumber" style="width: 300px" disabled>
            </ProFormText>
            <el-button
              :disabled="!form.phoneNumber"
              type="default"
              @click="handleUnbindPhoneNumber()"
              >解绑</el-button
            >
          </ProFormItemV2>
        </ProFormColItem>
      </ProFormCol>
      <ProFormCol>
        <ProFormColItem :span="12">
          <ProFormItemV2 label="邮箱:" prop="email">
            <ProFormText v-model.trim="form.email" style="width: 300px" disabled> </ProFormText>
            <el-button :disabled="!form.email" type="default" @click="handleUnbindEmail()"
              >解绑</el-button
            >
          </ProFormItemV2>
        </ProFormColItem>
      </ProFormCol>
    </ProForm>
    <PlatformAccountEditDialog v-bind="dialogProps" />
  </PageFormLayout>
</template>

<script setup lang="ts">
import {
  PageFormLayout,
  ProForm,
  ProFormItemV2,
  ProFormCol,
  ProFormColItem,
  ProFormText,
  useFormDialog,
  AppContainer,
} from '@bole-core/components';
import { useQuery } from '@tanstack/vue-query';
import { FormInstance } from 'element-plus';
import { useGlobalEventContext, useRouteView } from '@/hooks';
import * as userServices from '@/services/api/User';
import * as accountServices from '@/services/api/Account';
import { Message } from '@bole-core/core';
import PlatformAccountEditDialog from './PlatformAccountEditDialog.vue';

defineOptions({
  name: 'AddOrEditPlatformAccount',
});

const route = useRoute();
const id = route.params.id as string;
const formRef = ref<FormInstance>();
const eventContext = useGlobalEventContext();
const { closeViewPush } = useRouteView();

const form = reactive({
  phoneNumber: '',
  newPhoneNumber: '',
  userId: '',
  userName: '',
  email: '',
});

const { refetch } = useQuery({
  queryKey: ['userServices/GetPlatUserAttestationInfo', id],
  queryFn: async () => {
    return await userServices.getPlatUserAttestationInfo(
      { id: id },
      {
        showLoading: false,
      }
    );
  },
  placeholderData: () => ({} as API.PlatUserAttestationInfoDto),
  onSuccess(data) {
    form.userName = data?.userName ?? '';
    form.userId = data?.id ?? '';
    form.phoneNumber = data?.phoneNumber ?? '';
    form.email = data?.bindEmailAddress ?? '';
  },
  enabled: !!id,
});
function handleBack() {
  closeViewPush(route, {
    name: 'EnterpriseUser',
  });
}

async function handleUnbindPhoneNumber() {
  try {
    await Message.tipMessage('确定是否解绑用户手机号，解绑后用户无法使用手机号登录');
    let params: API.UnbindingUserPhoneNumber = {
      userId: form.userId,
    };
    let res = await accountServices.unbindingUserPhoneNumber(params);
    if (res) {
      Message.successMessage('操作成功');
      refetch();
    }
  } catch (error) {
    console.log('error: ', error);
  }
}

const { dialogProps, handleEdit, editForm, dialogState } = useFormDialog({
  onConfirm: handleAddOrEdit,
  defaultFormParams: {
    userId: '',
    userName: '',
    newUserName: '',
  },
});

async function handleChangeUserName() {
  try {
    await Message.tipMessage('确定是否修改用户账号');
    handleEdit({
      userId: form.userId,
      userName: form.userName,
      newUserName: '',
    });
  } catch (error) {
    console.log('error: ', error);
  }
}

async function handleAddOrEdit() {
  try {
    await Message.tipMessage('确定是否修改用户账号');
    let params: API.ChangeUserNameInput = {
      userId: form.userId,
      newUserName: editForm.newUserName,
    };
    let res = await accountServices.changeUserName(params);
    if (res) {
      Message.successMessage('操作成功');
      refetch();
    }
  } catch (error) {
    console.log('error: ', error);
  }
}

async function handleUnbindEmail() {
  try {
    await Message.tipMessage('确定是否解绑用户邮箱，解绑后用户无法使用邮箱登录');
    let params: API.UnbindingUserEmailInput = {
      userId: form.userId,
    };
    let res = await accountServices.unbindingUserEmail(params);
    if (res) {
      Message.successMessage('操作成功');
      refetch();
    }
  } catch (error) {
    console.log('error: ', error);
  }
}
</script>

<style lang="scss" scoped>
:deep(.platform-user-form) {
  .el-form-item__content {
    flex-wrap: nowrap;
  }
}

.el-button {
  margin-left: 20px;
  width: 100px;
}
</style>
