import { useState } from "react";
import api from "../../lib/axios";

export const useGetSharedNotes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserSharedNotes = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/note/collab-notes", {
        params: {
          email: email,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        return data.notesData;
      }
       // eslint-disable-next-line
    } catch (error: any) {
      setError(error.response?.data?.message || "Cannot fetch notes");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getUserSharedNotes, loading, error };
};
