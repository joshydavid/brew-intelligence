import { format } from "date-fns";

export const formatDate = (date: Date) => {
  return format(date, "d MMMM yyyy");
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

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
