export function getSessionToken() {
  const token = window.localStorage.getItem('session_token');

  return token;
}

export function logOut() {
  window.localStorage.removeItem('session_token');
  window.localStorage.removeItem('permissions');
}

export function isLoggedIn() {
  return !!getSessionToken();
}

export function isAllowedTo(permission) {
  const permissions = window.localStorage.getItem('permissions');
  if (!permissions) {
    return false;
  }

  return JSON.parse(permissions).includes(permission);
}
