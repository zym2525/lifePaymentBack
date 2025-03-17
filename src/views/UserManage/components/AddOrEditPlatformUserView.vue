<template>
  <LoadingLayout>
    <AppContainer>
      <ChunkCell title="开通账号" v-if="!isEdit">
        <PageFormLayout>
          <ProForm
            :model="form"
            ref="formRefAccount"
            :rules="rules"
            label-width="120px"
            :is-read="isDetail"
          >
            <ProFormCol>
              <ProFormColItem :span="12">
                <ProFormItemV2 label="手机号:" prop="phoneNumber">
                  <ProFormText v-model.trim="form.phoneNumber" placeholder="请输入手机号" />
                </ProFormItemV2>
              </ProFormColItem>
            </ProFormCol>
            <ProFormCol>
              <ProFormColItem :span="12">
                <ProFormItemV2 label="初始密码:" prop="initPassword">
                  <ProFormText v-model.trim="form.initPassword" placeholder="请输入初始密码" />
                </ProFormItemV2>
              </ProFormColItem>
            </ProFormCol>
            <ProFormCol>
              <ProFormColItem :span="12">
                <ProFormItemV2 label="账号:" prop="userName">
                  <ProFormText v-model.trim="form.userName" placeholder="请输入账号" />
                  <template #tip>
                    账号由8-13位字符（大写字母、小写字母、数字）组成
                    <el-button type="primary" link @click="generateUserName()">重新生成</el-button>
                  </template>
                </ProFormItemV2>
              </ProFormColItem>
            </ProFormCol>
            <ProFormCol>
              <ProFormColItem :span="12">
                <ProFormItemV2 label="邮箱:" prop="userInfoEmailAddress">
                  <ProFormText v-model.trim="form.userInfoEmailAddress" placeholder="请输入邮箱" />
                </ProFormItemV2>
              </ProFormColItem>
            </ProFormCol>
          </ProForm>
        </PageFormLayout>
      </ChunkCell>
      <ChunkCell title="用户信息">
        <PageFormLayout>
          <ProForm :model="form" ref="formRef" label-width="120px" :is-read="isDetail">
            <ProFormCol>
              <ProFormColItem :span="12">
                <ProFormItemV2
                  label="企业类型:"
                  prop="authType"
                  :check-rules="[{ message: '请选择企业类型' }]"
                >
                  <ProFormSelect
                    v-model="form.authType"
                    placeholder="请选择企业类型"
                    :value-enum="EnterpriseTypeText"
                    clearable
                    :disabled="isEdit && form.hasAuthType"
                  />
                </ProFormItemV2>
              </ProFormColItem>
            </ProFormCol>
            <ProFormCol>
              <ProFormColItem :span="12">
                <ProFormItemV2 label="企业名称:" prop="enterpriseName">
                  <ProFormText
                    v-model.trim="form.enterpriseName"
                    placeholder="请输入企业名称"
                    :maxlength="40"
                    show-word-limit
                  />
                </ProFormItemV2>
              </ProFormColItem>
            </ProFormCol>
            <ProFormCol>
              <ProFormColItem :span="12">
                <ProFormItemV2
                  label="头像:"
                  prop="avatarUrl"
                  :check-rules="[{ type: 'upload', message: '请上传头像', required: false }]"
                  class="avatar-form-item"
                >
                  <ProFormImageUpload
                    :fileDirectory="OssUser"
                    v-model:file-url="form.avatarUrl"
                    :limitFileCount="1"
                  >
                  </ProFormImageUpload>
                </ProFormItemV2>
              </ProFormColItem>
            </ProFormCol>
            <ProFormCol>
              <ProFormColItem :span="12">
                <ProFormItemV2
                  label="姓名:"
                  prop="contacter"
                  :check-rules="[{ message: '请输入姓名', required: false }]"
                >
                  <ProFormText
                    v-model.trim="form.contacter"
                    :maxlength="10"
                    show-word-limit
                    placeholder="请输入姓名"
                  />
                </ProFormItemV2>
              </ProFormColItem>
            </ProFormCol>
            <ProFormCol>
              <ProFormColItem :span="12">
                <ProFormItemV2 label="性别:" prop="genderType">
                  <ProFormRadio
                    v-model="form.genderType"
                    :value-enum="GenderText"
                    :buttonStyle="false"
                  ></ProFormRadio>
                </ProFormItemV2>
              </ProFormColItem>
            </ProFormCol>
            <ProFormCol>
              <ProFormColItem :span="12">
                <ProFormItemV2
                  label="职称:"
                  prop="jobTitle"
                  :check-rules="[{ message: '请输入职称', required: false }]"
                >
                  <ProFormText
                    v-model.trim="form.jobTitle"
                    :maxlength="15"
                    show-word-limit
                    placeholder="请输入职称"
                  />
                </ProFormItemV2>
              </ProFormColItem>
            </ProFormCol>
            <ProFormCol>
              <ProFormColItem :span="12">
                <ProFormItemV2
                  label="所在地区:"
                  prop="areaList"
                  :check-rules="[
                    {
                      type: 'array',
                      message: '请选择所在地区',
                      required: false,
                    },
                  ]"
                >
                  <ProFromAddressSelectV2 v-model:areaList="form.areaList" />
                </ProFormItemV2>
              </ProFormColItem>
            </ProFormCol>
            <ProFormCol>
              <ProFormColItem :span="12">
                <ProFormItemV2 label="详细地址:" prop="addressDetail">
                  <ProFormText
                    v-model.trim="form.addressDetail"
                    placeholder="请输入详细地址"
                    :maxlength="20"
                    show-word-limit
                  />
                </ProFormItemV2>
              </ProFormColItem>
            </ProFormCol>
            <ProFormItemV2
              label="微信二维码:"
              prop="wxQrCodeUrl"
              :check-rules="[{ type: 'upload', message: '请上传微信二维码', required: false }]"
            >
              <ProFormImageUpload
                :fileDirectory="OssUser"
                v-model:file-url="form.wxQrCodeUrl"
                :limitFileCount="1"
              ></ProFormImageUpload>
            </ProFormItemV2>
          </ProForm>
          <template #footer v-if="!isDetail">
            <el-button @click="handleBack()">取消</el-button>
            <el-button type="primary" @click="handleConfirm()">保存</el-button>
          </template>
        </PageFormLayout>
      </ChunkCell>
    </AppContainer>
  </LoadingLayout>
