/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 此处后端没有提供注释 GET /api/abp/application-configuration */
export async function applicationConfiguration(options?: API.RequestConfig) {
  return request<API.ApplicationConfigurationDto>('/api/abp/application-configuration', {
    method: 'GET',
    ...(options || {}),
  });
}
