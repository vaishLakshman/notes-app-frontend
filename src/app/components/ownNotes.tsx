import { useEffect, useState } from "react";
import { NoteType, UserIdProps } from "../types/types";
import { useGetOwnNotes } from "../api/noteAPIs/getOwnNotes";
import MiniNote from "./Notes/miniNote";

const OwnNotes = ({ userId }: UserIdProps) => {
  const [noteData, setNoteData] = useState<NoteType[]>();
  const { getUserOwnedNotes } = useGetOwnNotes();

  useEffect(() => {
    // get Own notes using userId
    getOwnNotes();
  }, []);

  const getOwnNotes = async () => {
    const res = await getUserOwnedNotes(userId);
    if (res) {
      setNoteData(res);
    }
  };
  console.log("notess", noteData);

  return (
    <div>
      <h1 className="text-xl font-semibold ml-5 underline mb-5">My Notes</h1>
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

export default OwnNotes;
