<template>
  <ProDialog title="配置保险产品" v-model="innerVisible" destroy-on-close width="900px">
    <el-scrollbar max-height="400px">
      <el-collapse
        v-model="activeNames"
        @change="handleChange"
        class="configure-insure-product-dialog-collapse"
      >
        <el-collapse-item title="已授权产品" name="Authorized">
          <ConfigureInsureProductItem
            v-for="item in productList.hasAuthList"
            :key="item.productId"
            :productName="item.productName"
            :schemeTypeCount="item.schemeTypeCount"
            :schemeName="item.schemeName"
            isAuthed
            :beforeChange="() => beforeChange(item.productId, true)"
          />
        </el-collapse-item>
        <el-collapse-item title="未授权产品" name="Unauthorized">
          <ConfigureInsureProductItem
            v-for="item in productList.notAuthList"
            :key="item.productId"
            :productName="item.productName"
            :schemeTypeCount="item.schemeTypeCount"
            :schemeName="item.schemeName"
            :isAuthed="false"
            :beforeChange="() => beforeChange(item.productId, false)"
          />
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('onCancel')">取 消</el-button>
        <el-button type="primary" @click="emit('onCancel')">确 定</el-button>
      </span>
    </template>
  </ProDialog>
</template>

<script setup lang="ts">
import { ProDialog } from '@bole-core/components';
import { FormInstance } from 'element-plus';
import * as insureMarketProductServices from '@/services/api/InsureMarketProduct';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import ConfigureInsureProductItem from './ConfigureInsureProductItem.vue';

defineOptions({
  name: 'ConfigureInsureProductDialog',
});

type Props = {
  modelValue: boolean;
  form?: {
    id: string;
  };
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

const id = computed(() => props.form?.id);

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'onCancel'): void;
  (e: 'onSelect', value: API.HelpQuestionDto[]): void;
}>();

const innerVisible = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

const {
  data: productList,
  isLoading,
  refetch,
} = useQuery({
  queryKey: ['insureMarketProductServices/getUserCanAuthProductList', id],
  queryFn: async () => {
    return await insureMarketProductServices.getUserCanAuthProductList(
      { companyId: id.value },
      {
        showLoading: false,
      }
    );
  },
  placeholderData: () =>
    ({
      hasAuthList: [],
      notAuthList: [],
    } as API.GetCanAuthMarkProductOutput),
  enabled: computed(() => !!id.value),
});

const activeNames = ref();

function handleChange(val: string[]) {}

async function beforeChange(productId: string, isAuthed: boolean) {
  try {
    let params: API.InsureMarketProductToAuthInput = {
      companyId: id.value,
      authProductIds: isAuthed
        ? productList.value.hasAuthList
            .filter((x) => x.productId !== productId)
            .map((x) => x.productId)
        : [...productList.value.hasAuthList.map((x) => x.productId), productId],
    };
    let res = await insureMarketProductServices.insureMarketProductToAuth(params);
    if (res) {
      refetch({
        type: 'inactive',
      });
    }
    return !!res;
  } catch (error) {}
}

const formRef = ref<FormInstance>();
function handleConfirm() {
  if (!formRef.value) return;
  formRef.value.validate((valid) => {
    if (valid) {
      //   handleCreateOrUpdate();
    } else {
      return;
    }
  });
}
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.configure-insure-product-dialog-collapse {
  --bole-pro-form-input-height: 20px;

  :deep() {
    .el-collapse-item__header {
      font-size: 14px;
      font-weight: bold;

      &::before {
        margin-right: 8px;
        width: 2px;
        height: 14px;
        background-color: getCssVar('color', 'primary');
        content: '';
      }
    }
  }
}
</style>
<style lang="scss">
.text-over-tooltip-content {
  max-width: 600px;
}
</style>