</template>

<script setup lang="ts">
import {
  LoadingLayout,
  ProForm,
  ProFormCol,
  ProFormColItem,
  PageFormLayout,
  ProFormItemV2,
  ProFormRadio,
  ProFormImageUpload,
  ProFormText,
  UploadUserFile,
  ProFormSelect,
  ChunkCell,
} from '@bole-core/components';
import { useRouteView, useAllAreaList, useGlobalEventContext } from '@/hooks';
import { convertApi2FormUrlOnlyOne, format, filterCN, validateFormList } from '@/utils';
import {
  OssUser,
  Gender,
  GenderText,
  EnterpriseTypeText,
  EnterpriseType,
  MyRegExp,
  RoleClientType,
} from '@/constants';
import * as accountServices from '@/services/api/Account';
import { FormInstance, FormRules } from 'element-plus';
import * as userServices from '@/services/api/User';
import { BoleRegExp, Message } from '@bole-core/core';
import { useQuery } from '@tanstack/vue-query';

defineOptions({
  name: 'AddOrEditPlatformUserView',
});

type Props = {
  isDetail?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  isDetail: false,
});

const route = useRoute();
const id = route.params.id as string;
const isEdit = !!id;
const { closeViewPush } = useRouteView();
const eventContext = useGlobalEventContext();

const { findAreaNameFromCode } = useAllAreaList({
  immediate: false,
});

const form = reactive({
  phoneNumber: '',
  initPassword: '',
  userName: '',
  userInfoEmailAddress: '',
  authType: '' as any as EnterpriseType,
  avatarUrl: [] as UploadUserFile[],
  contacter: '',
  genderType: '' as any as Gender,
  jobTitle: '',
  areaList: [] as number[],
  addressDetail: '',
  clientId: RoleClientType.RoleFrontendClientId,
  wxQrCodeUrl: [] as UploadUserFile[],
  enterpriseName: '',

  isCreateAccount: true,
  hasAuthType: false,
});

const rules = reactive<FormRules>({
  phoneNumber: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号'));
        } else if (!BoleRegExp.RegPhoneNumber.test(value)) {
          return callback(new Error('请输入正确的手机号'));
        }
        isRepeatByPhoneNumber().then((res) => {
          if (res) {
            return callback(new Error('该手机号已注册，请输入新手机号'));
          } else {
            if (form.isCreateAccount) {
              generateUserName().then((res) => {
                if (res) {
                  form.userName = res;
                  form.isCreateAccount = false;
                  return callback();
                } else {
                  return callback(new Error('生成账号失败'));
                }
              });
            }
            return callback();
          }
        });
      },
      trigger: 'blur',
    },
  ],
  userName: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入账号'));
        } else if (!MyRegExp.PasswordRegex.test(value)) {
          callback(new Error('账号应满足8-13位，并包含大写字母或小写字母或数字'));
        }
        callback();
      },
      trigger: 'blur',
    },
  ],
  userInfoEmailAddress: [
    {
      // required: true,
      validator: (rule, value, callback) => {
        if (!value) {
          return callback();
        } else if (!BoleRegExp.RegEmail.test(value)) {
          return callback(new Error('请输入正确的邮箱'));
        }
        isRepeatByBindEmail().then((res) => {
          if (res) {
            return callback(new Error('该邮箱已绑定其他账号，请输入新邮箱'));
          }
          return callback();
        });
      },
      trigger: 'blur',
    },
  ],
  initPassword: [
    { required: true, message: '请重新输入密码', trigger: 'blur' },
    {
      pattern: MyRegExp.PasswordRegexNoSymbol,
      message: '密码应满足6~16位，并包含大写字母、小写字母、数字其中的任意两种',
      trigger: 'blur',
    },
  ],
});

