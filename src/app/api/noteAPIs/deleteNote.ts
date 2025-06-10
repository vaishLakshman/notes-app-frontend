import { useState } from "react";
import api from "../../lib/axios";

export const useDeletNote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteNote = async (noteId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete("/note/delete-note", {
        params: {
          id: noteId,
        },
      });
      if (response.status === 204) {
        return "Note deleted successfully";
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Unable to Edit Profile");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { deleteNote, loading, error };
};
