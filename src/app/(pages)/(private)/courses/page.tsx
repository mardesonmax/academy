"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Course, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { ButtonDelete } from "~/components/ButtonDelete";
import { ButtonEdit } from "~/components/ButtonEdit";
import { ButtonPlus } from "~/components/ButtonPlus";
import { Input } from "~/components/Input";
import { InputSelect } from "~/components/InputSelect";
import { Modal } from "~/components/Modal";
import { PageHeader } from "~/components/PageHeader";
import { api } from "~/services/api";

const validationSchema = z.object({
  userId: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().nonempty(),
});

type FormProps = z.infer<typeof validationSchema>;

interface OptionsProps {
  label: string;
  value: string;
}

export default function Curses() {
  const [openModal, setOpenModal] = useState(false);
  const [options, setOptions] = useState<OptionsProps[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const { register, handleSubmit, control } = useForm<FormProps>({
    values: {
      description: "",
      name: "",
      userId: "",
    },
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    (async () => {
      try {
        const [resUsers, resCourses] = await Promise.all([
          api<User[]>("/account", {
            method: "GET",
          }),
          api<Course[]>("/course", {
            method: "GET",
          }),
        ]);

        setCourses(resCourses);
        setOptions(
          resUsers
            .filter((user) => user.role === "COORDINATOR")
            .map((user) => ({ label: user.name, value: user.id }))
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const onSubmit = async (values: FormProps) => {
    try {
      const response = await api<Course>("/course", {
        method: "POST",
        body: JSON.stringify(values),
      });

      setCourses((state) => [...state, response]);
      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
    console.log(values);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <PageHeader title="Todos os cursos">
          <ButtonPlus onClick={() => setOpenModal(true)} />
        </PageHeader>

        <table className="w-full">
          <thead className="text-left text-zinc-600">
            <tr>
              <th className="px-2 py-1">Código</th>
              <th>Disciplina</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody className="text-zinc-500">
            {courses.map((course, index) => (
              <tr
                key={course.id}
                className={`${index % 2 === 0 ? "bg-zinc-100" : ""}`}
              >
                <td
                  className={`p-2 font-medium whitespace-nowrap ${
                    index % 2 === 1 ? "" : ""
                  }`}
                >
                  {course.code}
                </td>
                <td>{course.name}</td>
                <td>
                  <ButtonEdit />
                  <ButtonDelete />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title="Adicionar curso"
        isOpen={openModal}
        requestClose={setOpenModal}
      >
        <div className="flex flex-col gap-2">
          <Controller
            name="userId"
            control={control}
            render={({ field: { value, ...field } }) => (
              <InputSelect
                {...field}
                value={value}
                label="Coordenador"
                options={options}
              />
            )}
          />
          <Input {...register("name")} label="Nome" />
          <Input {...register("description")} label="Descrição" />

          <div className="flex justify-center flex-1">
            <button
              onClick={handleSubmit(onSubmit)}
              className="w-[200px] h-[40px] flex items-center justify-center bg-blue-500 text-white rounded-lg mt-4"
            >
              Adicionar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
