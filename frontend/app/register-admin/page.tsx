"use client";

// import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../services/api";
import { registerSchemaAdmin } from "../schemas/auth.schema";
import Input from "../components/Input";

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  role: string;
};

const RegisterPage = () => {
  // const router = useRouter();
  const { register, handleSubmit, formState: { errors } } =
    useForm<RegisterForm>({ resolver: zodResolver(registerSchemaAdmin),
        defaultValues: {
            role: "ADMIN",
        },
     });

  const onSubmit = async (data: RegisterForm) => {
    await api.post("http://localhost:8080/api/register", data);
    window.location.href = "/";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Register Admin</h1>

      <Input label="Username" register={register("username")} error={errors.username} />
      <Input label="Email" register={register("email")} error={errors.email} />
      <Input
        label="Password"
        type="password"
        register={register("password")}
        error={errors.password}
      />

      <button className="bg-green-600 text-white w-full py-2 rounded">
        Register
      </button>
    </form>
  );
};

export default RegisterPage;