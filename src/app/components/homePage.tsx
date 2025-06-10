"use client";
import { useEffect, useState } from "react";
import NewNote from "./Notes/newNote";
import OwnNotes from "./ownNotes";
import SharedNotes from "./sharedNotes";
import { UserStorageProps } from "../types/types";

const HomePage = () => {
  const [createNote, setCreateNote] = useState(false);

  const [user, setUser] = useState<UserStorageProps>();
  const user_session = localStorage.getItem("user");
  useEffect(() => {
    if (user_session) setUser(JSON.parse(user_session));
  }, []);

  return (
    <div className="min-h-dvh bg-orange-100 pt-17 pb-15 text-red-900 font-jetbrains">
      {createNote && user && (
        <div className="">
          <NewNote
            isOpen={createNote}
            setIsOpen={setCreateNote}
            user_id={user.user_id}
          />
        </div>
      )}
      <div className="create-note-container my-4 mb-15">
        <div
          className="w-fit p-3 ml-3 flex gap-5 items-center cursor-pointer rounded-xl hover:bg-orange-200/50"
          onClick={() => setCreateNote(!createNote)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="53"
            height="53"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <h2 className="font-semibold hidden lg:block lg:text-3xl">
            Create New Note
          </h2>
        </div>
      </div>
      <div className="">
        {user && (
          <div>
            <OwnNotes userId={user.user_id} />
            <SharedNotes userEmail={user.user_email} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
