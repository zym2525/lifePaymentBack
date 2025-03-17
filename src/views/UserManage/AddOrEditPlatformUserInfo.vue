<template>
  <AppScrollContainer>
    <ProTabs v-if="isEdit" v-model="state.tabType" hasBorder :contentFlex="false">
      <ProTabPane
        lazy
        :label="PlatformUserTabTypeText[PlatformUserTabType.Info]"
        :name="PlatformUserTabType.Info"
      >
        <AddOrEditPlatformUserView />
      </ProTabPane>
      <ProTabPane
        lazy
        :label="PlatformUserTabTypeText[PlatformUserTabType.Account]"
        :name="PlatformUserTabType.Account"
      >
        <AddOrEditPlatformAccount />
      </ProTabPane>
    </ProTabs>
    <AddOrEditPlatformUserView v-else />
  </AppScrollContainer>
</template>

<script setup lang="ts">
import { AppScrollContainer, AppContainer, ProTabs, ProTabPane } from '@bole-core/components';
import AddOrEditPlatformUserView from './components/AddOrEditPlatformUserView.vue';
import AddOrEditPlatformAccount from './components/AddOrEditPlatformAccount.vue';

defineOptions({
  name: 'AddOrEditPlatformUserInfo',
});

const route = useRoute();
const id = route.params.id as string;
const isEdit = !!id;

enum PlatformUserTabType {
  Info = 10,
  Account = 20,
}

const PlatformUserTabTypeText = {
  [PlatformUserTabType.Info]: '用户信息编辑',
  [PlatformUserTabType.Account]: '账号编辑',
};

const state = reactive({ tabType: PlatformUserTabType.Info });
</script>
<style lang="scss" scoped>
.el-tabs--top {
  flex-direction: column;
}
</style>
