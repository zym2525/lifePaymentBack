/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 此处后端没有提供注释 POST /api/Version/Create */
export async function create(body: API.VersionCreate, options?: API.RequestConfig) {
  return request<string>('/api/Version/Create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/Version/DeleteVersion */
export async function deleteVersion(body: API.KeyInput, options?: API.RequestConfig) {
  return request<number>('/api/Version/DeleteVersion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Version/Detail */
export async function detail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIdetailParams,
  options?: API.RequestConfig
) {
  return request<API.VersionCache>('/api/Version/Detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/Version/List */
export async function list(body: API.PageInput, options?: API.RequestConfig) {
  return request<API.VersionDtoPageOutput>('/api/Version/List', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/Version/Update */
export async function update(body: API.VersionUpdateInput, options?: API.RequestConfig) {
  return request<number>('/api/Version/Update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
