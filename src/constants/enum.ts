export enum AreaType {
  /**
   * 省
   */
  Province = 1,
  /**
   * 市
   */
  City,
  /**
   * 区
   */
  Area,
  /**
   * 城镇
   */
  Town,
}

export const Colors = {
  Success: 'var(--el-color-success)',
  Warning: 'var(--el-color-warning)',
  Danger: 'var(--el-color-danger)',
};

export const BooleanOptions = [
  { label: '是', value: true },
  { label: '否', value: false },
];
export const BooleanPayOptions = [
  { label: '已付费', value: true },
  { label: '未付费', value: false },
];

export enum OperateHistoryTypeEnum {
  /**
   * 认证用户日志
   */
  CertifiedUser = 10,
  /**
   * 平台用户日志
   */
  PlatformUser = 11,
  /**
   * 用户认证审核日志
   */
  UserCertificationAudit = 12,
  /**
   * 公告日志
   */
  SystemNotice = 13,
  /**
   * 资讯管理日志
   */
  InformationForManage = 14,
  /**
   * 资讯审核日志
   */
  InformationWaitForCheck = 15,
  /**
   * 开户管理日志
   */
  WalletAccountOpen = 16,
  /**
   * 转账审核对单日志
   */
  alletSingleTransfer = 17,
  /**
   * 充值审核
   */
  WalletRecharge = 18,
  /**
   * 账户管理
   */
  AccountManage = 19,
  /**
   * 认证管理
   */
  UserCertificationManage = 20,
  /**
   * 批量转账审核日志
   */
  AuditWalletBatchTransfer = 21,
  /**
   * 行业机构审核日志
   */
  IndustryBodyAudit = 22,
  /**
   * 行业配套审核日志
   */
  IndustryMatingAudit = 23,
  /**
   * 甲方企业审核日志
   */
  FirstPartyCompanyAudit = 24,
  /**
   * 人资公司审核日志
   */
  ParkOrHRAudit = 25,
  /**
   * 行业机构管理日志
   */
  IndustryBodyManage = 26,
  /**
   * 行业配套管理日志
   */
  IndustryMatingManage = 27,
  /**
   * 甲方企业管理日志
   */
  FirstPartyCompanyManage = 28,
  /**
   * 人资公司管理日志
   */
  ParkOrHRManage = 29,
  /**
   * 客户管理日志
   */
  CustomerManage = 30,
  /**
   * 奖励配置日志
   */
  ParkRewardManage = 31,
  /**
   * 客户模板操作日志
   */
  CustomerContractTemplate = 32,
  /**
   * 生活缴费(退款)
   */
  LifePayOrder = 40,
  LifePayChannles = 42,
}

// 数据可见范围
export enum DataRangeEnum {
  /**
   * 全部数据
   */
  All = 100,
  /**
   * 个人数据
   */
  Person = 10,
}

export const DataRangeEnumText = {
  [DataRangeEnum.All]: '全部数据',
  [DataRangeEnum.Person]: '个人数据',
};
