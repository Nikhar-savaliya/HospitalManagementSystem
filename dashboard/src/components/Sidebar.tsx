import { userContext } from "@/contexts/UserContext";
import {
  Home,
  LogOut,
  MenuIcon,
  MessageCircleMore,
  UserPlus,
  UserPlus2,
  Users2,
} from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "./ui/use-toast";
import { LogoutUser } from "@/api";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Sidebar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(userContext);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const axiosResponse = await LogoutUser();
      toast({
        title: axiosResponse.data.message,
        variant: "success",
        duration: 1500,
      });
      setIsAuthenticated(false);
    } catch (error: any) {
      console.log(error);
      const msg = error.response.data.message || error.message;
      return toast({
        title: msg,
        variant: "destructive",
        duration: 1500,
      });
    }
  };

  return (
    <nav className="border-b px-4 py-6 flex items-center justify-between">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon cursor={"pointer"} />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-6 px-4 text-lg font-semibold tracking-tight">
                Admin Dashboard
              </h2>
              <div className="flex flex-col gap-4">
                <Link to={"/"} className="flex items-center gap-2  p-2 rounded">
                  <Home /> Home
                </Link>
                <Link
                  to={"/doctors"}
                  className="flex items-center gap-2  p-2 rounded"
                >
                  <Users2 /> Doctors
                </Link>
                <Link
                  to={"/messages"}
                  className="flex items-center gap-2  p-2 rounded"
                >
                  <MessageCircleMore /> Messages
                </Link>
                <Link
                  to={"/add/doctor"}
                  className="flex items-center gap-2  p-2 rounded"
                >
                  <UserPlus2 /> Add New Doctor
                </Link>
                <Link
                  to={"/add/admin"}
                  className="flex items-center gap-2  p-4  rounded"
                >
                  <UserPlus /> Add New Admin
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {isAuthenticated ? (
        <Button
          onClick={handleLogout}
          variant={"destructive"}
          className="flex items-center gap-2 p-2 rounded"
        >
          <LogOut /> Logout
        </Button>
      ) : (
        <Link to={"/login"}> Login</Link>
      )}
    </nav>
  );
};

export default Sidebar;
