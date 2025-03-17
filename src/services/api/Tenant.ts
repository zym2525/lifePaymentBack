/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 此处后端没有提供注释 POST /api/Tenant/Create */
export async function create(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIcreateParams,
  options?: API.RequestConfig
) {
  return request<API.TenantDto>('/api/Tenant/Create', {
    method: 'POST',
    params: {
      ...params,
      ExtraProperties: undefined,
      ...params['ExtraProperties'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/Tenant/DeleteDefaultConnectionString */
export async function deleteDefaultConnectionString(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIdeleteDefaultConnectionStringParams,
  options?: API.RequestConfig
) {
  return request<any>('/api/Tenant/DeleteDefaultConnectionString', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/Tenant/DeleteTenant */
export async function deleteTenant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIdeleteTenantParams,
  options?: API.RequestConfig
) {
  return request<any>('/api/Tenant/DeleteTenant', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Tenant/Get */
export async function get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetParams,
  options?: API.RequestConfig
) {
  return request<API.TenantDto>('/api/Tenant/Get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Tenant/GetDefaultConnectionString */
export async function getDefaultConnectionString(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetDefaultConnectionStringParams,
  options?: API.RequestConfig
) {
  return request<string>('/api/Tenant/GetDefaultConnectionString', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Tenant/GetList */
export async function getList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetListParams,
  options?: API.RequestConfig
) {
  return request<API.TenantDtoPagedResultDto>('/api/Tenant/GetList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/Tenant/Update */
export async function update(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIupdateParams,
  options?: API.RequestConfig
) {
  return request<API.TenantDto>('/api/Tenant/Update', {
    method: 'PUT',
    params: {
      ...params,
      ExtraProperties: undefined,
      ...params['ExtraProperties'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/Tenant/UpdateDefaultConnectionString */
export async function updateDefaultConnectionString(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIupdateDefaultConnectionStringParams,
  options?: API.RequestConfig
) {
  return request<any>('/api/Tenant/UpdateDefaultConnectionString', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
