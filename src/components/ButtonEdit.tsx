import { ButtonHTMLAttributes } from "react";
import { FiEdit } from "react-icons/fi";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function ButtonEdit({ ...rest }: Props) {
  return (
    <button {...rest} className="p-2 text-blue-500 hover:text-blue-600">
      <FiEdit />
    </button>
  );
}
