const API_BASE = import.meta.env.VITE_API_BASE_URL;

// ============================================
// HELPER: Parse Response
// ============================================

export async function parseResponse(res) {
  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const message = data?.error || data?.message || `Request failed with status ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

// ============================================
// AUTH API FUNCTIONS
// ============================================

/**
 * Register a new user
 * @param {Object} credentials - { name, email, password }
 * @returns {Promise<{ success: boolean, accessToken: string, user: Object }>}
 */
export async function registerApi({ name, email, password }) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, email, password }),
  });

  return parseResponse(res);
}

/**
 * Login with email and password
 * @param {Object} credentials - { email, password }
 * @returns {Promise<{ success: boolean, accessToken: string, user: Object }>}
 */
export async function loginApi({ email, password }) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  return parseResponse(res);
}

/**
 * Get current authenticated user
 * @param {string} accessToken - JWT access token
 * @returns {Promise<{ success: boolean, user: Object }>}
 */
export async function meApi(accessToken) {
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  return parseResponse(res);
}

/**
 * Refresh access token using HttpOnly refresh cookie
 * @returns {Promise<{ success: boolean, accessToken: string }>}
 */
export async function refreshApi() {
  const res = await fetch(`${API_BASE}/api/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  return parseResponse(res);
}

/**
 * Logout user and clear refresh token cookie
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function logoutApi() {
  const res = await fetch(`${API_BASE}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return parseResponse(res);
}

// ============================================
// HELPER: Fetch with Auto-Refresh
// ============================================

/**
 * Fetch wrapper that handles token refresh automatically
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options + auth config
 * @param {string} options.accessToken - Current access token
 * @param {Function} options.onNewAccessToken - Callback when token is refreshed
 * @returns {Promise<any>} - Parsed JSON response
 */
export async function fetchWithAuth(url, { accessToken, onNewAccessToken, ...options } = {}) {
  const makeRequest = (token) => {
    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
  };

  let res = await makeRequest(accessToken);

  if (res.status === 401) {
    try {
      const refreshed = await refreshApi();

      if (refreshed?.accessToken) {
        onNewAccessToken?.(refreshed.accessToken);
        res = await makeRequest(refreshed.accessToken);
      }
    } catch (refreshError) {
      const error = new Error("Session expired. Please login again.");
      error.status = 401;
      error.isAuthError = true;
      throw error;
    }
  }

  return parseResponse(res);
}
