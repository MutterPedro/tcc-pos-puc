export function getSessionToken() {
  const token = window.localStorage.getItem('session_token');

  return token;
}

export function logOut() {
  window.localStorage.removeItem('session_token');
}

export function isLoggedIn() {
  return !!getSessionToken();
}
