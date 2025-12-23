import { fetchApi } from "@/utils/fetch-api";

interface RegisterPayload {
  email: string;
  name: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const register = async ({
  email,
  name,
  password,
}: RegisterPayload): Promise<AuthResponse> => {
  return await fetchApi("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      password,
      email,
    }),
  });
};

export const login = async ({
  email,
  password,
}: LoginPayload): Promise<AuthResponse> => {
  return await fetchApi("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      password,
      email,
    }),
  });
};
