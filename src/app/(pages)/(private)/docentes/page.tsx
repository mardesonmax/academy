"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ButtonDelete } from "~/components/ButtonDelete";
import { ButtonEdit } from "~/components/ButtonEdit";
import { ButtonPlus } from "~/components/ButtonPlus";
import { Input } from "~/components/Input";
import { Modal } from "~/components/Modal";
import { PageHeader } from "~/components/PageHeader";
import { api } from "~/services/api";

const validationSchema = z.object({
  registration: z.string().nonempty(),
  cpf: z.string().nonempty(),
  rg: z.string().nonempty(),
  name: z.string().nonempty(),
  dateOfbirth: z.string(),
  address: z.string().nonempty(),
  phone: z.string().nonempty(),
  email: z.string().nonempty(),
});

type FormProps = z.infer<typeof validationSchema>;

export default function Docentes() {
  const [openModal, setOpenModal] = useState(false);
  const [docentes, setDocentes] = useState<User[]>([]);

  const { register, handleSubmit } = useForm<FormProps>({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    (async () => {
      try {
        const resUsers = await api<User[]>("/account", {
          method: "GET",
        });
        setDocentes(resUsers.filter((user) => user.role === "COORDINATOR"));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const onSubmit = async (values: FormProps) => {
    try {
      const response = await api<User>("account", {
        method: "POST",
        body: JSON.stringify({ ...values, role: "COORDINATOR" }),
      });

      setDocentes((start) => [...start, response]);
      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <PageHeader title="Todos os docentes">
          <ButtonPlus onClick={() => setOpenModal(true)} />
        </PageHeader>

        <table className="w-full">
          <thead className="text-left text-zinc-600">
            <tr>
              <th>Matrícula</th>
              <th className="px-2 py-1">Nome</th>
              <th>Turma</th>
              <th>Turno</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody className="text-zinc-500">
            {docentes.map((docente, index) => (
              <tr
                key={docente.id}
                className={`${index % 2 === 0 ? "bg-zinc-100" : ""}`}
              >
                <td>{docente.registration}</td>
                <td className="p-2 font-medium whitespace-nowrap">
                  {docente.name}
                </td>
                <td>A, B, C</td>
                <td>Matutino</td>
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
        title="Adicionar docente"
        isOpen={openModal}
        requestClose={setOpenModal}
      >
        <div className="flex flex-col gap-2">
          <Input
            {...register("registration")}
            type="number"
            label="Matrícula"
          />
          <Input {...register("cpf")} label="CPF" />
          <Input {...register("rg")} label="RG" />
          <Input {...register("name")} label="Nome" />
          <Input
            {...register("dateOfbirth")}
            type="date"
            label="Data de nascimento"
          />
          <Input {...register("address")} label="Endereço" />
          <Input {...register("phone")} label="Telefone" />
          <Input {...register("email")} label="E-mail" />

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
