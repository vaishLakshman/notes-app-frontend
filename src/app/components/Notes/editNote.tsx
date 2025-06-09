"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const newNoteSchema = z.object({
  title: z.string().min(1, "Enter a valid title"),
  email: z.string().email("Invalid Email"),
});

type editNoteData = z.infer<typeof newNoteSchema>;

const EditNote = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editNoteData>({
    resolver: zodResolver(newNoteSchema),
  });
  const router = useRouter();

  const onFormSubmit = (e: any) => {
    console.log(e);
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
                className="bg-orange-200/50 rounded-sm p-2 w-2/3 text-black"
                rows={8}
              />
            </div>
          </div>
          <div className="email-container flex gap-3 my-10 items-center">
            <label className="w-2/4 text-right">Share with :</label>
            <div className="w-full">
              <input
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
