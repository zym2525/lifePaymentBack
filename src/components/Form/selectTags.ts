export type SelectedTag = {
  text?: string;
  value?: string | number;
};

export type GroupTagListItemOption = Omit<API.CategoryMenu, 'value'> & {
  canDelete?: boolean;
  text?: string;
  value?: string | number;
};

export type GroupTagListItem = {
  label: string;
  value: string;
  options: GroupTagListItemOption[];
};

export const selectTagsProps = {
  modelValue: {
    type: Array as PropType<SelectedTag[]>,
  },
  maxSelectedTagLength: {
    type: Number,
    default: 5,
  },
  maxCustomTagLength: {
    type: Number,
    default: 5,
  },
  groupTagList: {
    type: Array as PropType<GroupTagListItem[]>,
  },
  onDeleteCustomOption: {
    type: Function as PropType<(option: GroupTagListItemOption) => Promise<void>>,
  },
};

export const CustomGroupTabValue = 'custom';
