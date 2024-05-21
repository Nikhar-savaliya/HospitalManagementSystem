import { registerPatient } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { userContext } from "@/contexts/UserContext";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated } = useContext(userContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [nic, setNic] = useState("");
  const [gender, setGender] = useState("");

  const handlePatientRegister = async (e: any) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phone ||
      !nic ||
      !dob ||
      !gender
    ) {
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
      const response = await registerPatient({
        firstName,
        lastName,
        email,
        password,
        phone,
        nic,
        dob,
        gender,
      });

      if (response.status == 201) {
        toast({
          title: response.data.message,
          variant: "success",
          duration: 1500,
        });
      }
      navigate("/login");
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
    <section className="container h-full max-w-2xl pt-24">
      <h1 className="h1 my-4   flex items-center justify-center">Register</h1>
      <form
        onSubmit={handlePatientRegister}
        className="grid grid-cols-8 gap-4 my-6 p-4 container"
      >
        <Input
          type="text"
          className="col-span-4"
          placeholder="firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          className="col-span-4"
          placeholder="lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          type="email"
          className="col-span-8"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          className="col-span-4"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          className="col-span-4"
          placeholder="conform password"
          value={conformPassword}
          onChange={(e) => setConformPassword(e.target.value)}
        />
        <Input
          type="text"
          className="col-span-8"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          type="text"
          className="col-span-8"
          placeholder="NIC"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
        />
        <Input
          type="date"
          className="col-span-4 max-sm:col-span-8"
          placeholder="Date Of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <Select
          className="col-span-4 max-sm:col-span-8"
          onValueChange={(value: string) => setGender(value)}
        >
          <SelectTrigger className="w-[180px] col-span-4 max-sm:col-span-8">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Gender</SelectLabel>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="flex col-span-8 mx-auto w-full items-center gap-1">
          Login
        </Button>
        <div className="flex items-center gap-1 w-fit col-span-8 mx-auto">
          <p className="text-sm text-muted-foreground">
            Already have an Account?
          </p>
          <Link
            to={"/Login"}
            className="text-sm text-muted-foreground underline"
          >
            Login
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
