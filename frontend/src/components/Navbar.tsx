import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { MouseEventHandler, useContext } from "react";
import { userContext } from "@/contexts/UserContext";
import { LogoutUser } from "@/api/api";
import { toast } from "./ui/use-toast";
import { CalendarClock, Home, Menu, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(userContext);
  const navigate = useNavigate();

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
    <div className="w-screen border-b-2">
      <div className="container p-4">
        {/* Desktop Naviagtion */}
        <div className="max-md:hidden flex items-center justify-between">
          <span className="h1 text-lg text-secondary-foreground ">
            S&S Care
          </span>
          <nav className="flex items-center gap-8 font-medium">
            <Link
              to={"/"}
              className="flex items-center gap-1 text-secondary-foreground/60 hover:text-secondary-foreground"
            >
              <Home width={18} /> Home
            </Link>
            <Link
              to={"/about-us"}
              className="flex items-center gap-1 text-secondary-foreground/60 hover:text-secondary-foreground"
            >
              <Users width={18} />
              About Us
            </Link>
            <Link
              to={"/appointment"}
              className="flex items-center gap-1 text-secondary-foreground/60 hover:text-secondary-foreground"
            >
              <CalendarClock width={18} /> Appointment
            </Link>
          </nav>
          {isAuthenticated ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <div className="flex gap-2 items-centers">
              <Button
                variant={"secondary"}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
              <Button onClick={() => navigate("/login")}>Login</Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
        />
      </div>
    </div>
  );
};

const MobileNavigation = ({
  isAuthenticated,
  handleLogout,
}: {
  isAuthenticated: Boolean;
  handleLogout: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <nav className="md:hidden flex items-center justify-between">
      <span className="h1 text-lg text-secondary-foreground ">S&S Care</span>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-1 bg-accent rounded-sm">
          <Menu width={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 ">
          <DropdownMenuItem>
            <Link
              to={"/"}
              className="flex items-center gap-1 text-secondary-foreground/60 hover:text-secondary-foreground"
            >
              <Home width={18} /> Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              to={"/about-us"}
              className="flex items-center gap-1 text-secondary-foreground/60 hover:text-secondary-foreground"
            >
              <Users width={18} />
              About Us
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              to={"/appointment"}
              className="flex items-center gap-1 text-secondary-foreground/60 hover:text-secondary-foreground"
            >
              <CalendarClock width={18} /> Appointment
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {isAuthenticated ? (
            <>
              <Button
                className="w-full"
                variant={"ghost"}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <DropdownMenuItem>
                <Link to={"/register"}>Register</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={"/login"}>Login</Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;
