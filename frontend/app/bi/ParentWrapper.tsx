"use client";

interface ChildrenProps {
  children: React.ReactNode;
}

export default function ParentWrapper({ children }: Readonly<ChildrenProps>) {
  return (
    <div className="flex min-h-screen w-screen items-start justify-center px-8 md:p-0">
      {children}
    </div>
  );
}
