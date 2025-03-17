import { EditorType } from '@/constants';
import _ from 'lodash';

export class FormValidator {
  /**
   * 验证表单input-number 不为0
   */
  static validatorNumberNotNull(rule: any, value: any, callback: any) {
    // eslint-disable-next-line eqeqeq
    if (!value) {
      return callback(new Error(rule.message));
    }
    callback();
  }

  static validatorRichEditor(rule: any, value: API.IntroInfo[], callback: any) {
    // eslint-disable-next-line eqeqeq
    const textEditorItem = value.filter((x) => x.type === EditorType.Text);
    if (textEditorItem.some((x) => !x.content)) {
      return callback(new Error(rule.message));
    }
    callback();
  }
  static validatorWeMap(rule: any, value: WeMapModel, callback: any) {
    // eslint-disable-next-line eqeqeq
    if (_.isEmpty(value) || Object.values(value).some((x) => !x)) {
      return callback(new Error(rule.message));
    }
    callback();
  }
}

export async function validateFormList(refs: any) {
  try {
    const validateList = Object.values(refs)
      .reverse()
      .map((x) => {
        const ref = x as any;
        if (Array.isArray(ref)) {
          return delay().then(() => ref[0].validate());
        }
        return delay().then(() => ref.validate());
      });
    let res = await Promise.allSettled(validateList);
    return res.every((x) => x.status === 'fulfilled');
  } catch (error) {}
}

function delay(timeout = 30) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  });
}
