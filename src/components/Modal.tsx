import { ReactNode } from "react";
import { FiX } from "react-icons/fi";

interface Props {
  isOpen: boolean;
  requestClose: (open: false) => void;
  children?: ReactNode;
  title: string;
}

export function Modal({ isOpen, requestClose, title, children }: Props) {
  return (
    <div
      className={` ${
        isOpen ? "" : "opacity-0 invisible"
      } fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] flex items-center justify-center p-4`}
    >
      <div className="bg-white min-w-[400px] min-h-[300px] rounded-md p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-zinc-700 text-2xl font-medium">{title}</h2>
          <button
            onClick={() => requestClose(false)}
            className="flex justify-center items-center text-2xl text-red-500 hover:text-red-600"
          >
            <FiX />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
