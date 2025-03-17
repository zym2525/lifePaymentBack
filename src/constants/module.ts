export enum SubModuleType {
  MenuButton = 1,
  /**
   * 页面按钮
   */
  PageButton,
  /**
   * 数据按钮
   */
  DataButton,
  /**
   * 数据列
   */
  Column,
}

export const SubModuleTitle = {
  [SubModuleType.PageButton]: '页面按钮',
  [SubModuleType.DataButton]: '数据按钮',
  [SubModuleType.Column]: '数据列',
};

export const SubModuleKey = {
  [SubModuleType.PageButton]: 'pageButton',
  [SubModuleType.DataButton]: 'dataButton',
  [SubModuleType.Column]: 'column',
};

export type FastBtn = {
  enCode?: string;
  name?: string;
  width?: number;
};

/**
 * 可快速添加的页面按钮
 */
export const FastPageButtonList: Array<FastBtn> = [
  {
    enCode: 'addBtn',
    name: '新增',
  },
  {
    enCode: 'controlColumnBtn',
    name: '显示列',
  },
  {
    enCode: 'exportBtn',
    name: '导出',
  },
  {
    enCode: 'importBtn',
    name: '导入',
  },
];

/**
 * 可快速添加的数据按钮
 */
export const FastDataButtonList: Array<FastBtn> = [
  {
    enCode: 'editBtn',
    name: '编辑',
  },
  {
    enCode: 'delBtn',
    name: '删除',
  },
];

/**
 * 可快速添加的数据列
 */
export const FastColumnList: Array<FastBtn> = [
  {
    enCode: 'name',
    name: '名称',
    width: 200,
  },
  {
    enCode: 'note',
    name: '备注',
    width: 200,
  },
];

export const FastButtonMap: { [key: number]: Array<FastBtn> } = {
  [SubModuleType.PageButton]: FastPageButtonList,
  [SubModuleType.DataButton]: FastDataButtonList,
  [SubModuleType.Column]: FastColumnList,
};

export const ModuleColumns: API.CustomModuleColumnDto[] = [
  {
    id: '1',
    enCode: 'name',
    name: '名称',
    width: 180,
  },
  {
    id: '2',
    enCode: 'enCode',
    name: '编号',
  },
  {
    id: '3',
    enCode: 'sortCode',
    name: '排序',
    width: 80,
  },
  {
    id: '4',
    enCode: 'path',
    name: '路由地址',
  },
  {
    id: '5',
    enCode: 'isCache',
    name: '缓存',
    width: 80,
  },
  {
    id: '6',
    enCode: 'isMenu',
    name: '菜单',
    width: 80,
  },
  {
    id: '7',
    enCode: 'enabledMark',
    name: '有效',
    width: 80,
  },
];
