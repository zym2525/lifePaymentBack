export enum LifePayOrderTypeEnum {
  /**
   * 话费订单
   */
  Phone = 10,
  /**
   * 电费订单
   */
  Electric = 20,
  /**
   * 燃气订单
   */
  Gas = 30,
}

export const LifePayOrderTypeEnumText = {
  [LifePayOrderTypeEnum.Phone]: '话费',
  [LifePayOrderTypeEnum.Electric]: '电费',
  [LifePayOrderTypeEnum.Gas]: '燃气费',
};

export enum LifePayStatusEnum {
  /**
   * 未支付
   */
  NotPay = 10,
  /**
   * 已支付
   */
  Paied = 20,
  /**
   * 待退款
   */
  WaitRefund = 30,
  /**
   * 已退款
   */
  Refunded = 40,
}

export const LifePayStatusEnumText = {
  //   [LifePayStatusEnum.NotPay]: '未支付',
  [LifePayStatusEnum.Paied]: '已支付',
  [LifePayStatusEnum.WaitRefund]: '待退款',
  [LifePayStatusEnum.Refunded]: '已退款',
};

export enum LifePayOrderStatusEnum {
  /**
   * 待确认
   */
  WaitConfirm = 10,
  /**
   * 已失败
   */
  Failed = 20,
  /**
   * 已完成
   */
  Completed = 30,
  /**退款待审核 */
  RefundWaitAudit = 40,
  /**已退款 */
  Refunded = 50,
  /**退款失败 */
  RefundFail = 60,
}

export const LifePayOrderStatusEnumText = {
  [LifePayOrderStatusEnum.WaitConfirm]: '待确认',
  [LifePayOrderStatusEnum.Failed]: '已失败',
  [LifePayOrderStatusEnum.Completed]: '已完成',
  [LifePayOrderStatusEnum.RefundWaitAudit]: '退款待审核',
  [LifePayOrderStatusEnum.Refunded]: '已退款',
  [LifePayOrderStatusEnum.RefundFail]: '退款失败',
};

export enum LifePayRateTypeEnum {
  默认话费折扣 = 10,

  默认电费折扣 = 20,

  默认燃气折扣 = 30,

  供应商折扣价 = 40,
}

export enum LifePaySwitchTypeEnum {
  H5 = 10,

  微信小程序 = 20,
  微信公众号 = 30,
}

export const LifePaySwitchTypeEnumText = {
  [LifePaySwitchTypeEnum.H5]: 'H5',
  [LifePaySwitchTypeEnum.微信小程序]: '微信小程序',
  [LifePaySwitchTypeEnum.微信公众号]: '微信公众号',
};

export enum LifePayChannelsStatsEnum {
  启用 = 10,

  禁用 = 20,
}

export const LifePayChannelsStatsEnumText = {
  [LifePayChannelsStatsEnum.启用]: '启用',
  [LifePayChannelsStatsEnum.禁用]: '禁用',
};

export enum LifePayChannlesTypeEnum {
  内部渠道 = 10,

  外部渠道 = 20,
}

export const LifePayChannlesTypeEnumText = {
  [LifePayChannlesTypeEnum.内部渠道]: '内部渠道',
  [LifePayChannlesTypeEnum.外部渠道]: '外部渠道',
};

export enum LifePayTypeEnum {
  /**微信支付 */
  WxPay = 10,

  /**支付宝支付 */
  AliPay = 20,
}

export const LifePayTypeEnumText = {
  [LifePayTypeEnum.WxPay]: '微信',
  [LifePayTypeEnum.AliPay]: '支付宝',
};

export enum LifePayRefundAuditStatus {
  /**通过 */
  Pass = 10,
  /**驳回 */
  Reject = 20,
}

export const LifePayRefundAuditStatusText = {
  [LifePayRefundAuditStatus.Pass]: '通过',
  [LifePayRefundAuditStatus.Reject]: '驳回',
};
