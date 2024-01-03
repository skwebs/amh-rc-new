import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  // const selector = useSelector((state) => state.auth.isAuthenticated);
  // @ts-ignore
  const { isAuthenticated } = useSelector((state) => state.auth);

  // if (isAuthenticated === undefined) {
  //   return "Loading ... ";
  // }

  if (isAuthenticated) {
    return <Navigate to=".." replace />;
  }

  return <Outlet />;
};
export default AuthLayout;
