<template>
  <LogListViewByType :operateHistoryType="OperateHistoryTypeEnum.PlatformUser"> </LogListViewByType>
</template>

<script setup lang="ts">
import LogListViewByType from '@/components/LogLIst/LogListViewByType.vue';
import { OperateHistoryTypeEnum } from '@/constants';

defineOptions({
  name: 'PlatformUserLog',
});
</script>
