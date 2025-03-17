declare namespace API {
  interface RequestConfig extends GlobalType.RequestConfig {
    needNProcess?: boolean;
    showLoading?: boolean;
    /**
     * 是否获取原始的AxiosResponse
     */
    getResponse?: boolean;
    /**
     * 跳过默认错误处理
     */
    skipErrorHandler?: boolean;
    mock?: boolean;
    customErrorHandler?: (error: any) => boolean;
  }

  interface ModuleButtonDto {
    isEdit?: boolean;
  }

  interface ModuleColumnDto {
    isEdit?: boolean;
    fixed?: boolean | 'left' | 'right';
    needTips?: boolean;
  }

  interface CustomModuleColumnDto extends ModuleColumnDto {
    id: string;
    enCode: string;
    name: string;
  }

  interface DepartmentTree {
    leaf?: boolean;
  }
  interface StationTree {
    leaf?: boolean;
  }

  interface RoleList {
    //是否是客户端
    isClient?: boolean;
  }

  interface AreaTreeNode extends AreaDto {
    children?: AreaTreeNode[];
  }
  interface GetSearchSettingList {
    children?: GetSearchSettingList[];
  }
}
