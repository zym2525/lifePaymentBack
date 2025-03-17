/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** ACOOLY回调通知 POST /api/ACOOLYNotify/ACOOLYNotify */
export async function aCOOLYNotify(options?: API.RequestConfig) {
  return request<any>('/api/ACOOLYNotify/ACOOLYNotify', {
    method: 'POST',
    ...(options || {}),
  });
}
