import { useState } from "react";
import api from "../../lib/axios";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/user/login", { email, password });
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        return data.userData;
      }
       // eslint-disable-next-line
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
