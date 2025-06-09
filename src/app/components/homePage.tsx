"use client";
import { useState } from "react";
import MiniNote from "./Notes/miniNote";
import NewNote from "./Notes/newNote";
import ViewNote from "./Notes/viewNote";

const HomePage = () => {
  const [isNotes, setIsNotes] = useState(true);
  const [createNote, setCreateNote] = useState(false);
  const [viewNote, setViewNote] = useState(false);

  return (
    <div className="min-h-dvh bg-orange-100 pt-17 pb-15 text-red-900 font-jetbrains">
      {createNote && (
        <div>
          <NewNote isOpen={createNote} setIsOpen={setCreateNote} />
        </div>
      )}
      {viewNote && (
        <div>
          <ViewNote isOpen={viewNote} setIsOpen={setViewNote} />
        </div>
      )}
      <div className="create-note-container flex justify-between items-center my-4 mb-15">
        <div
          className="w-fit p-3 ml-3 flex gap-5 items-center cursor-pointer rounded-xl hover:bg-orange-200/50"
          onClick={
            () => setCreateNote(!createNote)
            // setViewNote(!viewNote)
          }
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
          <h2 className="font-semibold text-3xl">Create New Note</h2>
        </div>
        <div className="flex gap-3 mr-5  text-sm">
          <p>Total Notes :</p>
          <p>{"0"}</p>
        </div>
      </div>
      <div className="">
        {!isNotes ? (
          <div className="flex mt-20 items-center justify-center">
            <h1 className="text-2xl opacity-50 italic">No Notes added yet.</h1>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-7 place-items-center">
            <MiniNote />
            <MiniNote />
            <MiniNote />
            <MiniNote />
            <MiniNote />
            <MiniNote />
            <MiniNote />
            <MiniNote />
            <MiniNote />
            <MiniNote />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
