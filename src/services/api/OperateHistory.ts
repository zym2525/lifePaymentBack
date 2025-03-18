/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 查询日志 POST /api/OperateHistory/GetOperateHistoryByRelationId */
export async function getOperateHistoryByRelationId(
  body: API.GetOperateHistoryInput,
  options?: API.RequestConfig
) {
  return request<API.OperateHistoryDtoPageOutput>(
    '/api/OperateHistory/GetOperateHistoryByRelationId',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 根据type查询日志 POST /api/OperateHistory/GetOperateHistoryByType */
export async function getOperateHistoryByType(
  body: API.QueryOperateHistoryByTypeInput,
  options?: API.RequestConfig
) {
  return request<API.OperateHistoryDtoPageOutput>('/api/OperateHistory/GetOperateHistoryByType', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
