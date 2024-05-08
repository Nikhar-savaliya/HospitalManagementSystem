export interface UserSchemaType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nic: string;
  password: string;
  dob: Date;
  gender: string;
  role: Role;
  doctorDepartment?: string;
  doctorAvatarImage?: {
    public_id: string;
    url: string;
  };
}

export enum Gender {
  Male = "male",
  Female = "female",
}

export enum Role {
  Admin = "admin",
  Patient = "patient",
  Doctor = "doctor",
}
