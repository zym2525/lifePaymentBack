/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 此处后端没有提供注释 POST /api/Profile/ChangePassword */
export async function changePassword(body: API.ChangePasswordInput, options?: API.RequestConfig) {
  return request<any>('/api/Profile/ChangePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/Profile/Get */
export async function get(options?: API.RequestConfig) {
  return request<API.ProfileDto>('/api/Profile/Get', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/Profile/Update */
export async function update(body: API.UpdateProfileDto, options?: API.RequestConfig) {
  return request<API.ProfileDto>('/api/Profile/Update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
