import { SelectHTMLAttributes, forwardRef } from "react";

interface Pros extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
}

export const InputSelect = forwardRef<HTMLSelectElement, Pros>(
  ({ label, options, ...rest }, ref) => {
    return (
      <label className="flex flex-col">
        <span>{label}</span>

        <select {...rest} ref={ref} className="bg-zinc-100 p-2 rounded-md">
          <option value="">selecionar</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }
);
