/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 此处后端没有提供注释 GET /api/IdentityUserLookup/FindById */
export async function findById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIfindByIdParams,
  options?: API.RequestConfig
) {
  return request<API.UserData>('/api/IdentityUserLookup/FindById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/IdentityUserLookup/FindByUserName */
export async function findByUserName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIfindByUserNameParams,
  options?: API.RequestConfig
) {
  return request<API.UserData>('/api/IdentityUserLookup/FindByUserName', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/IdentityUserLookup/GetCount */
export async function getCount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetCountParams,
  options?: API.RequestConfig
) {
  return request<number>('/api/IdentityUserLookup/GetCount', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/IdentityUserLookup/Search */
export async function search(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIsearchParams,
  options?: API.RequestConfig
) {
  return request<API.UserDataListResultDto>('/api/IdentityUserLookup/Search', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
