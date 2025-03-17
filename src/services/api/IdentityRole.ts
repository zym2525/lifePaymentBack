/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 此处后端没有提供注释 POST /api/IdentityRole/Create */
export async function create(body: API.IdentityRoleCreateDto, options?: API.RequestConfig) {
  return request<API.IdentityRoleDto>('/api/IdentityRole/Create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/IdentityRole/DeleteRole */
export async function deleteRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIdeleteRoleParams,
  options?: API.RequestConfig
) {
  return request<number>('/api/IdentityRole/DeleteRole', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/IdentityRole/Get */
export async function get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetParams,
  options?: API.RequestConfig
) {
  return request<API.IdentityRoleDto>('/api/IdentityRole/Get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/IdentityRole/GetAllList */
export async function getAllList(options?: API.RequestConfig) {
  return request<API.IdentityRoleDtoListResultDto>('/api/IdentityRole/GetAllList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/IdentityRole/GetList */
export async function getList(body: API.IdentityRoleListInput, options?: API.RequestConfig) {
  return request<API.IdentityRoleDtoPagedResultDto>('/api/IdentityRole/GetList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/IdentityRole/Update */
export async function update(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIupdateParams,
  body: API.IdentityRoleUpdateDto,
  options?: API.RequestConfig
) {
  return request<API.IdentityRoleDto>('/api/IdentityRole/Update', {
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
