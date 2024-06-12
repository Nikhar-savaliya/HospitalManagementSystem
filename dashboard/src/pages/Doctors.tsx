import { getAllDoctors } from "@/api";
import React, { useEffect, useState } from "react";

const Doctors = () => {
  const [docs, setDocs] = useState<any>([]);

  useEffect(() => {
    const getAllDoc = async () => {
      const res = await getAllDoctors();
      setDocs(res.data.doctors);
    };
    getAllDoc();
  }, []);

  return (
    <div className="flex flex-col gap-4 m-10">
      {docs.length ? (
        docs.map((doc: any) => {
          return (
            <div key={doc._id} className="border p-4 bg-muted">
              <h1 className="font-bold">
                {doc.firstName} {doc.lastName}
              </h1>
              <p>Department: {doc.doctorDepartment}</p>
              <p>gender: {doc.gender}</p>
              <p>email: {doc.email}</p>
            </div>
          );
        })
      ) : (
        <p>Doctors not found</p>
      )}
    </div>
  );
};

export default Doctors;
