import { BoleOss } from '@bole-core/core';
import { loadEnv } from '@build/index';
import AliOSS from 'ali-oss';
import * as accountServices from '@/services/api/Account';

export class OssManager {
  private static OssInstance: BoleOss;

  private static async getOssSTS() {
    return await accountServices.getOssSTS({
      showLoading: false,
    });
  }

  public static async getOssInstance() {
    try {
      if (!this.OssInstance) {
        let res = await this.getOssSTS();
        const { VITE_OSS_URL_BUCKET } = loadEnv();
        this.OssInstance = new BoleOss({
          accessKeyId: res.ossAccessKeyId,
          accessKeySecret: res.ossAccessSecret,
          stsToken: res.securityToken,
          bucket: VITE_OSS_URL_BUCKET,
          endpoint: 'https://oss-cn-hangzhou.aliyuncs.com/',
          refreshSTSToken: async () => {
            const info = await this.getOssSTS();
            return {
              accessKeyId: info.ossAccessKeyId,
              accessKeySecret: info.ossAccessSecret,
              stsToken: info.securityToken,
            };
          },
          refreshSTSTokenInterval: 20 * 60 * 1000,
        });
      }
      return this.OssInstance;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  public static async asyncUpload(uploadOptions: BoleOss.UploadOptions) {
    const instance = await this.getOssInstance();
    return instance.asyncUpload(uploadOptions);
  }

  public static async multipartUpload(
    uploadOptions: BoleOss.MultipartUploadOptions,
    options: AliOSS.MultipartUploadOptions
  ) {
    const { VITE_OSS_URL } = loadEnv();
    const instance = await this.getOssInstance();
    return instance.multipartUpload(
      {
        ossBaseUrl: VITE_OSS_URL,
        ...uploadOptions,
      },
      options
    );
  }
}