const { isLoading, data: detail } = useQuery({
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
    form.authType = data?.authType;
    form.enterpriseName = data?.customerName ?? '';
    form.avatarUrl = convertApi2FormUrlOnlyOne(data?.avatarUrl);
    form.contacter = data?.contacter ?? '';
    form.genderType = data?.genderType ?? Gender.Male;
    form.jobTitle = data?.jobTitle ?? '';
    form.areaList = [data?.provinceCode, data?.cityCode, data?.countyCode].filter(Boolean);
    form.addressDetail = data?.addressDetail ?? '';
    form.wxQrCodeUrl = convertApi2FormUrlOnlyOne(data?.wxQrCodeUrl);

    form.hasAuthType = !!data?.authType;
  },
  enabled: isEdit,
});

async function isRepeatByPhoneNumber() {
  try {
    let params: API.GenerateUserNameInput = {
      phoneNumber: form.phoneNumber,
    };
    let res = await accountServices.isRepeatByPhoneNumber(params);
    return res;
  } catch (error) {}
}
async function isRepeatByBindEmail() {
  try {
    let params: API.APIisRepeatByBindEmailParams = {
      bindEmail: form.userInfoEmailAddress,
    };
    let res = await accountServices.isRepeatByBindEmail(params);
    return res;
  } catch (error) {}
}
async function generateUserName() {
  try {
    let params: API.GenerateUserNameInput = {
      phoneNumber: form.phoneNumber,
    };
    let res = await accountServices.generateUserName(params);
    if (res) {
      form.userName = res;
    }
    return res;
  } catch (error) {}
}

function handleBack() {
  closeViewPush(route, {
    name: 'PlatformUser',
  });
}

const formRef = ref<FormInstance>();
const formRefAccount = ref<FormInstance>();
async function handleConfirm() {
  try {
    const valid = await validateFormList([formRef.value, formRefAccount.value]);
    if (valid) {
      if (isEdit) {
        updateUserInfo();
      } else {
        handleCreateUser();
      }
    }
  } catch (error) {}
}

async function handleCreateUser() {
  try {
    let params: API.CreateUserForAdminInput = {
      createAccountData: {
        name: form.contacter,
        userName: form.userName,
        phoneNumber: form.phoneNumber,
        clientId: form.clientId,
        enterpriseName: form.enterpriseName,
        authType: form.authType,
      } as API.CreateAccountInput,
      updateUserInfoData: {
        userInfoEmailAddress: form.userInfoEmailAddress,
        avatarUrl: form.avatarUrl[0]?.path ?? '',
        genderType: form.genderType,
        jobTitle: form.jobTitle,
        provinceCode: form.areaList[0],
        cityCode: form.areaList[1],
        countyCode: form.areaList[2],
        provinceName: findAreaNameFromCode(form.areaList[0]),
        cityName: findAreaNameFromCode(form.areaList[1]),
        countyName: findAreaNameFromCode(form.areaList[2]),
        addressDetail: form.addressDetail,
        wxQrCodeUrl: form.wxQrCodeUrl[0]?.path ?? '',
        enterpriseName: form.enterpriseName,
        contacter: form.contacter,
      } as API.UpdateUserInfoInput,
      initPassword: form.initPassword,
    };
    let res = await accountServices.createUserForAdmin(params);
    if (res) {
      Message.successMessage('保存成功');
      eventContext.emit('platformUser:add');
      handleBack();
    }
  } catch (error) {}
}
async function updateUserInfo() {
  try {
    let params: API.UpdateUserInfoInput = {
      id: id,
      avatarUrl: form.avatarUrl[0]?.path ?? '',
      contacter: form.contacter,
      enterpriseName: form.enterpriseName,
      genderType: form.genderType,
      jobTitle: form.jobTitle,
      provinceCode: form.areaList[0],
      cityCode: form.areaList[1],
      countyCode: form.areaList[2],
      provinceName: findAreaNameFromCode(form.areaList[0]),
      cityName: findAreaNameFromCode(form.areaList[1]),
      countyName: findAreaNameFromCode(form.areaList[2]),
      addressDetail: form.addressDetail,
      wxQrCodeUrl: form.wxQrCodeUrl[0]?.path ?? '',
    };
    let res = await userServices.updateUserInfo(params);
    if (res) {
      Message.successMessage('保存成功');
      eventContext.emit('platformUser:edit');
      handleBack();
    }
  } catch (error) {}
}
</script>

<style lang="scss">
@use '@/style/common.scss' as *;

.avatar-upload-wrapper {
  .avatar-upload {
    width: 100px;
    height: 100px;
  }

  .el-upload.el-upload--picture-card {
    width: 100px;
    height: 100px;
    border: none;
    background-color: transparent;
  }

  .el-upload-list__item {
    border: none;
  }
}

.avatar-form-item {
  .read-image-wrapper {
    border: none;
  }
}
</style>
