/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 新增后台管理账户 POST /api/UserRole/CreateBackClientUser */
export async function createBackClientUser(
  body: API.CreateBackClientUserInput,
  options?: API.RequestConfig
) {
  return request<string>('/api/UserRole/CreateBackClientUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增角色 POST /api/UserRole/CreateRole */
export async function createRole(body: API.CreateBaseRoleInput, options?: API.RequestConfig) {
  return request<string>('/api/UserRole/CreateRole', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除后台管理账户 GET /api/UserRole/DeleteBackClientUser */
export async function deleteBackClientUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIdeleteBackClientUserParams,
  options?: API.RequestConfig
) {
  return request<number>('/api/UserRole/DeleteBackClientUser', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除角色 GET /api/UserRole/DeleteRole */
export async function deleteRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIdeleteRoleParams,
  options?: API.RequestConfig
) {
  return request<number>('/api/UserRole/DeleteRole', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 后台管理账户列表 POST /api/UserRole/GetBackClientUsers */
export async function getBackClientUsers(
  body: API.GetBackClientUsersInput,
  options?: API.RequestConfig
) {
  return request<API.UserDtoPageOutput>('/api/UserRole/GetBackClientUsers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 角色列表 POST /api/UserRole/GetRoles */
export async function getRoles(body: API.GetRolesInput, options?: API.RequestConfig) {
  return request<API.RoleInfoPageOutput>('/api/UserRole/GetRoles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 角色启用/禁用 POST /api/UserRole/RoleEnableOrForbid */
export async function roleEnableOrForbid(
  body: API.RoleEnableOrForbidInput,
  options?: API.RequestConfig
) {
  return request<number>('/api/UserRole/RoleEnableOrForbid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 后台管理账户编辑 POST /api/UserRole/UpdateBackClientUser */
export async function updateBackClientUser(
  body: API.UpdateBackClientUserInput,
  options?: API.RequestConfig
) {
  return request<number>('/api/UserRole/UpdateBackClientUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 角色编辑 POST /api/UserRole/UpdateRole */
export async function updateRole(body: API.CreateOrUpdateRoleInput, options?: API.RequestConfig) {
  return request<number>('/api/UserRole/UpdateRole', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
