import { useState } from "react";
import api from "../../lib/axios";

export const useEditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editUser = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put("/user/edit", {
        name,
        email,
        password,
      });
      if (response.status === 200) {
        const data = response.data;
        return data.userData;
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Unable to Edit Profile");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { editUser, loading, error };
};
