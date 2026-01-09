"use client";

// import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../app/services/api";
import { loginSchema } from "../app/schemas/auth.schema";
import Input from "../app/components/Input";

type LoginForm = {
  email: string;
  password: string;
};


export default function Home() {
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    const res = await api.post("http://localhost:8080/api/login", data);
    localStorage.setItem("token", res.data.token);
    // router.push("/dashboard");
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h1 className="text-xl font-bold mb-4 text-center">
          Login
        </h1>

        <Input
          label="Email"
          register={register("email")}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          register={register("password")}
          error={errors.password}
        />

        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2 transition"
        >
          {isSubmitting ? "Loading..." : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t" />
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t" />
        </div>

        {/* Register Button */}
        <Link
          href="/register"
          className="block w-full text-center border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded transition"
        >
          Create New Account
        </Link>
      </form>
    </div>
  );
}
