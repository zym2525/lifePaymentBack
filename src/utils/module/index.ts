import { TreeStore } from './tree';
import { searchTree } from '@/utils/common/searchTree';

export * from './tree';

export type TreeModuleDtoGroupDto = API.ModuleDto & {
  children?: TreeModuleDtoGroupDto[];
  parentNode?: TreeModuleDtoGroupDto;
};

export class ModuleUtils {
  static convertToModuleGroup(data: API.ModuleDto[]) {
    const moduleTreeStore = new TreeStore<TreeModuleDtoGroupDto>({
      data: TreeStore.formatListToTree(data, null),
    });
    moduleTreeStore.filterNodeMethod = (val, data) => {
      return data.name.indexOf(val) > -1;
    };
    return moduleTreeStore;
  }

  /**
   * 是否是根菜单模块
   * @param module
   */
  static isRootModule(module: TreeModuleDtoGroupDto) {
    return !module.parentId;
  }

  static getCheckedModule(treeModule: TreeModuleDtoGroupDto[]) {
    const checkedModuleId: string[] = [];
    treeModule.forEach((module) => {
      if (module.children && module.children.length > 0) {
        checkedModuleId.push(...this.getCheckedModule(module.children));
      } else {
        if (module.hasCheck) {
          checkedModuleId.push(module.id);
        }
      }
    });
    return checkedModuleId;
  }

  static getSiblingsModules(
    module: TreeModuleDtoGroupDto,
    rootModuleList: TreeModuleDtoGroupDto[]
  ) {
    const parent = module.parentNode;
    if (parent) {
      return parent.children;
    }
    return rootModuleList;
  }

  static getSortCode(
    moduleTreeStore: TreeStore<TreeModuleDtoGroupDto>,
    module?: TreeModuleDtoGroupDto
  ) {
    if (module) {
      const moduleTreeNode = moduleTreeStore.getNode(module.id);
      const siblingsNodes = moduleTreeNode.parent.childNodes;
      return siblingsNodes[siblingsNodes.length - 1].data.sortCode;
    } else {
      return moduleTreeStore.root.childNodes.length;
    }
  }

  static getLastChildSortCode(
    moduleTreeStore: TreeStore<TreeModuleDtoGroupDto>,
    module: TreeModuleDtoGroupDto
  ) {
    const moduleTreeNode = moduleTreeStore.getNode(module.id);
    const childNodes = moduleTreeNode.childNodes;
    const lastChildNode = childNodes[childNodes.length - 1];
    return lastChildNode ? lastChildNode.data.sortCode : 0;
  }

  static getParentModule(
    moduleTreeStore: TreeStore<TreeModuleDtoGroupDto>,
    module: TreeModuleDtoGroupDto
  ) {
    const moduleTreeNode = moduleTreeStore.getNode(module.id);
    return moduleTreeNode.parent.data;
  }

  static filterModuleTree(value: string, originModuleTreeStore: TreeModuleDtoGroupDto[]) {
    // moduleTreeStore.filter(value);
    const options = { children: 'children' };
    const searchProps = ['name'];
    // @ts-ignore
    return searchTree(
      originModuleTreeStore,
      (item: any) => searchProps.some((key) => item[key].indexOf(value) > -1),
      options
    );
  }
}
