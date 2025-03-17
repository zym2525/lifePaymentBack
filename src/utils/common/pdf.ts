import { BoleOss, Message } from '@bole-core/core';
import { RichEditorUtils } from '@bole-core/components';
import { OssManager } from '../oss';
import { ElLoading } from 'element-plus';

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.js';

export async function resolvePdfByUrl(url: string) {
  let pdf = await pdfjsLib.getDocument(url).promise;

  return pdf;
}

export type ConvertPdfToImageItem = BoleOss.PutObjectResult & {
  width: number;
  height: number;
};

export async function convertPdfToImage(pdfUrl: string) {
  let loadingInstance: ReturnType<typeof ElLoading.service>;
  try {
    loadingInstance = ElLoading.service({
      fullscreen: true,
      lock: false,
      background: 'transparent',
    });
    const pdf = await resolvePdfByUrl(pdfUrl);
    let tasks: Promise<ConvertPdfToImageItem>[] = [];
    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const viewport = page.getViewport({ scale: 1 });
      tasks.push(
        new Promise(async (resolve, reject) => {
          try {
            let base64 = await generateBase64ByPage(page);
            let file = RichEditorUtils.base64ToFile(base64);
            let res = await OssManager.asyncUpload({
              file: file,
            });
            resolve({
              ...res,
              width: viewport.width,
              height: viewport.height,
            });
          } catch (error) {
            reject(error);
          }
        })
      );
    }
    return Promise.all(tasks);
  } catch (error) {
    Message.errorMessage(error);
    throw new Error(error);
  } finally {
    if (loadingInstance) {
      loadingInstance.close();
    }
  }
}

async function generateBase64ByPage(page) {
  const viewport = page.getViewport({ scale: 1 });
  let canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };
  await page.render(renderContext).promise;
  let base64 = canvas.toDataURL('image/png');
  canvas = null;
  return base64;
}
