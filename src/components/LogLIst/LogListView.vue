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
import { useAccess, useTableLogList } from '@/hooks';

defineOptions({
  name: 'LogListView',
});

const { column } = useAccess();

const route = useRoute();
const relationId = route.params.id as string;
const operateType = Number(route.query.operateType as string);

onMounted(async () => {
  await getList();
  state.loading = false;
});

const { getList, proTableProps, state } = useTableLogList({ relationId, operateType });
</script>
