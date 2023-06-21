export type UserInfo = {
  email: string;
  token: string;
  schemas?: SchemaInfo[];
};

export type SchemaInfo = {
  id: number;
  name: string;
};

export function storeUserInfo(data: UserInfo) {
  localStorage.setItem("user-info", JSON.stringify(data));
}

export function getUserToken(): UserInfo | null {
  try {
    const data: UserInfo = JSON.parse(localStorage.getItem("user-info") || "");
    if (data.token) return data;
    return null;
  } catch (error) {}
  return null;
}

export function clearToken() {
  localStorage.removeItem("user-info");
}
