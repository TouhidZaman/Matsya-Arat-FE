import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

import routes from "./routes/routes";
import auth from "./utils/firebase.init";
import { useAppDispatch } from "./app/hooks";
import { setUser, setUserLoading } from "./features/authSlice";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(setUserLoading());
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        dispatch(
          setUser({
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      }
    });
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
