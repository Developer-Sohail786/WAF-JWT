import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Portfolio from "./Pages/Portfolio";
import RequireAuth from "./Components/RequireAuth";
import "./App.css";

function App() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, //using app as root layout wraper
    children: [
      {
        index: true, //default route '/'
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "portfolio",
            element: <Portfolio />,
          },
        ],
      },
    ],
  },
]);

export default App;
