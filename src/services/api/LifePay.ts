/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 添加或修改我的户号 POST /api/LifePay/AddUpdateUserAccount */
export async function addUpdateUserAccount(
  body: API.AddUpdateUserAccountInput,
  options?: API.RequestConfig
) {
  return request<number>('/api/LifePay/AddUpdateUserAccount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 折扣配置 POST /api/LifePay/CreateEditLifePayRate */
export async function createEditLifePayRate(
  body: API.LifePayRateInput[],
  options?: API.RequestConfig
) {
  return request<number>('/api/LifePay/CreateEditLifePayRate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 渠道管理 POST /api/LifePay/CreateEditPayChannels */
export async function createEditPayChannels(
  body: API.CreateEditPayChannelsInput,
  options?: API.RequestConfig
) {
  return request<number>('/api/LifePay/CreateEditPayChannels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建生活缴费电费订单 POST /api/LifePay/CreateLifePayElectricOrder */
export async function createLifePayElectricOrder(
  body: API.LifeElectricDataCreateLifePayOrderInput,
  options?: API.RequestConfig
) {
  return request<API.CreateLifePayOrderOutput>('/api/LifePay/CreateLifePayElectricOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建生活缴费燃气订单 POST /api/LifePay/CreateLifePayGasOrder */
export async function createLifePayGasOrder(
  body: API.LifeGasDataCreateLifePayOrderInput,
  options?: API.RequestConfig
) {
  return request<API.CreateLifePayOrderOutput>('/api/LifePay/CreateLifePayGasOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建生活缴费话费订单 POST /api/LifePay/CreateLifePayPhoneOrder */
export async function createLifePayPhoneOrder(
  body: API.LifePhoneDataCreateLifePayOrderInput,
  options?: API.RequestConfig
) {
  return request<API.CreateLifePayOrderOutput>('/api/LifePay/CreateLifePayPhoneOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除我的户号 POST /api/LifePay/DeleteUserAccount */
export async function deleteUserAccount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIdeleteUserAccountParams,
  options?: API.RequestConfig
) {
  return request<number>('/api/LifePay/DeleteUserAccount', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户户号分页数据 POST /api/LifePay/GetAccountPage */
export async function getAccountPage(
  body: API.QueryUserAccountListInput,
  options?: API.RequestConfig
) {
  return request<API.UserAccountOutputPageOutput>('/api/LifePay/GetAccountPage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取电费面值 POST /api/LifePay/GetElectricParValue */
export async function getElectricParValue(
  body: API.ChannelsBaseInput,
  options?: API.RequestConfig
) {
  return request<API.ElectricParValueResponse>('/api/LifePay/GetElectricParValue', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取电费充值区域 POST /api/LifePay/GetElectricSupportArea */
export async function getElectricSupportArea(
  body: API.ChannelsBaseInput,
  options?: API.RequestConfig
) {
  return request<API.ElectricSupportAreaResponse>('/api/LifePay/GetElectricSupportArea', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取燃气支持商户 POST /api/LifePay/GetGasOrgType */
export async function getGasOrgType(body: API.ChannelsBaseInput, options?: API.RequestConfig) {
  return request<API.GasOrgTypeValueResponse>('/api/LifePay/GetGasOrgType', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取燃气面值 POST /api/LifePay/GetGasParValue */
export async function getGasParValue(body: API.ChannelsBaseInput, options?: API.RequestConfig) {
  return request<API.GasParValueResponse>('/api/LifePay/GetGasParValue', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取渠道详情 GET /api/LifePay/GetLifePayChannlesDto */
export async function getLifePayChannlesDto(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetLifePayChannlesDtoParams,
  options?: API.RequestConfig
) {
  return request<API.CreateEditPayChannelsInput>('/api/LifePay/GetLifePayChannlesDto', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取缴费渠道列表 POST /api/LifePay/GetLifePayChannlesPage */
export async function getLifePayChannlesPage(body: API.PageInput, options?: API.RequestConfig) {
  return request<API.CreateEditPayChannelsInputPageOutput>('/api/LifePay/GetLifePayChannlesPage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取订单分页数据 POST /api/LifePay/GetLifePayOrderPage */
export async function getLifePayOrderPage(
  body: API.QueryLifePayOrderListInput,
  options?: API.RequestConfig
) {
  return request<API.LifePayOrderListOutputPageOutput>('/api/LifePay/GetLifePayOrderPage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出订单Excel POST /api/LifePay/GetLifePayOrderPageExport */
export async function getLifePayOrderPageExport(
  body: API.QueryLifePayOrderListInput,
  options?: API.RequestConfig
) {
  return request<any>('/api/LifePay/GetLifePayOrderPageExport', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取微信支付的JSAPI POST /api/LifePay/GetPayOrderForJsAPI */
export async function getPayOrderForJsAPI(
  body: API.GetPayOrderForJsAPIInput,
  options?: API.RequestConfig
) {
  return request<API.ModelPaymentMiniPay>('/api/LifePay/GetPayOrderForJsAPI', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据订单号获取支付状态 POST /api/LifePay/GetPayStatusByOrderNo */
export async function getPayStatusByOrderNo(
  body: API.GetPayStatusByOrderNoInput,
  options?: API.RequestConfig
) {
  return request<API.LifePayStatusEnum>('/api/LifePay/GetPayStatusByOrderNo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取话费面值 POST /api/LifePay/GetPhoneParValue */
export async function getPhoneParValue(body: API.ChannelsBaseInput, options?: API.RequestConfig) {
  return request<API.PhoneParValueResponse>('/api/LifePay/GetPhoneParValue', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取折扣 GET /api/LifePay/GetRate */
export async function getRate(options?: API.RequestConfig) {
  return request<API.LifePayRateListOutput[]>('/api/LifePay/GetRate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取我的全部户号列表 POST /api/LifePay/GetUserAccountAllList */
export async function getUserAccountAllList(
  body: API.QueryUserAccountAllListInput,
  options?: API.RequestConfig
) {
  return request<API.UserAccountOutput[]>('/api/LifePay/GetUserAccountAllList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取我的户号详情 GET /api/LifePay/GetUserAccountDetail */
export async function getUserAccountDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetUserAccountDetailParams,
  options?: API.RequestConfig
) {
  return request<API.UserAccountOutput>('/api/LifePay/GetUserAccountDetail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取我的户号列表 POST /api/LifePay/GetUserAccountList */
export async function getUserAccountList(
  body: API.QueryUserAccountListInput,
  options?: API.RequestConfig
) {
  return request<API.UserAccountOutputPageOutput>('/api/LifePay/GetUserAccountList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取我的订单详情 GET /api/LifePay/GetUserLifePayOrderDetail */
export async function getUserLifePayOrderDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetUserLifePayOrderDetailParams,
  options?: API.RequestConfig
) {
  return request<API.UserLifePayOrderOutput>('/api/LifePay/GetUserLifePayOrderDetail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取我的订单分页数据 POST /api/LifePay/GetUserLifePayOrderPage */
export async function getUserLifePayOrderPage(
  body: API.QueryLifePayOrderListInput,
  options?: API.RequestConfig
) {
  return request<API.UserLifePayOrderOutputPageOutput>('/api/LifePay/GetUserLifePayOrderPage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户查看生活缴费退款失败详情 GET /api/LifePay/GetUserLifePayOrderRefund */
export async function getUserLifePayOrderRefund(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetUserLifePayOrderRefundParams,
  options?: API.RequestConfig
) {
  return request<API.UserLifePayOrderRefundOutput>('/api/LifePay/GetUserLifePayOrderRefund', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户分页数据 POST /api/LifePay/GetUserPage */
export async function getUserPage(body: API.PageInput, options?: API.RequestConfig) {
  return request<API.UserListOutputPageOutput>('/api/LifePay/GetUserPage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退款生活缴费订单 POST /api/LifePay/RefundLifePayOrder */
export async function refundLifePayOrder(
  body: API.RefundLifePayOrderInput,
  options?: API.RequestConfig
) {
  return request<number>('/api/LifePay/RefundLifePayOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户发起生活缴费退款 POST /api/LifePay/RefundUserLifePayOrder */
export async function refundUserLifePayOrder(
  body: API.RefundUserLifePayOrderInput,
  options?: API.RequestConfig
) {
  return request<number>('/api/LifePay/RefundUserLifePayOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退款驳回 POST /api/LifePay/RejectRefundLifePayOrder */
export async function rejectRefundLifePayOrder(
  body: API.RefundLifePayOrderInput,
  options?: API.RequestConfig
) {
  return request<number>('/api/LifePay/RejectRefundLifePayOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 设置渠道启用状态 GET /api/LifePay/SetLifePayChannelsStatus */
export async function setLifePayChannelsStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIsetLifePayChannelsStatusParams,
  options?: API.RequestConfig
) {
  return request<number>('/api/LifePay/SetLifePayChannelsStatus', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 设置生活缴费支付类型 POST /api/LifePay/SetLifePayOrderPayType */
export async function setLifePayOrderPayType(
  body: API.SetLifePayOrderPayTypeInput,
  options?: API.RequestConfig
) {
  return request<string>('/api/LifePay/SetLifePayOrderPayType', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
