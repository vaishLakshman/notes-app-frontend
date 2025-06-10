import { useState } from "react";
import api from "../../lib/axios";

export const useGetANote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getANote = async (noteId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/note/get-note", {
        params: {
          id: noteId,
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

  return { getANote, loading, error };
};
