import { useEffect, useState } from "react";
import { NoteType, UserEmailProps } from "../types/types";
import { useGetSharedNotes } from "../api/noteAPIs/getSharedNotes";
import MiniNote from "./Notes/miniNote";

const SharedNotes = ({ userEmail }: UserEmailProps) => {
  const [noteData, setNoteData] = useState<NoteType[]>();
  const { getUserSharedNotes } = useGetSharedNotes();

  useEffect(() => {
    // get Own notes using userId
    getSharedNotes();
  }, []);

  const getSharedNotes = async () => {
    const res = await getUserSharedNotes(userEmail);
    if (res) {
      setNoteData(res);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold ml-5 underline mb-5">
        Shared Notes
      </h1>
      {noteData?.length ? (
        <div className="own-notes mb-10">
          <div className="mx-7 lg:m-0 lg:grid grid-cols-3 gap-7 place-items-center">
            {noteData.map((note: NoteType, index: number) => (
              <MiniNote key={index} note={note} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-10 lg:min-h-60">
          <h1 className="text-center text-2xl font-light italic">
            No notes added yet.
          </h1>
        </div>
      )}
    </div>
  );
};

export default SharedNotes;
