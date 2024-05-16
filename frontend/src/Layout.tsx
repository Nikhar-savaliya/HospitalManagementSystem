import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <section>
      <Navbar />
      <Outlet />
    </section>
  );
};

export default Layout;
