import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../utils/queryClient";
import { useNavigate } from "react-router-dom";
// import { GetCurrentUser, LoginUserAPI, LogoutUserAPI, RefreshAccessTokenAPI, RegisterUserAPI, UpdateUser } from "../utils/api";
import { AddCustomerAPI, CustomersListAPI } from "../utils/api";
import toast from "react-hot-toast";

// add customer
export function useCreateCustomer() {
  return useMutation({
    mutationFn: (data) => AddCustomerAPI(data),

    onSuccess: (data, variables, context) => {
      console.log(data, variables, context);

      toast.success("Customer added successfully", {
        duration: 6000,
        position: "bottom-center",
      });
    },
  });
}

export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: CustomersListAPI,
    retry: 1,
    onError: (error) => {
      console.error("Error fetching books:", error);
      throw new Error("Error fetching books");
    },
  });
}
