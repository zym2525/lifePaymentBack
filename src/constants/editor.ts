export enum EditorType {
  /**
   * 文本
   */
  Text,
  /**
   * 图片
   */
  Image,
  /**
   * 视频
   */
  Video,
  /**
   * 富文本
   */
  Rich,
  /**
   * 微信的内容
   */
  WXContent,
}

export const EditorTypeText = {
  [EditorType.Text]: '文本',
  [EditorType.Image]: '图片',
};

export const EmptyTextEditorItem = { type: EditorType.Text, content: '', sequence: 0 };
