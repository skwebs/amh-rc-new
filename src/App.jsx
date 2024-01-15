import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { useEffect, useState } from "react";

const App = () => {
  // const [localStore, setLocalStore] = useState(localStorage);
  // // window.addEventListener("storage", (event) => {
  // //   console.log("storage: event: ", event);
  // //   window.location.reload();
  // // });

  // useEffect(() => {
  //   const handleLocalStorageChange = () => {
  //     setLocalStore(localStorage);
  //   };

  //   window.addEventListener("storage", handleLocalStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleLocalStorageChange);
  //   };
  // }, []);

  useEffect(() => {
    // Check for localStorage clear events
    const handleLocalStorageChange = () => {
      if (localStorage.length === 0) {
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleLocalStorageChange);

    // Cleanup to avoid memory leaks
    return () => {
      window.removeEventListener("storage", handleLocalStorageChange);
    };
  }, []); // Empty dependency array runs effect only once

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
