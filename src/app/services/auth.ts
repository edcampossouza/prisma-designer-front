import api from "./api";

export async function signUp(email: string, password: string) {
  const response = await api.post("/auth/sign-up", { password, email });
  return response;
}
