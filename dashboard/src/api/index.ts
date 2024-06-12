import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:3100" });

const fetchUserData = async () => {
  try {
    const response = api.get("/api/users/admin/profile", {
      withCredentials: true,
    });
    return response;
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

const getAllDoctors = async () => {
  try {
    const response = await api.get("api/users/doctors", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
const getAllMessages = async () => {
  try {
    const response = await api.get("api/messages/getAllMessages", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
const getAllAppointment = async () => {
  try {
    const response = await api.get("api/appointments/getAll", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export {
  fetchUserData,
  LogoutUser,
  loginUser,
  getAllDoctors,
  getAllMessages,
  getAllAppointment,
};
