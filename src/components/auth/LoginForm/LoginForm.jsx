import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { LoginFormSchema } from "./LoginSchema";
import LoadingPage from "@/components/Loading";

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
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "00satish2015@gmail.com",
      password: "S@tish555@sk",
    },
    mode: "onTouched",
  });

  return (
    <>
      {isPending && <LoadingPage />}
      <div className="h-dvh  sm:flex sm:justify-center sm:items-center sm:p-20">
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-md p-6 xs:p-10 sm:max-w-md mx-auto w-full sm:border"
          // className="w-full md:max-w-sm mx-auto mt-5 shadow-md p-6 rounded-md border"
        >
          <div className="w-full text-center">
            <div className="mb-3 text-sky-700 font-semibold text-lg">
              Anshu Medical Hall
            </div>
            <h3 className="text-2xl">Sign In</h3>
            {/* <h1 className="text-gray-600">Use your AMH Account</h1> */}
          </div>

          {/* email */}
          <div className="my-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                required
                placeholder="Email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {err.email ? (
              <>
                <span className="text-red-600 text-xs">
                  {err.email?.message}
                </span>
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
          <div className="my-2">
            <label
              htmlFor="password"
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
                  aria-label={showPassword ? "Hide Password" : "Show Password"}
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

          <div className="flex justify-between items-center mt-7 ">
            <Link
              className="text-blue-600 font-semibold hover:text-blue-600 order-2"
              to={`/register`}
            >
              Create New
            </Link>
            <button
              type="submit"
              aria-label="Sign In"
              className="my-2 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      <DevTool control={control} />
    </>
  );
};
export default LoginForm;
