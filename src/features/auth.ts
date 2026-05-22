// auth.ts

import type { User } from "../data/user.type";
import { mockUsers } from "../data/user-data.mock";
import type { AuthUser } from "../data/authuser.type";

const USER_STORAGE_KEY = "user";
const TOKEN_STORAGE_KEY = "token";

// 유저네임 유효성 검사
const validateId = (username: string) => {
  return username.length >= 4 && username.length <= 20;
};

// 비밀번호 유효성 검사
const validatePassword = (pw: string) => {
  // 최소 8자 + 영문 + 숫자 포함
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  return passwordRegex.test(pw);
};

// password 제거
const excludePassword = (
  user: User
): AuthUser => {
  const { password, ...safeUser } = user;
  return safeUser;
};

// 회원가입
export const register = (user: User) => {
  const users: User[] = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  // username 중복 체크
  const isExist =
    users.some((u) => u.username === user.username) ||
    mockUsers.some((u) => u.username === user.username);

  if (isExist) {
    return false;
  }

  // 유효성 검사
  if (
    !validateId(user.username) ||
    !validatePassword(user.password)
  ) {
    return false;
  }

  users.push(user);

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  return true;
};

// 현재 로그인 유저 저장
const saveUser = (user: AuthUser) => {
  localStorage.setItem(
    USER_STORAGE_KEY,
    JSON.stringify(user)
  );
};

// 로그인
export const login = (
  username: string,
  pw: string
) => {
  // mock + local users 합치기
  const localUsers: User[] = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  const users = [...mockUsers, ...localUsers];

  const user = users.find(
    (u) =>
      u.username === username &&
      u.password === pw
  );

  if (!user) {
    return false;
  }

  localStorage.setItem(
    TOKEN_STORAGE_KEY,
    "mock-token"
  );

  saveUser(excludePassword(user));

  return true;
};

// 로그인 여부
export const isLoggedIn = () => {
  return !!localStorage.getItem(
    TOKEN_STORAGE_KEY
  );
};

// 현재 유저 조회
export const getCurrentUser =
  (): AuthUser | null => {
    const savedUser =
      localStorage.getItem(USER_STORAGE_KEY);

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser) as AuthUser;
    } catch {
      localStorage.removeItem(
        USER_STORAGE_KEY
      );

      return null;
    }
  };

// 로그아웃
export const logout = () => {
  localStorage.removeItem(
    TOKEN_STORAGE_KEY
  );

  localStorage.removeItem(
    USER_STORAGE_KEY
  );

  window.location.href = "/";
};