import { store } from '@/store';
import { defineStore } from 'pinia';
import { formatAreaListToTree } from '@/utils';
import * as areaServices from '@/services/api/Area';

export interface AreaState {
  /**
   * 完整的地区数据树
   */
  completeAreaTree: API.AreaTreeNode[];
  /**
   * 打平的完整的地区
   */
  completeAreaList: API.AreaDto[];
  completeAreaTreeDone: boolean;
  /**
   * 多个select分步获取地区数据
   */
  provinceList: API.AreaDto[];
  /**
   * 储存areaCode下面的子集
   */
  areaMap: Record<API.AreaDto['areaCode'], API.AreaDto[]>;
  /**
   * 根据areaCode储存单个area数据
   */
  areaItemMap: Record<API.AreaDto['areaCode'], API.AreaDto>;
}

export const useAreaStore = defineStore({
  id: 'area',
  state: (): AreaState => ({
    completeAreaTree: [],
    completeAreaTreeDone: false,
    completeAreaList: [],
    //----------------------------------
    provinceList: [],
    areaMap: {},
    areaItemMap: {},
  }),
  getters: {
    getAreaFromCompleteAreaList(state) {
      return (areaCode: number) => state.completeAreaList.find((x) => x.areaCode === areaCode);
    },
    getAreaByAreaCode(state) {
      return (areaCode: number) => state.areaItemMap[areaCode];
    },
    getAreaNameByAreaCode() {
      return (areaCode: number) => {
        const area = this.getAreaByAreaCode(areaCode);
        return area ? area.areaName : '';
      };
    },
    getAreaNameByAreaCodeWithParentName() {
      return (areaCode: number) => {
        const area = this.getAreaByAreaCode(areaCode);
        if (area?.parentCode) {
          const parent = this.getAreaByAreaCode(area.parentCode);
          return parent ? `${parent.areaName}${area.areaName}` : '';
        } else {
          return area ? area.areaName : '';
        }
      };
    },
  },

  actions: {
    async getCompleteAreaTree() {
      try {
        if (!this.completeAreaList.length) {
          const res = await areaServices.getAreaList({
            showLoading: false,
          });
          this.completeAreaTreeDone = true;
          const completeAreaList = res;
          this.completeAreaTree = formatAreaListToTree(completeAreaList, 0);
          this.completeAreaList = completeAreaList;
          this.provinceList = res.filter((x) => !x.parentCode);
          this.setAreaMap(res);
        }
        return this.completeAreaList;
      } catch (error) {
        throw error;
      }
    },

    setAreaMap(areaList: API.AreaDto[]) {
      areaList.forEach((item) => {
        this.areaItemMap[item.areaCode] = item;
      });
    },
  },
});

export function useAreaStoreHook() {
  return useAreaStore(store);
}
