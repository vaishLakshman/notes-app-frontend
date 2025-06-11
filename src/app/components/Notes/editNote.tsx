"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFindUser } from "@/app/api/userAPIs/findUser";
import { useGetANote } from "@/app/api/noteAPIs/getNote";
import { NoteType } from "@/app/types/types";
import { useEditNote } from "@/app/api/noteAPIs/editNote";
import { noteSchema } from "./newNote";
import toast from "react-hot-toast";

type editNoteData = z.infer<typeof noteSchema>;

const EditNote = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editNoteData>({
    resolver: zodResolver(noteSchema),
  });
  const router = useRouter();
  const noteId = useSearchParams().get("id") || '';

  const [noteData, setNoteData] = useState<NoteType>();
  const [collaborator, setCollaborator] = useState("");

  const { getANote } = useGetANote();
  const { findUserByEmail } = useFindUser();
  const { editNote } = useEditNote();

  useEffect(() => {
    // get note data using noteid
    getNoteData().then(getUserData);
  }, []);

  const getNoteData = async () => {
    const res = await getANote(noteId);

    if (res) {
      setNoteData(res);
      // toast login sucessful
    } else {
      // toast displaying invalid messgae
    }
  };

  const getUserData = async () => {
    if (noteData?.collaborator) {
      const res = await findUserByEmail(noteData?.collaborator?.user_email);
      if (res) setCollaborator(res.name);
    }
  };

  // eslint-disable-next-line
  const onFormSubmit = async (e: any) => {
    let note;
    if (e.email) {
      const user = await findUserByEmail(e.email);
      if (user) {
        note = {
          id: noteId,
          title: e.title,
          content: e.content,
          collaborator: {
            user_email: e.email,
            permission: e.permission,
          },
        };
        const res = await editNote(note);

        if (res) {
          // toast message for success
          toast.success("Note edited sucessfully!");
          router.push("/home");
        }
      } else {
        //toast message for invalid email
        toast.error("Invalid Email of Collaborator");
      }
    } else {
      note = {
        id: noteId,
        title: e.title,
        content: e.content,
      };
      const res = await editNote(note);
      console.log("edit data ->", res);

      if (res) {
        // toast message for success
        toast.success("Note edited successfully!");
        router.push("/home");
      } else {
        //toast message for invalid email
        toast.error("Error editing note");
      }
    }
  };

  return (
    <div className=" min-h-dvh mx-auto pb-7 bg-orange-100 overflow-hidden text-red-900 font-jetbrains">
      <form onSubmit={handleSubmit(onFormSubmit)} className="mt-15">
        <div className="flex justify-start">
          <button
            className="cursor-pointer ml-5 mt-7"
            onClick={() => router.push("/home")}
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
              <path d="M19 12H6M12 5l-7 7 7 7" />
            </svg>
          </button>
        </div>

        <h1 className="w-fit mx-auto text-2xl font-bold">Edit Note</h1>
        <div className="w-full mx-auto">
          <div className="email-container flex gap-3 my-10 items-center">
            <label className="w-2/4 text-right">Title :</label>
            <div className="w-full">
              <input
                placeholder={noteData?.title}
                className="bg-orange-200/50 rounded-sm p-2 w-2/3 text-black"
                {...register("title")}
              />
              {errors.title && (
                <p className="mt-1 ml-1 text-red-500 text-sm absolute">
                  {errors.title.message}
                </p>
              )}
            </div>
          </div>
          <div className="password-container  flex gap-3 my-10 ">
            <label className="w-2/4 text-right">Body :</label>
            <div className="w-full ">
              <textarea
                placeholder={noteData?.content}
                className="bg-orange-200/50 rounded-sm p-2 w-2/3 text-black"
                rows={8}
                {...register("content")}
              />
            </div>
          </div>
          <div className="email-container flex gap-3 my-10 items-center">
            <label className="w-2/4 text-right">Share with :</label>
            <div className="w-full">
              <input
                placeholder={collaborator}
                className="bg-orange-200/50 rounded-sm p-2 w-2/3 text-black"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 ml-1 text-red-500 text-sm absolute">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="email-container flex gap-3 my-10 items-center">
            <label className="w-2/4 text-right">Permission :</label>
            <div className="w-full">
              <select
                className="bg-orange-200/50 px-2 py-1 rounded-lg w-2/3"
                {...register("permission")}
              >
                <option value="view">View</option>
                <option value="edit">Edit</option>
              </select>
            </div>
          </div>

          <div className="button-container w-fit mx-auto text-red-900">
            <button
              type="submit"
              className="block mx-auto mb-2 p-3 px-5 text-lg font-semibold rounded-xl bg-orange-400 cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
