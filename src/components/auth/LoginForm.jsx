import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import LoadingPage from "../Loading";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const LoginForm = () => {
  // const { mutate, data, error, isError, isPending, isSuccess } = useLogin();
  const { mutateAsync: mutateLogin, isPending, isError, error } = useLogin();
  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [apiErr, setApiErr] = useState();

  const onSubmit = async (data) => {
    const userData = await mutateLogin(data);
    console.log(userData);
    console.log(data);
  };

  const formSchema = z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, {
        message: "password must be atleast of 6 characters",
      }),
  });

  useEffect(() => {
    if (isError) {
      // @ts-ignore
      if (error.status === 422) {
        // @ts-ignore
        setApiErr(error.data.errors);
      } else {
        setApiErr(null);
      }
    }
  }, [error, isError]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors: err },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  return (
    <>
      {isPending && <LoadingPage />}

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-auto mt-5 shadow-md p-6 rounded-md border"
      >
        {/* email */}
        <div>
          <label
            htmlFor="email-address-icon"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <EnvelopeIcon className="size-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              defaultValue=""
              {...register("email")}
              autoComplete="email"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {err.email ? (
            <>
              <span className="text-red-600 text-xs">{err.email?.message}</span>
            </>
          ) : (
            <>
              {isError && apiErr?.email && (
                <>
                  <span className="text-red-600 text-xs">
                    {apiErr?.email.join(",")}
                  </span>
                </>
              )}
            </>
          )}
        </div>
        {/* password */}
        <div className="mt-2">
          <label
            htmlFor="email-address-icon"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>

          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <LockClosedIcon className="size-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              defaultValue=""
              {...register("password")}
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-auto">
              <button
                role="button"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="cursor-pointer size-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <EyeIcon className="cursor-pointer size-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>
          {err.password ? (
            <>
              <span className="text-red-600 text-xs">
                {err.password?.message}
              </span>
            </>
          ) : (
            <>
              {isError && apiErr && apiErr?.password && (
                <>
                  <span className="text-red-600 text-xs">
                    {apiErr?.password.join(",")}
                  </span>
                </>
              )}
            </>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
          <div>
            No have account{" "}
            <Link
              className="text-blue-500 hover:text-blue-600"
              to={`/register`}
            >
              Create New
            </Link>
          </div>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
};
export default LoginForm;
