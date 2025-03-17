import { BoleOss } from '@bole-core/core';
import { OssManager } from './index';
import { UploadRequestOptions } from 'element-plus';

export function uploadRequest(
  options: BoleOss.UploadOptions,
  _uploadRequestOptions?: UploadRequestOptions
) {
  console.log('options: ', options);
  try {
    const MBSize100 = 1024 * 1024 * 100;
    /**
     * 大于100M时分片上传
     */
    if (options.file.size > MBSize100) {
      let multipartUploadRes = OssManager.multipartUpload(options, {
        partSize: 1024 * 1024 * 10,
        progress: (percent, cpt, res) => {
          console.log('res: ', res);
          console.log('cpt: ', cpt);
          console.log('percent: ', percent);
          _uploadRequestOptions?.onProgress(
            {
              percent,
            },
            //@ts-ignore
            cpt.file
          );
        },
      });
      return multipartUploadRes;
    } else {
      return OssManager.asyncUpload(options);
    }
  } catch (error) {
    console.log('error: ', error);
  }
}
