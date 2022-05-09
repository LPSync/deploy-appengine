export const setAuthExpireDateTimeToStorage = (ttl = 60 * 60 * 1000) => {
  const now = new Date();
  const authExpireDateTime = now.getTime() + ttl;
  window.localStorage.setItem("authExpireDateTime", authExpireDateTime.toString());
};

export const isAuthExpired = () => {
  try {
    const authExpireDateTime = localStorage.getItem("authExpireDateTime");
    if (!authExpireDateTime) {
      return true;
    }
    const expireTime = parseInt(authExpireDateTime);
    const now = new Date();
    if (now.getTime() > expireTime || isNaN(expireTime)) {
      removeAuthExpireDateTime();
      return true;
    }
    return false;
  } catch (err) {
    return true;
  }
};

export const removeAuthExpireDateTime = () => {
  localStorage.removeItem("authExpireDateTime");
};