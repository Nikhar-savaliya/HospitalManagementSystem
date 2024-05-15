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

export { sendMessage };
