import { lazy } from "react";
// import RootLayout from "@/RootLayout";
// import AuthLayout from "@/layouts/AuthLayout";
// import ProtectedLayout from "@/layouts/ProtectedLayout";
// import About from "@/pages/About";
// import Contact from "@/pages/Contact";
// import Home from "@/pages/Home";
// import Licensing from "@/pages/Licensing";
// import PageNotFound from "@/pages/PageNotFound";
// import PrivacyPolicy from "@/pages/PrivacyPolicy";
// import Login from "@/pages/auth/Login";
// import Register from "@/pages/auth/Register";
// import Profile from "@/pages/protected/Profile";
// import Settings from "@/pages/protected/Settings";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import LazyLoad from "@/components/LazyLoad";
// ======================================
// Layout Components
// ======================================
import RootLayout from "@/RootLayout";
import AuthLayout from "@/layouts/AuthLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import ErrorPage from "@/components/ErrorPage";

// ======================================
// General Pages
// ======================================

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
const Licensing = lazy(() => import("@/pages/Licensing"));
// ======================================
// Guest Pages
// ======================================
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
Register
// ======================================
// Private Pages
// ======================================

const Settings = lazy(() => import("@/pages/protected/Settings"));
const Profile = lazy(() => import("@/pages/protected/Profile"));
const Customers = lazy(() => import("@/pages/protected/Customers"));

const MainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      {/* auth page */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <LazyLoad>
              <Login />
            </LazyLoad>
          }
        />
        <Route
          path="/register"
          element={
            <LazyLoad>
              <Register />
            </LazyLoad>
          }
        />
      </Route>

      {/* protected page */}
      <Route
        element={
          <LazyLoad>
            <ProtectedLayout />
          </LazyLoad>
        }
      >
        <Route
          index
          element={
            <LazyLoad>
              <Home />
            </LazyLoad>
          }
        />
        <Route
          path="/profile"
          element={
            <LazyLoad>
              <Profile />
            </LazyLoad>
          }
        />
        <Route
          path="/settings"
          element={
            <LazyLoad>
              <Settings />
            </LazyLoad>
          }
        />
        <Route
          path="/customers"
          element={
            <LazyLoad>
              <Customers />
            </LazyLoad>
          }
        />
        {/* end of protected route */}
      </Route>
      {/* public page */}
      <Route
        path="/about"
        element={
          <LazyLoad>
            <About />
          </LazyLoad>
        }
      />
      <Route
        path="/contact"
        element={
          <LazyLoad>
            <Contact />
          </LazyLoad>
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <LazyLoad>
            <PrivacyPolicy />
          </LazyLoad>
        }
      />
      <Route
        path="/licensing"
        element={
          <LazyLoad>
            <Licensing />
          </LazyLoad>
        }
      />
      {/*404 page */}
      <Route
        path="*"
        element={
          <LazyLoad>
            <PageNotFound />
          </LazyLoad>
        }
      />
    </Route>
  )
);

export default MainRouter;
