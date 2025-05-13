// client/src/utils/auth.ts
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split('.')[1]));
  console.log(payload)
  const expiry = payload.exp;
  const now = Math.floor(Date.now() / 1000);

  return now > expiry;
};
