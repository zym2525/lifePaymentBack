/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 资讯管理--适用区域 GET /api/Area/GetApplicableAreaList */
export async function getApplicableAreaList(options?: API.RequestConfig) {
  return request<API.AreaDto[]>('/api/Area/GetApplicableAreaList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取省市区 GET /api/Area/GetAreaList */
export async function getAreaList(options?: API.RequestConfig) {
  return request<API.AreaDto[]>('/api/Area/GetAreaList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取区域列表（省、市、区） POST /api/Area/GetAreas */
export async function getAreas(body: API.GetAreaListInput, options?: API.RequestConfig) {
  return request<API.AreaDto[]>('/api/Area/GetAreas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索管理--列表(区域管理) GET /api/Area/GetRegionalManagementList */
export async function getRegionalManagementList(options?: API.RequestConfig) {
  return request<API.AreaInfo[]>('/api/Area/GetRegionalManagementList', {
    method: 'GET',
    ...(options || {}),
  });
}
