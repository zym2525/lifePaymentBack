import { useDialog } from '@bole-core/components';
import { OperateHistoryTypeEnum } from '@/constants';

type UseAdvertisementListOptions = {
  operateType?: MaybeRef<number>;
};

export function useOpenLogDialog(options: UseAdvertisementListOptions = {}) {
  const { operateType } = options;

  const relationId = ref('');

  const { dialogProps, dialogState } = useDialog();

  async function openLogDialog(_relationId: string) {
    relationId.value = _relationId;
    await nextTick();
    dialogState.dialogVisible = true;
  }

  const logDialogProps = computed(() => {
    return {
      ...dialogProps.value,
      relationId: relationId.value,
      operateType: unref(operateType),
    };
  });
  return {
    logDialogProps,
    openLogDialog,
  };
}

type UseOpenLogByTypeDialogOptions = {
  operateHistoryType?: MaybeRef<OperateHistoryTypeEnum>;
};

export function useOpenLogByTypeDialog(options: UseOpenLogByTypeDialogOptions = {}) {
  const { operateHistoryType } = options;

  const relationId = ref('');

  const { dialogProps, dialogState } = useDialog();

  async function openLogDialog(_relationId: string) {
    relationId.value = _relationId;
    await nextTick();
    dialogState.dialogVisible = true;
  }

  const logDialogProps = computed(() => {
    return {
      ...dialogProps.value,
      relationId: relationId.value,
      operateHistoryType: unref(operateHistoryType),
    };
  });
  return {
    logDialogProps,
    openLogDialog,
  };
}
