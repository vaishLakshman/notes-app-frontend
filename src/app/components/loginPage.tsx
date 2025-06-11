"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { useLogin } from "../api/userAPIs/userLogin";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

type FormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const { login } = useLogin();
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  // eslint-disable-next-line
  const onFormSubmit = async (e: any) => {
    const res = await login(e.email, e.password);

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
      toast.success("Login Successful");
      router.push("/home");
    } else {
      // toast displaying invalid messgae
      toast.error("Error Logging in");
    }
  };

  return (
    <div className="min-h-lvh w-full flex items-center justify-center bg-orange-100 text-red-900 font-jetbrains">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-4/5 lg:w-2/5 py-4  rounded-2xl shadow-2xl shadow-yellow-900/40"
      >
        <h1 className="w-fit mx-auto text-2xl font-bold">Login</h1>
        <div className="w-full mx-auto">
          <div className="email-container flex gap-3 my-10 items-center">
            <label className="w-2/4 text-right">Email :</label>
            <div className="w-full">
              <input
                className="bg-orange-200/70 rounded-sm p-2 w-2/3 text-black"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 ml-1 text-red-500 text-sm absolute">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="password-container  flex gap-3 my-10 items-center">
            <label className="w-2/4 text-right">Password :</label>
            <div className="w-full ">
              <input
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
          <div className="button-container w-fit mx-auto text-red-900">
            <button
              type="submit"
              className="block mx-auto mb-5 p-3 text-lg font-semibold rounded-xl bg-orange-400 cursor-pointer"
            >
              Login
            </button>
            <div className="register w-fit flex gap-1 mx-auto">
              <p>Not yet registered?</p>
              <Link href={"/register"} className="underline font-semibold">
                Register here.
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
