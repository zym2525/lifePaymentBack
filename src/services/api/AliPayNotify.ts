/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 支付宝充值回调通知 POST /api/AliPayNotify/AliRechargeNotify */
export async function aliRechargeNotify(options?: API.RequestConfig) {
  return request<any>('/api/AliPayNotify/AliRechargeNotify', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/AliPayNotify/TestAliRechargeNotify */
export async function testAliRechargeNotify(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APItestAliRechargeNotifyParams,
  options?: API.RequestConfig
) {
  return request<any>('/api/AliPayNotify/TestAliRechargeNotify', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
