import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { userContext } from "./contexts/UserContext";
import { fetchUserData } from "./api";
import Sidebar from "./components/Sidebar";

function App() {
  const { isAuthenticated, setUser, setIsAuthenticated } =
    useContext(userContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchUserData();
        setIsAuthenticated(true);
        console.log(response);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <section>
      <Sidebar />
      <Outlet />
    </section>
  );
}

export default App;
