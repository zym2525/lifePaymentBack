import { useUserStore } from '@/store/modules/user';
import { UserUtils } from '@bole-core/core';
import * as userRoleServices from '@/services/api/UserRole';
import { useQuery, useQueryClient } from '@tanstack/vue-query';

export function useIsSystemAdmin() {
  const userStore = useUserStore();
  const { accountInfo } = storeToRefs(userStore);
  const isSystemAdmin = computed(() => UserUtils.isSystemRole(accountInfo.value));
  return isSystemAdmin;
}

export function useAllRoleList() {
  const { data: allRoleList } = useQuery({
    queryKey: ['userRoleServices/getRoles'],
    queryFn: async () => {
      let res = await userRoleServices.getRoles({}, { showLoading: false });
      return res.data;
    },
  });

  return {
    allRoleList,
  };
}

export function useUser() {
  const userStore = useUserStore();

  const { userId, userInfo } = storeToRefs(userStore);

  return {
    user: userInfo,
    userId: userId,
  };
}
