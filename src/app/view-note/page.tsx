"use client";
import Navbar from "../components/navbar";
import ViewNote from "../components/Notes/viewNote";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const View = () => {
  const [flag, setFlag] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // redirect to login
    } else {
      setFlag(true);
    }
  }, []);

  return (
    <div>
      {flag && (
        <div>
          <Navbar />
          <ViewNote />
        </div>
      )}
    </div>
  );
};
export default View;
