/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 此处后端没有提供注释 POST /api/PhoneMessage/CheckVerificationCode */
export async function checkVerificationCode(
  body: API.CheckLoginVerificationCodeInput,
  options?: API.RequestConfig
) {
  return request<number>('/api/PhoneMessage/CheckVerificationCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/PhoneMessage/SendVerificationCode */
export async function sendVerificationCode(
  body: API.SendPhoneMessageBaseInput,
  options?: API.RequestConfig
) {
  return request<number>('/api/PhoneMessage/SendVerificationCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
