import { clsx, type ClassValue } from "clsx";
import { format, formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";

export const formatDate = (date: Date): string => {
  return format(date, "d MMMM yyyy");
};

export const getTimeFrame = (createdAt: Date): string => {
  return formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });
};

export const sortByLatestDate = <T extends { [key: string]: any }>(
  listings: T[],
  dateField: string,
): T[] => {
  return [...listings].sort(
    (a, b) =>
      new Date(b[dateField] as string).getTime() -
      new Date(a[dateField] as string).getTime(),
  );
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
