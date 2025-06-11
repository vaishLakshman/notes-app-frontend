"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEditProfile } from "../api/userAPIs/userEdit";
import { UserStorageProps } from "../types/types";
import toast from "react-hot-toast";

const registerSchema = z
  .object({
    name: z.string().min(1, "Enter a valid name").optional(),
    password: z.string().min(5, "Password must be at least 5 characters"),
    repeat_password: z.string(),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Passwords do not match",
    path: ["repeat_password"],
  });

type FormData = z.infer<typeof registerSchema>;

const EditProfilePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();
  const [user, setUser] = useState<UserStorageProps>();
  const user_session = localStorage.getItem("user");
  const { editUser } = useEditProfile();
  useEffect(() => {
    if (user_session) setUser(JSON.parse(user_session));
  }, []);

  const onFormSubmit = async (e: any) => {
    const res = await editUser(e.name, e.email, e.repeat_password);

    if (res) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          user_id: res._id,
          name: res.name,
          user_email: res.email,
        })
      );
      // toast login sucessful
      toast.success("Profile Updated sucessfully!");
      router.push("/home");
    } else {
      // toast displaying invalid messgae
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-orange-100 text-red-900 font-jetbrains">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-4/5 lg:w-2/5 py-7  rounded-2xl shadow-2xl shadow-yellow-900/40"
      >
        <div className="flex justify-end mr-5">
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <h1 className="w-fit mx-auto text-2xl font-bold">Edit Profile</h1>
        <div className="w-full mx-auto">
          <div className="email-container flex gap-3 my-10 items-center">
            <label className="w-2/4 text-right">Name :</label>
            <div className="w-full">
              <input
                placeholder={user?.name}
                className="bg-orange-200/70 rounded-sm p-2 w-2/3 text-black"
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-1 ml-1 text-red-500 text-sm absolute">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
          {/* <div className="email-container flex gap-3 my-10 items-center">
            <label className="w-2/4 text-right">Email :</label>
            <div className="w-full">
              <input
                placeholder={user?.user_email}
                type="email"
                className="bg-orange-200/70 rounded-sm p-2 w-2/3 text-black"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 ml-1 text-red-500 text-sm absolute">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div> */}

          <div className="password-container  flex gap-3 my-10 items-center">
            <label className="w-2/4 text-right">New Password :</label>
            <div className="w-full ">
              <input
                placeholder="Password"
                type="password"
                className="bg-orange-200/70 rounded-sm p-2 w-2/3 text-black"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 ml-1 text-red-500 text-sm absolute">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="password-container  flex gap-3 my-10 items-center">
            <label className="w-2/4 text-right">Confirm Password :</label>
            <div className="w-full ">
              <input
                placeholder="Password"
                type="password"
                className="bg-orange-200/70 rounded-sm p-2 w-2/3 text-black"
                {...register("repeat_password")}
              />
              {errors.repeat_password && (
                <p className="mt-1 ml-1 text-red-500 text-sm absolute">
                  {errors.repeat_password.message}
                </p>
              )}
            </div>
          </div>
          <div className="button-container w-fit mx-auto text-red-900">
            <button
              type="submit"
              className="block mx-auto mb-2 p-3 text-lg font-semibold rounded-xl bg-orange-400 cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
