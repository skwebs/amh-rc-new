import { Outlet } from "react-router-dom";
import TopNavigation from "./components/Navigation/TopNavigation";
import Footer from "./components/Footer";
const RootLayout = () => {
  return (
    <>
      <div className="h-dvh flex flex-col">
        <TopNavigation />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};
export default RootLayout;
