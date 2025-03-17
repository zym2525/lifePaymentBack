import { ElMessage, ElMessageBox } from 'element-plus';

// 成功
export const successMessage = (message: string) => {
  return ElMessage({
    showClose: true,
    message,
    type: 'success',
  });
};

// 警告
export const warnMessage = (message: string) => {
  return ElMessage({
    showClose: true,
    message,
    type: 'warning',
  });
};

// 失败
export const errorMessage = (message: string) => {
  return ElMessage({
    showClose: true,
    message,
    type: 'error',
  });
};

export const deleteMessage = (message = '确认要删除该条数据吗?') => {
  return ElMessageBox.confirm(message, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  });
};

export const tipMessage = (msg: string) => {
  return ElMessageBox.confirm(msg, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  });
};

export class Message {
  // 成功
  static successMessage = successMessage;
  // 警告
  static warnMessage = warnMessage;
  // 失败
  static errorMessage = errorMessage;

  static deleteMessage = deleteMessage;

  static tipMessage = tipMessage;
}
