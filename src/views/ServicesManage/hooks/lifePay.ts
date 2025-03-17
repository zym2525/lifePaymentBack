import * as lifePayServices from '@/services/api/LifePay';
import { useQuery } from '@tanstack/vue-query';
import { LifePayRateTypeEnum } from '@/constants';

export const DefaultSupplierRate = 94;

type UseLifePayRateOptions = {
  onSuccess?: (data: API.LifePayRateListOutput[]) => any;
};

export function useLifePayRate(options: UseLifePayRateOptions = {}) {
  const { onSuccess } = options;

  const {
    data: rateList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['lifePayServices/getRate'],
    queryFn: async () => {
      return await lifePayServices.getRate({
        showLoading: false,
      });
    },
    placeholderData: () => [] as API.LifePayRateListOutput[],
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

  const supplierRate = computed(() => {
    return (
      rateList.value.find((item) => item.rateType === LifePayRateTypeEnum.供应商折扣价)?.rate ??
      DefaultSupplierRate
    );
  });

  return {
    rateList,
    isLoading,
    refetch,
    supplierRate,
  };
}
