import ParentWrapper from "@/bi/ParentWrapper";

interface ErrorMessageProps {
  statusCode: number;
  header: string;
  message: string;
}

export function ErrorMessage({
  statusCode,
  header,
  message,
}: ErrorMessageProps) {
  return (
    <ParentWrapper>
      <div className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl font-semibold text-red-600">{statusCode}</h1>
        <h2 className="mt-4 text-xl font-semibold">{header}</h2>
        <p className="mt-2 text-lg text-gray-600">{message}</p>
      </div>
    </ParentWrapper>
  );
}
