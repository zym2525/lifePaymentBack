/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 此处后端没有提供注释 POST /api/BaseModule/AddAuthorizeModule */
export async function addAuthorizeModule(
  body: API.BaseAuthorizeInput,
  options?: API.RequestConfig
) {
  return request<number>('/api/BaseModule/AddAuthorizeModule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/BaseModule/AddModuleColumnList */
export async function addModuleColumnList(
  body: API.ModuleColumnDto[],
  options?: API.RequestConfig
) {
  return request<number>('/api/BaseModule/AddModuleColumnList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/BaseModule/AddOrEditModule */
export async function addOrEditModule(body: API.ModuleDto, options?: API.RequestConfig) {
  return request<string>('/api/BaseModule/AddOrEditModule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/BaseModule/AddOrEditModuleButton */
export async function addOrEditModuleButton(
  body: API.ModuleButtonDto,
  options?: API.RequestConfig
) {
  return request<string>('/api/BaseModule/AddOrEditModuleButton', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/BaseModule/AddOrEditModuleColumn */
export async function addOrEditModuleColumn(
  body: API.ModuleColumnDto,
  options?: API.RequestConfig
) {
  return request<string>('/api/BaseModule/AddOrEditModuleColumn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/BaseModule/AddOrEditModuleStatus */
export async function addOrEditModuleStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIaddOrEditModuleStatusParams,
  options?: API.RequestConfig
) {
  return request<string>('/api/BaseModule/AddOrEditModuleStatus', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/BaseModule/ChangeSort */
export async function changeSort(body: API.ChangeSortInput, options?: API.RequestConfig) {
  return request<number>('/api/BaseModule/ChangeSort', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/BaseModule/DeleteModule */
export async function deleteModule(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIdeleteModuleParams,
  options?: API.RequestConfig
) {
  return request<number>('/api/BaseModule/DeleteModule', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/BaseModule/DeleteModuleButton */
export async function deleteModuleButton(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIdeleteModuleButtonParams,
  options?: API.RequestConfig
) {
  return request<number>('/api/BaseModule/DeleteModuleButton', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/BaseModule/DeleteModuleColumn */
export async function deleteModuleColumn(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIdeleteModuleColumnParams,
  options?: API.RequestConfig
) {
  return request<number>('/api/BaseModule/DeleteModuleColumn', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/BaseModule/GetAllModuleList */
export async function getAllModuleList(options?: API.RequestConfig) {
  return request<API.ModuleDto[]>('/api/BaseModule/GetAllModuleList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/BaseModule/GetAllSubModule */
export async function getAllSubModule(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetAllSubModuleParams,
  options?: API.RequestConfig
) {
  return request<API.AllSubModule>('/api/BaseModule/GetAllSubModule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/BaseModule/GetCurrentSubModuleList */
export async function getCurrentSubModuleList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetCurrentSubModuleListParams,
  options?: API.RequestConfig
) {
  return request<API.AllSubModule>('/api/BaseModule/GetCurrentSubModuleList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/BaseModule/GetCurrentUserModuleList */
export async function getCurrentUserModuleList(options?: API.RequestConfig) {
  return request<API.ModuleDto[]>('/api/BaseModule/GetCurrentUserModuleList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/BaseModule/GetFirstCurrentUserModuleList */
export async function getFirstCurrentUserModuleList(options?: API.RequestConfig) {
  return request<API.ModuleDto[]>('/api/BaseModule/GetFirstCurrentUserModuleList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/BaseModule/GetFirstCurrentUserModuleListCacheByModuleId */
export async function getFirstCurrentUserModuleListCacheByModuleId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetFirstCurrentUserModuleListCacheByModuleIdParams,
  options?: API.RequestConfig
) {
  return request<API.ModuleDto[]>('/api/BaseModule/GetFirstCurrentUserModuleListCacheByModuleId', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/BaseModule/GetMyModule */
export async function getMyModule(options?: API.RequestConfig) {
  return request<API.MyModuleDto[]>('/api/BaseModule/GetMyModule', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/BaseModule/GetUserOrRoleModuleList */
export async function getUserOrRoleModuleList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetUserOrRoleModuleListParams,
  options?: API.RequestConfig
) {
  return request<API.ModuleDto[]>('/api/BaseModule/GetUserOrRoleModuleList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/BaseModule/GetUserOrRoleSubModuleList */
export async function getUserOrRoleSubModuleList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetUserOrRoleSubModuleListParams,
  options?: API.RequestConfig
) {
  return request<API.AllSubModule>('/api/BaseModule/GetUserOrRoleSubModuleList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/BaseModule/GetVersionModuleList */
export async function getVersionModuleList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetVersionModuleListParams,
  options?: API.RequestConfig
) {
  return request<API.ModuleDto[]>('/api/BaseModule/GetVersionModuleList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/BaseModule/GetVersionSubModule */
export async function getVersionSubModule(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetVersionSubModuleParams,
  options?: API.RequestConfig
) {
  return request<API.AllSubModule>('/api/BaseModule/GetVersionSubModule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/BaseModule/SetMyModule */
export async function setMyModule(body: API.SetMyModuleInput, options?: API.RequestConfig) {
  return request<number>('/api/BaseModule/SetMyModule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/BaseModule/SetVersionModule */
export async function setVersionModule(
  body: API.SetVersionModuleInput,
  options?: API.RequestConfig
) {
  return request<any>('/api/BaseModule/SetVersionModule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/BaseModule/SingleSetAuthorizeModule */
export async function singleSetAuthorizeModule(
  body: API.BaseAuthorizeDto,
  options?: API.RequestConfig
) {
  return request<number>('/api/BaseModule/SingleSetAuthorizeModule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
