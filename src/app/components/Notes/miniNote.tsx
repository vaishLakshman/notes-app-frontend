const MiniNote = () => {
  return (
    <div
      className="bg-orange-200 lg:h-70 lg:w-80 w-fit px-5 overflow-hidden cursor-pointer rounded-xl shadow-xl"
      onClick={() => console.log("Clicked")}
    >
      <div className="my-5 w-full text-center">
        <h1 className="mb-3">Title</h1>
        <h2
          className="text-justify h-40 overflow-hidden"
          style={{ whiteSpace: "pre-wrap" }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
          similique cum, autem modi dolore placeat officia iste adipisci aperiam
          quas? Ratione reiciendis eaque unde quos qui illo laboriosam sit
          neque. Enim dicta eligendi odio quisquam error accusamus aperiam nulla
          repellat porro saepe consequuntur, doloribus ratione natus minus
          quibusdam deleniti tempora dolorum qui. Eos ullam quod ad, mollitia
          maiores atque quia.
        </h2>
      </div>
      <div className="w-full flex gap-2 text-xs font-thin italic opacity-70 justify-end">
        <h3>Last updated on :</h3>
        <h3>{"isdb"}</h3>
      </div>
    </div>
  );
};

export default MiniNote;
