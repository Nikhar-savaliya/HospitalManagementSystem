import { getAllAppointment } from "@/api";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [appointment, setAppointment] = useState<any>([]);

  useEffect(() => {
    const getAllMsg = async () => {
      const res = await getAllAppointment();
      setAppointment(res.data.allAppointment);
    };
    getAllMsg();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight m-10">
        All Appointment
      </h1>
      <div className="grid grid-cols-2 gap-4 m-10">
        {appointment.length ? (
          appointment.map((app: any) => {
            return (
              <div key={app._id} className="border p-4 bg-muted">
                <p className="text-2xl font-semibold"> {app.message}</p>
                <h1 className="">
                  {app.firstName} {app.lastName}
                </h1>
                <p>email: {app.email}</p>
                <p>phone: {app.phone}</p>
                <p>appointment date: {app.appointment_date}</p>
                <p>department: {app.department}</p>
              </div>
            );
          })
        ) : (
          <p>messages not found</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
