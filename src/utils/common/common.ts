import dayjs from 'dayjs';
import { BoleRegExp } from '@bole-core/core';
import { round, floor, omitBy } from 'lodash';

export function format(date: string | Date, fmt = 'YYYY-MM-DD') {
  return date ? dayjs(date).format(fmt) : '';
}

export const canPreviewFun = (url: string) => {
  const _can = BoleRegExp.RegCanPreview.test(url);
  BoleRegExp.RegCanPreview.lastIndex = 0;
  return _can;
};

export function toRound(val: number, num = 2) {
  if (val >= 0) {
    return round(val, num);
  } else {
    const abs = Math.abs(val);
    return 0 - round(abs, num);
  }
}

export function toThousand(input) {
  const num = toRound(Number(input)).toFixed(2);
  if (Number(num) >= 0) {
    return num.toString().replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
  } else {
    const posNum = (0 - Number(num)).toFixed(2);
    return (
      '-' + posNum.toString().replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    );
  }
}

export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function setTemplateId() {
  return guid().replace(/-/g, '').toUpperCase().slice(0, 16);
}

// 时间 0填充
const timePad = (num: number) => {
  return num < 10 ? '0' + num : num;
};

export const secondsToMinutes = (seconds: number) => {
  const minutes = floor(seconds / 60);
  const resetSeconds = seconds % 60;
  return `${timePad(minutes)}:${timePad(resetSeconds)}`;
};

export const hiddenIDNumber = (realIDNumber: string) =>
  realIDNumber.replace(/^(.{6})(?:\d+)(.{4})$/, '$1********$2');

export const hiddenPhoneNumber = (realPhoneNumbe: string) =>
  realPhoneNumbe.replace(/^(.{3})(?:\d+)(.{4})$/, '$1****$2');

export function filterJoin(list: any[], separator = '-') {
  return list.filter(Boolean).join(separator);
}

export class StringUtils {
  static insertSpaces(str: string, space = 4) {
    if (!str) return '';
    const regex = new RegExp(`(.{${space}})`, 'g');
    return str.replace(regex, '$1 ');
  }

  static societyCreditCodeInsertSpaces(str: string) {
    if (!str) return '';
    return str.replace(/(.{4})(.{4})(.{4})(.{6})/g, '$1 $2 $3 $4');
  }

  static idNumberInsertSpaces(str: string) {
    if (!str) return '';
    return str.replace(/(.{3})(.{3})(.{4})(.{4})(.{4})/g, '$1 $2 $3 $4 $5');
  }

  static phoneNumberAddSpace(realPhoneNumber: string) {
    if (!realPhoneNumber) return '';
    return realPhoneNumber.replace(/^(\d{3})(\d*)(\d{4})$/, '$1 $2 $3');
  }
}

export function paginateList<T>(list: T[], pageIndex: number, pageSize: number) {
  const startIndex = (pageIndex - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return list.slice(startIndex, endIndex);
}

export function omitByFalse<T>(object: { [key: string]: any }) {
  return omitBy(object, (v) => !v) as any as T;
}

export function filterCN(str: string) {
  return str.replace(/[\u4e00-\u9fa5]/gi, '');
}

export function filterNumbersFromString(str: string) {
  return str.replace(/\D/g, '');
}

export function formatRoleName(roleName: string) {
  let lastUnderscoreIndex = roleName.lastIndexOf('_');

  if (lastUnderscoreIndex !== -1) {
    roleName = roleName.substring(0, lastUnderscoreIndex);
  }
  return roleName;
}
