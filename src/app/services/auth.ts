import { UserInfo } from "../util/auth";
import api from "./api";

export async function signUp(email: string, password: string) {
  const response = await api.post("/auth/sign-up", { password, email });
  return response;
}

export async function signIn(email: string, password: string) {
  const response = await api.post("/auth/sign-in", { password, email });
  return response;
}
