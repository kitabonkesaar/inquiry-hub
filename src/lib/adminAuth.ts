const ADMIN_AUTH_KEY = 'rentAnyBus_admin_auth';

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function loginAdmin() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(ADMIN_AUTH_KEY, 'true');
  } catch {
    // ignore
  }
}

export function logoutAdmin() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(ADMIN_AUTH_KEY);
  } catch {
    // ignore
  }
}


