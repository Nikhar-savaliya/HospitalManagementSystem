import { loginUser } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { userContext } from "@/contexts/UserContext";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } =
    useContext(userContext);
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const handleUserLogin = async (e: any) => {
    e.preventDefault();
    if (!email || !password || !conformPassword) {
      return toast({
        title: "Please Fill Full Form!",
        variant: "destructive",
        duration: 1500,
      });
    }
    if (password !== conformPassword) {
      return toast({
        title: "Incorrect Password!",
        description: "Password does not match with conformPassword",
        variant: "destructive",
        duration: 1500,
      });
    }
    try {
      const axiosResponse = await loginUser({
        email,
        password,
        role: "patient",
      });
      if (axiosResponse.status == 200) {
        toast({
          title: axiosResponse.data.message,
          variant: "success",
          duration: 1500,
        });
        setIsAuthenticated(true);
        setUser(axiosResponse.data.user);
        console.log(axiosResponse.data.user);
        navigate("/");
      }
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
  return isAuthenticated ? (
    <Navigate to={"/"} />
  ) : (
    <section className="container flex items-center justify-center h-full max-w-2xl">
      <form
        onSubmit={handleUserLogin}
        className="flex flex-col gap-4 my-6 p-4 container"
      >
        <h1 className="h1 my-4  flex items-center justify-center">Login</h1>
        <Input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Lastname"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Email"
          value={conformPassword}
          onChange={(e) => setConformPassword(e.target.value)}
        />

        <Button className="flex items-center gap-1 col-span-1">Login</Button>
        <div className="flex items-center gap-1 w-fit mx-auto">
          <p className="text-sm text-muted-foreground">
            Don't have an Account?
          </p>
          <Link
            to={"/register"}
            className="text-sm text-muted-foreground underline"
          >
            Register
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
