export type UserInfo = {
  email: string;
  token: string;
};

export function storeUserInfo(data: UserInfo) {
  localStorage.setItem("user-info", JSON.stringify(data));
}

export function getUserToken(): UserInfo | null {
  const data: UserInfo = JSON.parse(localStorage.getItem("user-info") || "");
  if (data.token) return data;
  return null;
}
