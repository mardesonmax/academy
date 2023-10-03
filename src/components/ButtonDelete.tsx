import { ButtonHTMLAttributes } from "react";
import { FiTrash } from "react-icons/fi";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function ButtonDelete({ ...rest }: Props) {
  return (
    <button {...rest} className="p-2 text-red-500 hover:text-red-600">
      <FiTrash />
    </button>
  );
}
