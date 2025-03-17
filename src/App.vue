<template>
  <Provide :config="Config">
    <el-config-provider :locale="currentLocale" value-on-clear="">
      <BoleProvider :uploadRequest="uploadRequest" :defaultUploadDirectory="OssCommon">
        <router-view />
      </BoleProvider>
    </el-config-provider>
  </Provide>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import Provide from '@/components/Provide/Provide.vue';
import Config from '@config/config';
import { useResizeHander, useGlobalEventProvide } from '@/hooks';
import { Provider as BoleProvider } from '@bole-core/components';
import { OssCommon } from '@/constants';
import { uploadRequest } from '@/utils';

defineOptions({
  name: 'App',
});

const currentLocale = computed(() => zhCn);

useResizeHander();
useGlobalEventProvide();
</script>
