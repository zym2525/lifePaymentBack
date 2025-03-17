import { loadEnv } from '@build/index';

const { VITE_OSS_URL } = loadEnv();

export const OSSBaseURL = VITE_OSS_URL;

const _basicPath = 'lifePayment/Back/';

export const OssCommon = _basicPath + 'Common/';
