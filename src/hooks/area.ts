import { useAreaStore } from '@/store/modules/area';
import { AreaType } from '@/constants';
import { CascaderProps } from 'element-plus';
import { splitAreaTree } from '@/utils';

/**
 * 获取完整的地区数据树
 */
export function useCompleteArea() {
  const useArea = useAreaStore();
  const { completeAreaTree } = storeToRefs(useArea);

  onMounted(() => {
    useArea.getCompleteAreaTree();
  });

  const areaTreeProps = {
    children: 'children',
    label: 'areaName',
    value: 'areaCode',
  };

  return {
    areaTree: completeAreaTree,
    areaTreeProps,
    getAreaTree: useArea.getCompleteAreaTree,
    getAreaNameByAreaCodeWithParentName: useArea.getAreaNameByAreaCodeWithParentName,
  };
}

type UseAreaByCascaderOptions = {
  layer?: AreaType;
};

/**
 * @description 联级选择中使用
 */
export function useAreaByCascader(options: UseAreaByCascaderOptions = {}) {
  const { layer = AreaType.Area } = options;

  const areaStore = useAreaStore();

  // const { completeAreaList } = storeToRefs(areaStore);

  // onMounted(() => {
  //   areaStore.getCompleteAreaTree();
  // });

  return computed(() => ({
    // options: layer
    //   ? (formatAreaListToTree(completeAreaList.value, 0, layer) as any[])
    //   : completeAreaTree.value,
    // props: {
    //   label: 'areaName',
    //   value: 'areaCode',
    // },
    props: {
      label: 'areaName',
      value: 'areaCode',
      lazy: true,
      async lazyLoad(node, resolve) {
        const { level, data } = node;
        const completeAreaList = await areaStore.getCompleteAreaTree();
        let areas = completeAreaList.filter((x) =>
          level ? x.parentCode === data.areaCode : !x.parentCode
        );
        return resolve(
          areas.map((x) => ({
            ...x,
            leaf: x.layer >= layer,
          }))
        );
      },
    } as CascaderProps,
  }));
}

export type UseAllAreaListOptions = {
  immediate?: boolean;
};

export function useAllAreaList(options: UseAllAreaListOptions = {}) {
  const { immediate = true } = options;
  const areaStore = useAreaStore();

  onMounted(() => {
    if (immediate) {
      areaStore.getCompleteAreaTree();
    }
  });

  const findAreaCodeFromName = (areaName: string) => {
    const areaItem = areaStore.completeAreaList.find((x) => x.areaName === areaName);
    return areaItem?.areaCode ?? 0;
  };

  const findAreaNameFromCode = (areaCode: number) => {
    const areaItem = areaStore.completeAreaList.find((x) => x.areaCode === areaCode);
    return areaItem?.areaName ?? '';
  };

  const findAreaItemFromCode = (areaCode: number) => {
    const areaItem = areaStore.completeAreaList.find((x) => x.areaCode === areaCode);
    return areaItem;
  };

  return {
    findAreaCodeFromName,
    findAreaNameFromCode,
    findAreaItemFromCode,
  };
}

export function useProvinceList() {
  const areaStore = useAreaStore();

  const { provinceList } = storeToRefs(areaStore);

  onMounted(() => {
    areaStore.getCompleteAreaTree();
  });

  return {
    provinceList,
  };
}

type UseAreaByTreeSelectOptions = {
  maxLevel?: number;
};

export function useAreaByTreeSelect(options: UseAreaByTreeSelectOptions = {}) {
  const { maxLevel = 2 } = options;
  const useArea = useAreaStore();
  const { completeAreaTree } = storeToRefs(useArea);

  onMounted(() => {
    useArea.getCompleteAreaTree();
  });

  const areaTree = computed(() => splitAreaTree(completeAreaTree.value, maxLevel));

  const treeSelectProps = computed(() => ({
    data: areaTree.value,
    props: {
      label: 'areaName',
      children: 'children',
      isLeaf: 'leaf',
    },
    renderAfterExpand: false,
    valueKey: 'areaCode',
  }));

  return {
    treeSelectProps: treeSelectProps,
    areaTree,
  };
}

export function useAreaSelect(provinceId: Ref<number>, cityId: Ref<number>, countyId: Ref<number>) {
  const useArea = useAreaStore();
  const { completeAreaList } = storeToRefs(useArea);

  const { provinceList } = useProvinceList();

  watch(provinceId, async () => {
    await nextTick();
    if (cityList.value.every((city) => city.areaCode !== cityId.value)) {
      cityId.value = '' as any as number;
    }
  });

  watch(cityId, async () => {
    await nextTick();
    if (countyList.value.every((area) => area.areaCode !== countyId.value)) {
      countyId.value = '' as any as number;
    }
  });

  const cityList = computed(() =>
    completeAreaList.value.filter((x) => x.parentCode === provinceId.value)
  );
  const countyList = computed(() =>
    completeAreaList.value.filter((x) => x.parentCode === cityId.value)
  );

  return {
    provinceList: provinceList,
    cityList: cityList,
    countyList: countyList,
  };
}
