/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 此处后端没有提供注释 PUT /api/Permissions/ForbiddenRole */
export async function forbiddenRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIforbiddenRoleParams,
  options?: API.RequestConfig
) {
  return request<any>('/api/Permissions/ForbiddenRole', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/Permissions/ForbiddenUser */
export async function forbiddenUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIforbiddenUserParams,
  options?: API.RequestConfig
) {
  return request<any>('/api/Permissions/ForbiddenUser', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Permissions/Get */
export async function get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetParams,
  options?: API.RequestConfig
) {
  return request<API.GetPermissionListResultDto>('/api/Permissions/Get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/Permissions/SetForRole */
export async function setForRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIsetForRoleParams,
  options?: API.RequestConfig
) {
  return request<any>('/api/Permissions/SetForRole', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/Permissions/SetForUser */
export async function setForUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIsetForUserParams,
  options?: API.RequestConfig
) {
  return request<any>('/api/Permissions/SetForUser', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/Permissions/Update */
export async function update(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIupdateParams,
  body: API.UpdatePermissionsDto,
  options?: API.RequestConfig
) {
  return request<any>('/api/Permissions/Update', {
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
