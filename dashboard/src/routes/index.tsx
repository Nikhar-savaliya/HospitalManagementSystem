import App from "@/App";
import AddAdmin from "@/pages/AddAdmin";
import AddDoctor from "@/pages/AddDoctor";
import Dashboard from "@/pages/Dashboard";
import Doctors from "@/pages/Doctors";
import Login from "@/pages/Login";
import Messages from "@/pages/Messages";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router-dom";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "add/doctor", element: <AddDoctor /> },
      { path: "add/admin", element: <AddAdmin /> },
      { path: "messages", element: <Messages /> },
      { path: "login", element: <Login /> },
      { path: "doctors", element: <Doctors /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default AppRouter;
