import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { BookAnAppointment, FetchAllDoctors } from "@/api/api";
import { Checkbox } from "./ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { toast } from "./ui/use-toast";

const departmentsList = [
  "Cardiology",
  "Dermatology",
  "Hematology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Otolaryngology (ENT)",
  "Radiology",
  "Psychiatry",
];

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState<CheckedState>(false);

  const [allDoctors, setAllDoctors] = useState([
    { firstName: "", lastName: "", doctorDepartment: "", _id: "" },
  ]);

  useEffect(() => {
    const getDoctors = async () => {
      const AxiosReponse = await FetchAllDoctors();
      setAllDoctors(AxiosReponse.data.doctors);
    };
    getDoctors();
  }, []);

  const handleBookAppointment = async (e: any) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !appointmentDate ||
      !department ||
      !doctorFirstName ||
      !doctorLastName ||
      !address
    ) {
      return toast({
        title: "Please Fill Full Form!",
        variant: "destructive",
        duration: 1500,
      });
    }
    if (firstName.length < 3) {
      return toast({
        title: "First Name Must be atleast 3 digits",
        variant: "destructive",
        duration: 1500,
      });
    }
    if (lastName.length < 3) {
      return toast({
        title: "Last Name Must be atleast 3 digits",
        variant: "destructive",
        duration: 1500,
      });
    }

    if (phone.length != 10) {
      return toast({
        title: "Phone Must be of 10 digits",
        variant: "destructive",
        duration: 1500,
      });
    }
    if (nic.length != 13) {
      return toast({
        title: "NIC Must be of 13 digits",
        variant: "destructive",
        duration: 1500,
      });
    }

    try {
      const axiosResponse = await BookAnAppointment({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date: appointmentDate,
        department,
        doctor_firstName: doctorFirstName,
        doctor_lastName: doctorLastName,
        hasVisited,
        address,
      });
      console.log(axiosResponse);
      if (axiosResponse.status == 200) {
        toast({
          title: axiosResponse.data.message,
          variant: "success",
          duration: 1500,
        });
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

  return (
    <div>
      {" "}
      <section className="container h-full max-w-5xl pt-24">
        <h1 className="h1 my-4 flex items-center justify-center">
          Appointment Form
        </h1>
        <form
          onSubmit={handleBookAppointment}
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
          <div className="col-span-4 flex items-center gap-2 relative">
            <Label
              htmlFor="DateOfBirth"
              className=" absolute left-3 text-muted-foreground"
            >
              BirthDate:
            </Label>
            <Input
              type="date"
              id="DateOfBirth"
              className="col-span-4 max-sm:col-span-8 text-nowrap pl-24"
              placeholder="Date Of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <Select onValueChange={(value: string) => setGender(value)}>
            <SelectTrigger className=" col-span-4 max-sm:col-span-8 text-muted-foreground">
              <SelectValue placeholder="Select Gender" className="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="col-span-4 flex items-center gap-2 relative">
            <Label
              htmlFor="appointmentDate"
              className=" absolute left-3 text-muted-foreground"
            >
              Appointment:
            </Label>
            <Input
              type="date"
              id="appointmentDate"
              className="col-span-4 max-sm:col-span-8 text-nowrap pl-28"
              placeholder="Appointment Date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>

          <Select onValueChange={(value: string) => setDepartment(value)}>
            <SelectTrigger className=" col-span-4 max-sm:col-span-8 text-muted-foreground">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {departmentsList.map((dep) => {
                  return (
                    <SelectItem value={dep} key={dep}>
                      {dep}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value: string) => {
              const [firstName, lastName] = value.split(" ");
              console.log(firstName, lastName);
              setDoctorFirstName(firstName);
              setDoctorLastName(lastName);
            }}
            disabled={department === "" ? true : false}
          >
            <SelectTrigger className=" col-span-4 max-sm:col-span-8 text-muted-foreground">
              <SelectValue placeholder="Select Doctor" />
            </SelectTrigger>
            <SelectContent>
              {department && (
                <SelectGroup>
                  {allDoctors.filter(
                    (doc) => doc.doctorDepartment === department
                  ).length !== 0 ? (
                    allDoctors
                      .filter((doc) => doc.doctorDepartment === department)
                      .map((doc) => {
                        return (
                          <SelectItem
                            value={`${doc.firstName} ${doc.lastName}`}
                            key={doc._id}
                          >
                            {doc.firstName} {doc.lastName}
                          </SelectItem>
                        );
                      })
                  ) : (
                    <SelectLabel>No doctor Found</SelectLabel>
                  )}
                </SelectGroup>
              )}
            </SelectContent>
          </Select>

          <textarea
            placeholder="Address"
            rows={7}
            value={address}
            className="col-span-8 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="flex items-center space-x-2 col-span-full">
            <Checkbox
              id="terms"
              checked={hasVisited}
              onCheckedChange={(checked: CheckedState) =>
                setHasVisited(checked)
              }
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Already visited Before?
            </label>
          </div>
          <Button className="flex col-span-8 mx-auto w-full items-center gap-1">
            Book Appointment
          </Button>
        </form>
      </section>
    </div>
  );
};

export default AppointmentForm;
