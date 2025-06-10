"use client";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-dvh bg-orange-100 flex items-center justify-center font-jetbrains text-red-900">
      <div>
        <div className="text-center mb-10">
          <h1 className="font-semibold text-lg mb-2">Note-It-Down</h1>
          <h3>A simple & minimalist web application to jot down your notes.</h3>
        </div>
        <div className="w-fit mx-auto flex gap-5">
          <button
            className="px-2 py-2 border-2 border-red-900 cursor-pointer hover:bg-red-900 hover:text-orange-100"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
          <button
            className="px-2 py-2 border-2 border-red-900 cursor-pointer hover:bg-red-900 hover:text-orange-100"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
