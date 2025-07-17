"use client";

interface ChildrenProps {
  children: React.ReactNode;
}

export default function ParentWrapper({ children }: Readonly<ChildrenProps>) {
  return (
    <div className="flex w-screen items-start justify-center px-6 md:p-0">
      {children}
    </div>
  );
}
