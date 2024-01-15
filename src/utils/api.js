import { useAPI } from "@/hooks/useApi";

//
export const GetCurrentUser = async () => {
  const { get } = useAPI();
  return get("api/auth/user");
};

export const RegisterUserAPI = async (userData) => {
  const { post } = useAPI();
  return post("api/auth/register", userData);
};

//
export const LoginUserAPI = async (credentials) => {
  const { post } = useAPI();
  return post("api/auth/login", credentials);
};

export const LogoutUserAPI = async () => {
  const { post } = useAPI();
  return post("api/auth/logout");
};

export const CustomersListAPI = async () => {
  const { get } = useAPI();
  return get("api/customers");
};

export const AddCustomerAPI = async (customerData) => {
  const { post } = useAPI();
  return post("api/customers", customerData);
};
