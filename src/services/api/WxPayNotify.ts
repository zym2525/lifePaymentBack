/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 微信支付回调通知 POST /api/WxPayNotify/WxRechargeNotify */
export async function wxRechargeNotify(
  body: API.WxRechargeNotifyInput,
  options?: API.RequestConfig
) {
  return request<API.WxRechargeNotifyResult>('/api/WxPayNotify/WxRechargeNotify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
