<template>
  <LoadingLayout :loading="state.loading">
    <AppContainer>
      <ProTableV2 v-bind="proTableProps" :columns="column" :showOperationColumn="false">
      </ProTableV2>
    </AppContainer>
  </LoadingLayout>
</template>

<script setup lang="ts">
import { ProTableV2, LoadingLayout, AppContainer } from '@bole-core/components';
import { useAccess, useTableLogListByType } from '@/hooks';
import { OperateHistoryTypeEnum } from '@/constants';

defineOptions({
  name: 'LogListViewByType',
});

type Props = {
  operateHistoryType?: OperateHistoryTypeEnum;
};

const props = withDefaults(defineProps<Props>(), {});

const { column } = useAccess();

const route = useRoute();
const relationId = route.params.id as string;

onMounted(async () => {
  await getList();
  state.loading = false;
});

const { getList, proTableProps, state } = useTableLogListByType({
  relationId,
  operateHistoryType: toRef(props, 'operateHistoryType'),
});
</script>
