import { useState } from "react";
import api from "../../lib/axios";

export const useGetOwnNotes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserOwnedNotes = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/note/own-notes", {
        params: {
          id: userId,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        return data.notesData;
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Cannot fetch notes");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getUserOwnedNotes, loading, error };
};
