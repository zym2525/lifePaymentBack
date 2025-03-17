/* eslint-disable */
// @ts-ignore
import { request } from '@/utils/request';

/** 获取生活缴费用户身份会话信息 GET /api/Account/GetLifePayWxIndentity */
export async function getLifePayWxIndentity(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.APIgetLifePayWxIndentityParams,
  options?: API.RequestConfig
) {
  return request<API.WxMiniAppIndentityInfo>('/api/Account/GetLifePayWxIndentity', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/Account/GetOssSTS */
export async function getOssSTS(options?: API.RequestConfig) {
  return request<API.OssSTSReponse>('/api/Account/GetOssSTS', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/Account/GetTokenForWeb */
export async function getTokenForWeb(body: API.AccessRequestDto, options?: API.RequestConfig) {
  return request<API.IdentityModelTokenCacheItem>('/api/Account/GetTokenForWeb', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** life pay手机验证码登录 POST /api/Account/LifePayPhoneMesssageCodeLogin */
export async function lifePayPhoneMesssageCodeLogin(
  body: API.LifePayPhoneMesssageCodeLoginInput,
  options?: API.RequestConfig
) {
  return request<string>('/api/Account/LifePayPhoneMesssageCodeLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/accountAuth/GetCode */
export async function getCode(options?: API.RequestConfig) {
  return request<any>('/api/accountAuth/GetCode', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/accountAuth/GetPhoneToken */
export async function getPhoneToken(body: API.PhoneToken, options?: API.RequestConfig) {
  return request<API.IdentityModelTokenCacheItem>('/api/accountAuth/GetPhoneToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/accountAuth/GetToken */
export async function getToken(body: API.AccessRequestDto, options?: API.RequestConfig) {
  return request<API.IdentityModelTokenCacheItem>('/api/accountAuth/GetToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/accountAuth/GetTokenByRefreshToken */
export async function getTokenByRefreshToken(
  body: API.AccessRefreshToken,
  options?: API.RequestConfig
) {
  return request<API.IdentityModelTokenCacheItem>('/api/accountAuth/GetTokenByRefreshToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/accountAuth/Register */
export async function register(body: API.RegisterDto, options?: API.RequestConfig) {
  return request<API.IdentityUserDto>('/api/accountAuth/Register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/accountAuth/ResetPassword */
export async function resetPassword(body: API.ResetPasswordDto, options?: API.RequestConfig) {
  return request<any>('/api/accountAuth/ResetPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/accountAuth/SendPasswordResetCode */
export async function sendPasswordResetCode(
  body: API.SendPasswordResetCodeDto,
  options?: API.RequestConfig
) {
  return request<any>('/api/accountAuth/SendPasswordResetCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
