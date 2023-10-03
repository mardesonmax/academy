import { ReactNode } from "react";

interface Props {
  title: string;
  children?: ReactNode;
}

export function PageHeader({ title, children }: Props) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-blue-600 text-2xl font-bold">{title}</h2>

      {children}
    </div>
  );
}
