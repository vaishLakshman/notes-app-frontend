"use client";
import { useDeletNote } from "@/app/api/noteAPIs/deleteNote";
import { useGetANote } from "@/app/api/noteAPIs/getNote";
import { useFindUser } from "@/app/api/userAPIs/findUser";
import { NoteType, UserStorageProps, ViewNoteType } from "@/app/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ViewNote = ({ noteId }: ViewNoteType) => {
  const router = useRouter();
  const [noteData, setNoteData] = useState<NoteType>();
  // const [collaborator, setCollaborator] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [user, setUser] = useState<UserStorageProps>();
  const user_session = localStorage.getItem("user");

  const { getANote } = useGetANote();
  const { findUser } = useFindUser();
  const { deleteNote } = useDeletNote();

  useEffect(() => {
    if (user_session) setUser(JSON.parse(user_session));
    // get note data using noteid
    getNoteData();
  }, []);

  const getNoteData = async () => {
    const res = await getANote(noteId);

    if (res) {
      setNoteData(res);
      if (res?.owner) {
        setOwnerId(res?.owner);
        const data = await findUser(res?.owner);
        if (data) setOwnerName(data.name);
      }
    } else {
      // toast displaying invalid messgae
      toast.error("Error fetching note");
    }
  };

  // To display Collaborator names

  // const getAdditionalData = async () => {
  //   if (noteData?.collaborator) {
  //     const res = await findUserByEmail(noteData?.collaborator?.user_email);

  //     if (res) setCollaborator(res.name);
  //   }
  // };

  const handleEditNote = () => {
    if (user?.user_id === ownerId) {
      router.push(`/edit-note?id=${noteId}`);
    } else {
      toast.error("Not Authorized");
    }
  };

  const handleDeleteClick = () => {
    if (user?.user_id === ownerId) {
      setIsDelete(true);
    } else {
      toast.error("Not Authorized");
    }
  };

  const handleDelete = async () => {
    // function to delete note using note.id
    const res = await deleteNote(noteId);
    if (res) {
      toast.success("Note deleted successfully!");
      router.push("/home");
    } else {
      toast.error("Error deleting note");
    }
  };

  const handleCancel = () => {
    // go back to home
    router.push("/home");
  };

  return (
    <div className="w-full">
      {isDelete && (
        <div className="h-dvh w-full absolute backdrop-blur-md flex justify-center items-center">
          <div className="bg-orange-300 w-fit p-10 text-center rounded-xl shadow-lg text-red-900 font-jetbrains">
            <h1 className="mb-7 text-xl font-semibold">Are you sure?</h1>
            <div className="buttons-container flex gap-7 justify-between">
              <button
                className=" w-20 rounded-xl bg-orange-600/70 cursor-pointer font-bold"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="py-2 px-3 w-20 rounded-xl bg-orange-600/40 cursor-pointer font-bold"
                onClick={() => setIsDelete(!isDelete)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="h-dvh lg:w-full mx-auto pt-20 bg-orange-100 font-jetbrains text-red-900">
        <div className="flex justify-end mb-10 ">
          <button
            className="cursor-pointer mr-5 mt-3 "
            onClick={() => handleEditNote()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="53"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
            </svg>
          </button>
          <button
            className="cursor-pointer mr-5 mt-3"
            onClick={() => handleDeleteClick()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="53"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
          <button
            className="cursor-pointer mr-5 mt-3"
            onClick={() => handleCancel()}
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <h1 className="w-fit mx-auto mb-5 text-3xl font-bold">
          {noteData?.title || "Title"}
        </h1>
        <h2
          className="w-4/5 min-h-80 mx-auto mb-5 bg-orange-200 px-2 py-3 rounded-xl text-xl"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {noteData?.content || "No data"}
        </h2>
        <div className="flex gap-4 w-4/5 mx-auto mb-3 items-center text-xl font-semibold ">
          <h1>Owner :</h1>
          <h2>{ownerName.toLocaleUpperCase() || "N.A"}</h2>
        </div>
        {/* <div className="flex gap-4 w-4/5 mx-auto items-center">
          <h1 className="text-xl font-semibold">Shared with :</h1>
          <h2>{collaborator ? collaborator : "N.A"}</h2>
        </div> */}
      </div>
    </div>
  );
};

export default ViewNote;
