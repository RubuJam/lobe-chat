import { TRPCError } from '@trpc/server';
import { t } from 'i18next';

import { enableClerk } from '@/const/auth';
import { UserStore, useUserStore } from '@/store/user';
import { LobeUser } from '@/types/user';

export class UserNotAllowLogIn extends TRPCError {
  constructor() {
    super({ code: 'UNAUTHORIZED', message: 'User not allowed to log in' });
  }
}

const DEFAULT_USERNAME = 'LobeChat';

const nickName = (s: UserStore) => {
  if (!s.enableAuth()) return t('userPanel.defaultNickname', { ns: 'common' });

  if (s.isSignedIn) return s.user?.fullName || s.user?.username;

  return t('userPanel.anonymousNickName', { ns: 'common' });
};

const username = (s: UserStore) => {
  if (!s.enableAuth()) return DEFAULT_USERNAME;

  if (s.isSignedIn) return s.user?.username;

  return 'anonymous';
};

export const userProfileSelectors = {
  nickName,
  userAvatar: (s: UserStore): string => s.user?.avatar || '',
  userId: (s: UserStore) => s.user?.id,
  userProfile: (s: UserStore): LobeUser | null | undefined => s.user,
  username,
};

/**
 * 使用此方法可以兼容不需要登录鉴权的情况
 */

const isLogin = (s: UserStore, signOut: () => void) => {
  const publicMetadata = s.user?.publicMetadata;

  // 如果没有开启鉴权，说明不需要登录，默认是登录态
  if (!s.enableAuth()) return true;

  if (
    !publicMetadata ||
    (publicMetadata.registrationUrl && publicMetadata.registrationUrl.includes('oaknuts.me'))
  ) {
    signOut();
    throw new UserNotAllowLogIn();
  }

  return s.isSignedIn;
};

export const authSelectors = {
  isLoaded: (s: UserStore) => s.isLoaded,
  isLogin: (s: UserStore) => isLogin(s, useUserStore.getState().logout),
  isLoginWithAuth: (s: UserStore) => s.isSignedIn,
  isLoginWithClerk: (s: UserStore): boolean => (s.isSignedIn && enableClerk) || false,
};
