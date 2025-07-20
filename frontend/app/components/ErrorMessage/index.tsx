import ParentWrapper from "@/bi/ParentWrapper";
import {
  API_ERROR_MESSAGE,
  API_ERROR_MESSAGE_HEADER,
  HTTP_STATUS_CODE,
} from "@/lib/constants/error-message";
import { S3_IMAGES } from "@/lib/constants/s3-images";
import Image from "next/image";
import { ReactNode } from "react";

interface ErrorMessageProps {
  image: ReactNode;
  header: string;
  message: string;
}

export function ErrorMessage({ image, header, message }: ErrorMessageProps) {
  return (
    <ParentWrapper>
      <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 text-center">
        {image}
        <h1 className="text-xl text-red-500 md:text-2xl">{header}</h1>
        <p className="md:text-md mt-2 text-sm text-gray-600">{message}</p>
      </div>
    </ParentWrapper>
  );
}

export const renderErrorMessageByStatus = (statusCode: number) => {
  let header = "";
  let message = "";

  switch (statusCode) {
    case HTTP_STATUS_CODE.UNAUTHENTICATED:
      header = API_ERROR_MESSAGE_HEADER.UNAUTHENTICATED;
      message = API_ERROR_MESSAGE.ERROR_401_UNAUTHENTICATED;
      break;
    case HTTP_STATUS_CODE.FORBIDDEN:
      header = API_ERROR_MESSAGE_HEADER.FORBIDDEN;
      message = API_ERROR_MESSAGE.ERROR_403_FORBIDDEN;
      break;
    case HTTP_STATUS_CODE.TOO_MANY_REQUESTS:
      header = API_ERROR_MESSAGE_HEADER.RATE_LIMIT;
      message = API_ERROR_MESSAGE.ERROR_429_RATE_LIMIT_EXCEEDED;
      break;
    default:
      (header = API_ERROR_MESSAGE_HEADER.UNEXPECTED_ERROR),
        (message = API_ERROR_MESSAGE.UNEXPECTED_ERROR);
      break;
  }

  return (
    <ErrorMessage
      image={
        <Image
          src={S3_IMAGES.RESTRICTED}
          alt="access restricted"
          width={400}
          height={400}
        />
      }
      header={header}
      message={message}
    />
  );
};
