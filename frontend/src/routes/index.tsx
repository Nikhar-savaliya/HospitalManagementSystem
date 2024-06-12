import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home";
import Appointment from "@/pages/Appointment";
import AboutUs from "@/pages/AboutUs";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Layout from "@/Layout";

const  AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "appointment", element: <Appointment /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default AppRouter;
