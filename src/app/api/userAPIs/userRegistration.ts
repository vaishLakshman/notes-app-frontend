import { useState } from "react";
import api from "../../lib/axios";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/user/register", {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        return data.userData;
      }
       // eslint-disable-next-line
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error };
};
