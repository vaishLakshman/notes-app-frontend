import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const newNoteSchema = z.object({
  title: z.string().min(1, "Enter a valid title"),
  email: z.string().email("Invalid Email"),
});

type newNoteData = z.infer<typeof newNoteSchema>;
export interface NoteActionType {
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
}

const NewNote = ({ isOpen, setIsOpen }: NoteActionType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newNoteData>({
    resolver: zodResolver(newNoteSchema),
  });

  const onFormSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <div className="absolute lg:pb-12 w-full backdrop-blur-md">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className=" lg:w-3/5 mx-auto mt-15 pb-7 bg-orange-200 rounded-2xl border-5 border-orange-300  "
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
        <div className="w-full mx-auto">
          <div className="email-container flex gap-3 my-10 items-center">
            <label className="w-2/4 text-right">Title :</label>
            <div className="w-full">
              <input
                className="bg-orange-100/70 rounded-sm p-2 w-2/3 text-black"
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
                className="bg-orange-100/70 rounded-sm p-2 w-2/3 text-black"
                rows={8}
              />
            </div>
          </div>
          <div className="email-container flex gap-3 my-10 items-center">
            <label className="w-2/4 text-right">Share with :</label>
            <div className="w-full">
              <input
                className="bg-orange-100/70 rounded-sm p-2 w-2/3 text-black"
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

export default NewNote;
