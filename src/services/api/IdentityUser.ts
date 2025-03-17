/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 此处后端没有提供注释 POST /api/IdentityUser/Create */
export async function create(body: API.IdentityUserCreateDto, options?: API.RequestConfig) {
  return request<API.IdentityUserDto>('/api/IdentityUser/Create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/IdentityUser/DeleteUser */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIdeleteUserParams,
  options?: API.RequestConfig
) {
  return request<number>('/api/IdentityUser/DeleteUser', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/IdentityUser/FindByEmail */
export async function findByEmail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIfindByEmailParams,
  options?: API.RequestConfig
) {
  return request<API.IdentityUserDto>('/api/IdentityUser/FindByEmail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/IdentityUser/FindByUsername */
export async function findByUsername(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIfindByUsernameParams,
  options?: API.RequestConfig
) {
  return request<API.IdentityUserDto>('/api/IdentityUser/FindByUsername', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/IdentityUser/Get */
export async function get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetParams,
  options?: API.RequestConfig
) {
  return request<API.IdentityUserDto>('/api/IdentityUser/Get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/IdentityUser/GetAssignableRoles */
export async function getAssignableRoles(options?: API.RequestConfig) {
  return request<API.IdentityRoleDtoListResultDto>('/api/IdentityUser/GetAssignableRoles', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/IdentityUser/GetList */
export async function getList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetListParams,
  options?: API.RequestConfig
) {
  return request<API.IdentityUserDtoPagedResultDto>('/api/IdentityUser/GetList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/IdentityUser/GetPageList */
export async function getPageList(body: API.PageUserInput, options?: API.RequestConfig) {
  return request<API.IdentityUserDtoPagedResultDto>('/api/IdentityUser/GetPageList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/IdentityUser/GetRoles/${param0}/roles */
export async function getRolesIdRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetRolesIdRolesParams,
  options?: API.RequestConfig
) {
  const { id: param0, ...queryParams } = params;
  return request<API.IdentityRoleDtoListResultDto>(`/api/IdentityUser/GetRoles/${param0}/roles`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/IdentityUser/GetRoleUserList */
export async function getRoleUserList(body: API.KeyPageInput, options?: API.RequestConfig) {
  return request<API.IdentityUserDtoPageOutput>('/api/IdentityUser/GetRoleUserList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/IdentityUser/GetUserListByPhoneNumber */
export async function getUserListByPhoneNumber(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetUserListByPhoneNumberParams,
  options?: API.RequestConfig
) {
  return request<API.IdentityUserDto[]>('/api/IdentityUser/GetUserListByPhoneNumber', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/IdentityUser/ResetPassword */
export async function resetPassword(body: API.KeyInput, options?: API.RequestConfig) {
  return request<number>('/api/IdentityUser/ResetPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/IdentityUser/ResetPasswordWithNotify */
export async function resetPasswordWithNotify(
  body: API.ResetPassWordInput,
  options?: API.RequestConfig
) {
  return request<number>('/api/IdentityUser/ResetPasswordWithNotify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/IdentityUser/SetRoleUser */
export async function setRoleUser(body: API.SetRoleUserInput, options?: API.RequestConfig) {
  return request<number>('/api/IdentityUser/SetRoleUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/IdentityUser/SetUserRole */
export async function setUserRole(body: API.SetUserRoleInput, options?: API.RequestConfig) {
  return request<number>('/api/IdentityUser/SetUserRole', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/IdentityUser/Update */
export async function update(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIupdateParams,
  body: API.IdentityUserUpdateDto,
  options?: API.RequestConfig
) {
  return request<API.IdentityUserDto>('/api/IdentityUser/Update', {
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

/** 此处后端没有提供注释 POST /api/IdentityUser/UpdatePassWord */
export async function updatePassWord(body: API.UpdatePassWordInput, options?: API.RequestConfig) {
  return request<number>('/api/IdentityUser/UpdatePassWord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/IdentityUser/UpdatePassWordWithNoCode */
export async function updatePassWordWithNoCode(
  body: API.UpdatePassWordInputWithNoCode,
  options?: API.RequestConfig
) {
  return request<number>('/api/IdentityUser/UpdatePassWordWithNoCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/IdentityUser/UpdateRoles */
export async function updateRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIupdateRolesParams,
  body: API.IdentityUserUpdateRolesDto,
  options?: API.RequestConfig
) {
  return request<number>('/api/IdentityUser/UpdateRoles', {
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

/** 此处后端没有提供注释 POST /api/IdentityUser/UserForbidden */
export async function userForbidden(body: API.KeyInput, options?: API.RequestConfig) {
  return request<number>('/api/IdentityUser/UserForbidden', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
