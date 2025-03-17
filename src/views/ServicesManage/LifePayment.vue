<template>
  <AppContainer>
    <ProTabs v-model="state.tabType" hasBorder>
      <ProTabPane lazy label="用户管理" :name="LifePaymentTabType.User">
        <LifePaymentUserManageView />
      </ProTabPane>
      <ProTabPane lazy label="订单管理" :name="LifePaymentTabType.Order">
        <LifePaymentOrderManageView />
      </ProTabPane>
      <ProTabPane lazy label="折扣配置" :name="LifePaymentTabType.Rate">
        <LifePaymentRateManageView />
      </ProTabPane>
      <ProTabPane lazy label="渠道管理" :name="LifePaymentTabType.Channel">
        <LifePaymentChannelManageView />
      </ProTabPane>
    </ProTabs>
  </AppContainer>
</template>

<script setup lang="ts">
import { AppContainer, ProTabs, ProTabPane } from '@bole-core/components';
import LifePaymentOrderManageView from './components/LifePaymentOrderManageView.vue';
import LifePaymentUserManageView from './components/LifePaymentUserManageView.vue';
import LifePaymentRateManageView from './components/LifePaymentRateManageView.vue';
import LifePaymentChannelManageView from './components/LifePaymentChannelManageView.vue';

defineOptions({
  name: 'LifePayment',
});

enum LifePaymentTabType {
  User = 1,
  Order = 2,
  Rate = 3,
  Channel = 4,
}

const state = reactive({
  tabType: LifePaymentTabType.User,
});
</script>
