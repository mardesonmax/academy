import { ButtonHTMLAttributes } from "react";
import { FiPlus } from "react-icons/fi";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function ButtonPlus({ ...rest }: Props) {
  return (
    <button
      {...rest}
      className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
    >
      <FiPlus />
    </button>
  );
}
