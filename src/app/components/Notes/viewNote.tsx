"use client";
import { useRouter } from "next/navigation";
import { NoteActionType } from "./newNote";

const ViewNote = ({ isOpen, setIsOpen }: NoteActionType) => {
  const router = useRouter();
  const onFormSubmit = (e: any) => {
    console.log(e);
  };

  const handleEditNote = () => {
    router.push("/edit");
  };

  return (
    <div className="absolute lg:pb-12 w-full backdrop-blur-md">
      <div className="lg:w-3/5 mx-auto mt-15 pb-7 bg-orange-200 rounded-2xl border-5 border-orange-300">
        <div className="flex justify-end">
          <button
            className="cursor-pointer mr-5 mt-3 opacity-50 hover:opacity-100"
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
            className="cursor-pointer mr-5 mt-3 opacity-50 hover:opacity-100"
            onClick={() => setIsOpen(!isOpen)}
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

        <h1 className="w-fit mx-auto mb-5 text-3xl font-bold">Title</h1>
        <h2
          className="w-4/5 mx-auto mb-5 bg-orange-100 px-2 py-3 rounded-xl text-xl"
          style={{ whiteSpace: "pre-wrap" }}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quas
          at ratione? Nulla iusto voluptate, ab sunt incidunt ratione at, ex
          delectus omnis inventore eius? Dignissimos deleniti ipsam rem amet
          nostrum quae qui neque! Est minima nobis similique, aut libero et
          saepe laboriosam deleniti laudantium dolor minus ea, tempore velit
          aspernatur sed nisi magni veniam voluptate tempora eaque culpa quidem
          accusantium? Perspiciatis rerum blanditiis voluptas velit. Quaerat
          laudantium repellat accusantium pariatur sunt, laborum hic asperiores
          possimus illo consectetur. Quasi tenetur dolorum amet rem.
        </h2>
        <div className="flex gap-4 w-4/5 mx-auto mb-3 items-center">
          <h1 className="text-xl font-semibold ">Owner :</h1>
          <h2>hello hi bye</h2>
        </div>
        <div className="flex gap-4 w-4/5 mx-auto items-center">
          <h1 className="text-xl font-semibold">Shared with :</h1>
          <h2>hello hi bye</h2>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
