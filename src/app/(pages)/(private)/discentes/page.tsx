import { ButtonDelete } from "~/components/ButtonDelete";
import { ButtonEdit } from "~/components/ButtonEdit";
import { ButtonPlus } from "~/components/ButtonPlus";
import { PageHeader } from "~/components/PageHeader";

export default function Discentes() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Todos os dicentes">
        <ButtonPlus />
      </PageHeader>

      <table className="w-full">
        <thead className="text-left text-zinc-600">
          <tr>
            <th className="px-2 py-1">Nome</th>
            <th>Semestre</th>
            <th>Turma</th>
            <th>Turno</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody className="text-zinc-500">
          <tr className="bg-zinc-100">
            <td className="p-2 font-medium whitespace-nowrap">Nome Dicente</td>
            <td>1º</td>
            <td>A</td>
            <td>Matutino</td>
            <td>
              <ButtonEdit />
              <ButtonDelete />
            </td>
          </tr>

          <tr>
            <td className="p-2 font-medium whitespace-nowrap">Nome Docente</td>
            <td>1º</td>
            <td>A</td>
            <td>Matutino</td>
            <td>
              <ButtonEdit />
              <ButtonDelete />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
