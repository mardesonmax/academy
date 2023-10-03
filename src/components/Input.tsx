import { InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, ...rest }, ref) => {
    return (
      <label className="flex flex-col">
        <span>{label}</span>
        <input ref={ref} {...rest} className="bg-zinc-100 p-2 rounded-md" />
      </label>
    );
  }
);
