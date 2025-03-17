import { setOSSLink } from './link';
import { setOssFileName } from '@bole-core/core';
import { UploadUserFile } from '@bole-core/components';
import { uniqueId } from 'lodash';

export function urlOmitDomain(url: string) {
  const _url = url.replace(/^https?:\/\/[^/]+\/+/, '');
  return _url.startsWith('/') ? _url : '/' + _url;
}

/**
 * 把api返回的路径转换为upload的路径
 */
export function convertApi2FormUrl(path: string) {
  return {
    name: setOssFileName(path),
    path: urlOmitDomain(path),
    url: setOSSLink(path),
    status: 'success',
    uid: Number(uniqueId()),
  } as UploadUserFile;
}

export function convertApi2FormUrlOnlyOne(path: string) {
  return path ? [convertApi2FormUrl(path)] : [];
}

/**
 * 把upload的路径转换为上传到api的路径
 */
export function convertFormUrl2Api<T extends { path?: string }>(urls: T[]) {
  return urls.filter((x) => x.path).map((x) => urlOmitDomain(x.path));
}

export async function imageUrlToFile(url: string, filename: string) {
  const response = await fetch(`${url}?${new Date().getTime()}`);
  const blob = await response.blob();
  return new File([blob], filename);
}

export function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // 如果需要保留更多小数位，可以调整toFixed的参数
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
