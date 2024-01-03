import { useAPI } from "@/hooks/useApi";

//
export const GetCurrentUser = async () => {
  const { get } = useAPI();
  return get("/auth/user");
};

export const RegisterUserAPI = async (userData) => {
  const { post } = useAPI();
  return post("/auth/register", userData);
};

//
export const LoginUserAPI = async (credentials) => {
  const { post } = useAPI();
  return post("/auth/login", credentials);
};

export const LogoutUserAPI = async () => {
  const { post } = useAPI();
  return post("/auth/logout");
};
