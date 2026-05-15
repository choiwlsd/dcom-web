export interface CurrentUser {
  username: string;
  isAdmin: boolean;
}

const USER_STORAGE_KEY = "user";

const saveUser = (user: CurrentUser) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const login = (id: string, pw: string) => {
  if (id === "admin" && pw === "1234") {
    localStorage.setItem("token", "mock-token-admin123456");
    saveUser({ username: id, isAdmin: true });
    return true;
  }

  if (id === "user" && pw === "1234") {
    localStorage.setItem("token", "mock-token-user123456");
    saveUser({ username: id, isAdmin: false });
    return true;
  }

  return false;
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getCurrentUser = (): CurrentUser | null => {
  const savedUser = localStorage.getItem(USER_STORAGE_KEY);

  if (savedUser) {
    try {
      return JSON.parse(savedUser) as CurrentUser;
    } catch {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }

  const token = localStorage.getItem("token");

  if (token?.includes("admin")) {
    return { username: "admin", isAdmin: true };
  }

  if (token?.includes("user")) {
    return { username: "user", isAdmin: false };
  }

  return null;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem(USER_STORAGE_KEY);
  window.location.href = "/";
};
