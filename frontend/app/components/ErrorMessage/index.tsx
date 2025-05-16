import ParentWrapper from "@/bi/ParentWrapper";
import { ReactNode } from "react";

interface ErrorMessageProps {
  image: ReactNode;
  statusCode: number;
  header: string;
  message: string;
}

export function ErrorMessage({
  image,
  statusCode,
  header,
  message,
}: ErrorMessageProps) {
  return (
    <ParentWrapper>
      <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 text-center">
        {image}
        <h1 className="text-3xl font-semibold text-red-500">
          {statusCode} {header}
        </h1>
        <p className="mt-2 text-lg text-gray-600">{message}</p>
      </div>
    </ParentWrapper>
  );
}
