/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 此处后端没有提供注释 GET /api/Features/Get */
export async function get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetParams,
  options?: API.RequestConfig
) {
  return request<API.GetFeatureListResultDto>('/api/Features/Get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/Features/Update */
export async function update(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIupdateParams,
  body: API.UpdateFeaturesDto,
  options?: API.RequestConfig
) {
  return request<any>('/api/Features/Update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
