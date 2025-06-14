"use client";
import { useRouter } from "next/navigation";
import HomePage from "../components/homePage";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";

const Home = () => {
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
          <HomePage />
        </div>
      )}
    </div>
  );
};
export default Home;
