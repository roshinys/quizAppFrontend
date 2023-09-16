import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./Components/Auth/Auth";
import AlertNotification from "./Components/UI/AlertNotification/AlertNotification";
import Lobby from "./Components/Lobby/Lobby";
import Quiz from "./Components/Quiz/Quiz";
import Result from "./Components/Result/Result";
import { useEffect } from "react";
import socket from "./socket/socket";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/lobby" />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/lobby",
    element: (
      <RequireAuth redirectTo="/auth">
        <Lobby />
      </RequireAuth>
    ),
  },
  {
    path: "/quiz/:roomId",
    element: (
      <RequireAuth redirectTo="/auth">
        <Quiz />
      </RequireAuth>
    ),
  },
  {
    path: "/result/:gameId",
    element: (
      <RequireAuth redirectTo="/auth">
        <Result />
      </RequireAuth>
    ),
  },
]);

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
    return () => {
      socket.off("connect");
    };
  }, []);
  return (
    <>
      <RouterProvider router={router} />
      <AlertNotification />
    </>
  );
}

function RequireAuth(props) {
  const token = useSelector((state) => state.auth.token);
  return token !== undefined && token !== null ? (
    props.children
  ) : (
    <Navigate to={props.redirectTo} />
  );
}

export default App;
