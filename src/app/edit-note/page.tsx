"use client";
import Navbar from "../components/navbar";
import EditNote from "../components/Notes/editNote";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Edit = () => {
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
          <EditNote />
        </div>
      )}
    </div>
  );
};
export default Edit;
