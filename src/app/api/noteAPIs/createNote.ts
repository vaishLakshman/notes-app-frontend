import { useState } from "react";
import api from "../../lib/axios";
import { NoteType } from "@/app/types/types";

export const useCreateNote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNote = async (note: NoteType) => {
    setLoading(true);
    setError(null);
    console.log("New note ->", note);

    try {
      const response = await api.post("/note/create-note", note);
      if (response.status === 201) {
        const data = response.data;
        return "Note created";
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Note creation failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createNote, loading, error };
};
