import { MiniNoteType } from "@/app/types/types";
import { useRouter } from "next/navigation";



const MiniNote = ({ note }: MiniNoteType) => {
  const router = useRouter();
  const noteData = note;

  const handleClick = () => {
    router.push(`/view-note?id=${note._id}`);
  };
  return (
    <div
      className="bg-orange-200 mb-10 lg:m-0 lg:h-70 lg:w-80 w-fit px-5 overflow-hidden cursor-pointer rounded-xl shadow-xl"
      onClick={() => handleClick()}
    >
      <div className="my-5 w-full text-center">
        <h1 className="mb-3 font-bold">{noteData?.title}</h1>
        <h2
          className="text-justify h-40 overflow-hidden"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {noteData?.content}
        </h2>
      </div>
      <div className="w-full flex gap-2 text-xs font-thin italic  justify-end">
        <h3>Last updated on :</h3>
        <h3>{noteData?.last_updated?.split("T")[0]}</h3>
      </div>
    </div>
  );
};

export default MiniNote;
