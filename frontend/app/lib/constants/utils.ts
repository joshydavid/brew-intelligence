import { format } from "date-fns";

export const formatDate = (date: Date) => {
  return format(date, "d MMMM yyyy");
};

export const sortByLatestDate = (listings: any[], dateField: string) => {
  return [...listings].sort(
    (a, b) =>
      new Date(b[dateField]).getTime() - new Date(a[dateField]).getTime(),
  );
};

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
