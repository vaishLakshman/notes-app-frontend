"use client";
import EditProfilePage from "../components/editProfilePage";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const router = useRouter();
  const [flag, setFlag] = useState(false);
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
          <EditProfilePage />
        </div>
      )}
    </div>
  );
};
export default EditProfile;
