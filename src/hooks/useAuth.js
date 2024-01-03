import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/queryClient";
import { useNavigate } from "react-router-dom";
// import { GetCurrentUser, LoginUserAPI, LogoutUserAPI, RefreshAccessTokenAPI, RegisterUserAPI, UpdateUser } from "../utils/api";
import { LoginUserAPI, LogoutUserAPI, RegisterUserAPI } from "../utils/api";
import toast from "react-hot-toast";
import { login, logout } from "@/stores/redux/auth-slice";
import { useDispatch } from "react-redux";

// SIGN UP
export function useSignUp() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => RegisterUserAPI(data),

    onSuccess: (data, variables, context) => {
      console.log(data, variables, context);

      toast.success("Account created successfully", {
        duration: 6000,
        position: "bottom-center",
      });
      // Redirect to the login page after sign-up
      navigate("/login");
    },
  });
}

// // LOGIN
// export function useLogin() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   return useMutation({
//     mutationFn: (data) => LoginUserAPI(data),

//     // onMutate: (variables) => {
//     //   console.log(variables);
//     // },

//     onSuccess: (data, variables, context) => {
//       console.log(data, variables, context);

//       dispatch(login({ token: data.token, user: data.user }));

//       queryClient.invalidateQueries({ queryKey: ["currentUser"] });

//       toast.success("Logged In successfully.", {
//         duration: 6000,

//         position: "bottom-center",
//       });

//       navigate("/");
//     },

//     onError: (error, variables, context) => {
//       const e = error.response.data.errors;

//       console.log(JSON.stringify(e, null, 2));

//       console.log(typeof e === "object");
//       if (typeof e === "string") {
//         toast.error(`Error ${JSON.stringify(e)}`, {
//           duration: 6000,
//           position: "bottom-center",
//         });
//       }

//       if (typeof e === "object") {
//         toast.error(`Error ${e.join(",")}`, {
//           duration: 6000,
//           position: "bottom-center",
//         });
//       }
//       console.log("type of errors", typeof e);
//       console.log("error", error, "variables", variables, "context", context);
//       toast.error(`Error ${JSON.stringify(error.response.data)}`, {
//         duration: 6000,
//         position: "bottom-center",
//       });
//     },
//     // onSettled: (data, error, variables, context) => {
//     //   // Error or success... doesn't matter!
//     //   console.log("data", data, "error", error, "variables", variables, "context", context);
//     // },
//   });
// }

// LOGIN
export function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => LoginUserAPI(data),

    onSuccess: (data) => {
      console.log(data);
      dispatch(login({ token: data.data.token, user: data.data.user }));
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Logged In successfully.", {
        duration: 6000,
        position: "bottom-center",
      });
      navigate("/");
    },

    onError: (error) => {
      // @ts-ignore
      toast.error(error.data.message, {
        duration: 6000,
        position: "bottom-center",
      });
      console.error("Login error:", error);
    },
  });
}

export function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => LogoutUserAPI(),

    onSuccess: (data) => {
      console.log(data);
      dispatch(logout());
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Logged Out successfully.", {
        duration: 6000,
        position: "bottom-center",
      });
      navigate("/login");
    },

    onError: (error) => {
      // @ts-ignore
      toast.error(error.data.message, {
        duration: 6000,
        position: "bottom-center",
      });
      console.error("Login error:", error);
    },
  });
}
