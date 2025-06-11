import { useState } from "react";
import api from "../../lib/axios";

export const useFindByEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findUserByEmail = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/user/findByEmail", {
        params: {
          email: email,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        return data.userData;
      }
       // eslint-disable-next-line
    } catch (error: any) {
      setError(error.response?.data?.message || "Cannot fetch User");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { findUserByEmail, loading, error };
};
