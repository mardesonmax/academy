"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "~/hooks/useAuth";

const validationSchema = z.object({
  email: z.string().nonempty("Campo obrigatório").email("E-mail inválido"),
  password: z.string().nonempty("Campo obrigatório"),
});

type FormProps = z.infer<typeof validationSchema>;

export default function Login() {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    values: {
      email: "",
      password: "",
    },
    resolver: zodResolver(validationSchema),
  });

  const submit = async (values: FormProps) => {
    await signIn(values);
  };

  return (
    <div className="h-screen flex">
      <div className="bg-gray-50 p-4 w-[400px] flex flex-col items-center justify-center">
        <div>
          <Image src="/assets/logo.png" alt="ACADEMY" width={200} height={52} />
        </div>
        <span className="text-gray-700 mt-4">Login</span>

        <form
          className="flex flex-col w-full gap-6 mt-4"
          onSubmit={handleSubmit(submit)}
        >
          <div className="flex flex-col relative">
            <input
              {...register("email")}
              type="text"
              placeholder="Usuário"
              className="bg-white rounded-lg p-4"
            />

            {errors.email && (
              <span className="text-sm absolute bottom-[-1.4rem] text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col relative">
            <input
              {...register("password")}
              type="password"
              placeholder="Senha"
              className="bg-white rounded-lg p-4"
            />

            {errors.password && (
              <span className="text-sm absolute bottom-[-1.4rem] text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            className="bg-blue-500 text-white mt-4 p-4 rounded-lg hover:bg-blue-600 duration-300"
            type="submit"
          >
            ENTRAR
          </button>
        </form>
      </div>

      <div className="flex flex-1 p-4 items-center justify-center">
        <Image
          src="/assets/undraw_login.png"
          alt="ACADEMY"
          width={756}
          height={460}
        />
      </div>
    </div>
  );
}
