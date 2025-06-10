import { useState } from "react";
import api from "../../lib/axios";
import { EditNoteType } from "@/app/types/types";

export const useEditNote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editNote = async (note: EditNoteType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/note/edit-note", note);
      if (response.status === 200) {
        const data = response.data;
        return data.noteData;
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Edit failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { editNote, loading, error };
};
