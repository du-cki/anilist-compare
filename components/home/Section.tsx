import React from "react";

type Props = {
  title?: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: Props) {
  return (
    <div className="space-y-3">
      <div className="mb-2">
        {title && <h2 className="text-2xl font-bold font-mono">{title}</h2>}
      </div>

      {children}
    </div>
  );
}
