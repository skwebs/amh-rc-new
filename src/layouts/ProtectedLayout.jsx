import { api } from "@/hooks/useApi";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  // @ts-ignore
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  if (token !== undefined && token !== null) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
export default ProtectedLayout;
