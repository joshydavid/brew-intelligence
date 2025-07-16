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
        <h1 className="text-xl text-red-500 md:text-2xl">
          {statusCode} {header}
        </h1>
        <p className="md:text-md mt-2 text-sm text-gray-600">{message}</p>
      </div>
    </ParentWrapper>
  );
}
