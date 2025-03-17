export function tokenIsExpired(userInfo: API.IdentityModelTokenCacheItem) {
  const now = new Date().getTime();
  const expiresIn = userInfo.expiresIn;
  const expired = (now - new Date(userInfo.creationTime).getTime()) / 1000 >= expiresIn - 300;
  return expired;
}
