import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:3100" });

const sendMessage = async ({
  firstName,
  lastName,
  email,
  phone,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}) => {
  try {
    const axiosResponse = await api.post(
      "/api/messages/send",
      { firstName, lastName, email, phone, message },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    return axiosResponse;
  } catch (error) {
    throw error;
  }
};

const registerPatient = async ({
  firstName,
  lastName,
  email,
  password,
  phone,
  nic,
  dob,
  gender,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  nic: string;
  dob: string;
  gender: string;
}) => {
  try {
    const axiosResponse = await api.post(
      "/api/users/patient/register",
      {
        firstName,
        lastName,
        email,
        password,
        phone,
        nic,
        dob,
        gender,
        role: "patient",
      },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    return axiosResponse;
  } catch (error) {
    throw error;
  }
};

const loginUser = async ({
  email,
  password,
  role,
}: {
  email: string;
  password: string;
  role: string;
}) => {
  try {
    const axiosResponse = await api.post(
      "/api/users/login",
      { email, password, role },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    return axiosResponse;
  } catch (error) {
    throw error;
  }
};

const LogoutUser = async () => {
  try {
    const response = api.get("/api/users/patient/logout", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export { sendMessage, loginUser, LogoutUser, registerPatient };
