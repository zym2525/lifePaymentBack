import { AreaType } from '@/constants';
import _ from 'lodash';

export interface AreaTreeNode extends API.AreaDto {
  children?: AreaTreeNode[];
}

export function formatAreaListToTree(
  areaDataList: API.AreaDto[],
  parentId: number,
  maxLayer = AreaType.Area
) {
  const treeNodeList: API.AreaTreeNode[] = [];
  if (areaDataList.length > 0) {
    areaDataList.forEach((areaData) => {
      const areaTreeNode: API.AreaTreeNode = { ...areaData };
      if (areaData.parentCode === parentId && areaData.layer <= maxLayer) {
        const children = formatAreaListToTree(areaDataList, areaData.areaCode, maxLayer);
        areaTreeNode.children = children;
        treeNodeList.push(areaTreeNode);
      }
    });
  }
  return treeNodeList;
}

export function splitAreaTree(areaDataList: API.AreaTreeNode[], limit = 2, level = 1) {
  const treeNodeList: API.AreaTreeNode[] = [];
  if (areaDataList.length > 0) {
    areaDataList.forEach((areaData) => {
      const areaTreeNode: API.AreaTreeNode = _.omit(areaData, 'children');
      if (level < limit) {
        areaTreeNode.children = splitAreaTree(areaData.children, limit, level + 1);
      }
      treeNodeList.push(areaTreeNode);
    });
  }
  return treeNodeList;
}
