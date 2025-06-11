"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNote } from "@/app/api/noteAPIs/createNote";
import { NoteActionType } from "@/app/types/types";
import toast from "react-hot-toast";
import { useFindUser } from "@/app/api/userAPIs/findUser";

const noteSchema = z.object({
  title: z.string().min(1, "Enter a valid title"),
  email: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || val.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      {
        message: "Invalid email",
      }
    ),

  content: z.string().optional(),
  permission: z.string().optional(),
});

type noteData = z.infer<typeof noteSchema>;

const NewNote = ({ user_id, isOpen, setIsOpen }: NoteActionType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<noteData>({
    resolver: zodResolver(noteSchema),
  });

  const { findUserByEmail } = useFindUser();
  const { createNote } = useCreateNote();

  // eslint-disable-next-line
  const onFormSubmit = async (e: any) => {
    let note;
    if (e.email) {
      const user = await findUserByEmail(e.email);
      if (user) {
        note = {
          title: e.title,
          content: e.content,
          owner: user_id,
          collaborator: {
            user_email: e.email,
            permission: e.permission,
          },
        };
        const res = await createNote(note);

        if (res) {
          // toast message for success
          toast.success("New Note Created");
          setIsOpen(!isOpen);
        }
      } else {
        //toast message for invalid email
        toast.error("Invalid Email of Collaborator");
      }
    } else {
      note = {
        title: e.title,
        content: e.content,
        owner: user_id,
      };
      const res = await createNote(note);

      if (res) {
        // toast message for success
        toast.success("New Note Created");
        setIsOpen(!isOpen);
      } else {
        //toast message for invalid email
        toast.error("Error creating note");
      }
    }
  };

  return (
    <div className="absolute lg:pb-12 h-full w-full backdrop-blur-md">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className=" lg:w-3/7 mx-auto mt-15 pb-7 bg-orange-200 shadow-xl border- border-orange-300"
      >
        <div className="flex justify-end">
          <button
            className="cursor-pointer mr-5 mt-3"
            onClick={() => setIsOpen(!isOpen)}
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

        <h1 className="w-fit mx-auto text-2xl font-bold">New Note</h1>
        <div className="w-fit mx-auto ">
          <div className="email-container flex gap-3 my-5 mb-7 items-center">
            <label className="w-1/4 text-right">Title :</label>
            <div className="w-fit">
              <input
                placeholder="Title"
                className="bg-orange-100/70 rounded-sm p-2 min-w-[30rem] text-black"
                {...register("title")}
              />
              {errors.title && (
                <p className="mt-1 ml-1 text-red-500 text-sm absolute">
                  {errors.title.message}
                </p>
              )}
            </div>
          </div>
          <div className="password-container  flex gap-3 my-5 ">
            <label className="w-1/4 text-right">Body :</label>
            <div className="w-fit ">
              <textarea
                placeholder="Enter your note here"
                className="bg-orange-100/70 rounded-sm p-2 min-w-[30rem] text-black"
                rows={8}
                {...register("content")}
              />
            </div>
          </div>
          <div className="email-container flex gap-3 my-5 mb-7 items-center">
            <label className="w-1/4 text-right">Share with :</label>
            <div className="w-fit">
              <input
                placeholder="johndoe@gmail.com"
                className="bg-orange-100/70 rounded-sm p-2 min-w-[30rem] text-black"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 ml-1 text-red-500 text-sm absolute">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="email-container flex gap-3 my-5 items-center">
            <label className="w-1/4 text-right">Permission :</label>
            <div className="w-fit">
              <select
                className="bg-orange-100/70 px-2 py-1 rounded-lg min-w-[30rem]"
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

export default NewNote;
