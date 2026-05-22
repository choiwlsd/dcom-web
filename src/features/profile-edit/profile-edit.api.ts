// profile-edit/profile-edit.api.ts

import type { User } from "../../data/user.type";
import { mockUsers } from "../../data/user-data.mock";

// 현재 로그인 유저라고 가정
const CURRENT_USER_ID = 1;

// 조회
export function fetchUser(): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.id === CURRENT_USER_ID
      );

      if (!user) {
        reject(new Error("유저를 찾을 수 없습니다."));
        return;
      }

      resolve(user);
    }, 500);
  });
}

// 수정
export function updateUser(
  updatedUser: User
): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockUsers.findIndex(
        (u) => u.id === updatedUser.id
      );

      if (index === -1) {
        reject(new Error("유저를 찾을 수 없습니다."));
        return;
      }

      // 기존 유저 덮어쓰기
      mockUsers[index] = updatedUser;

      console.log("수정된 유저:", mockUsers[index]);

      resolve(mockUsers[index]);
    }, 1000);
  });
}