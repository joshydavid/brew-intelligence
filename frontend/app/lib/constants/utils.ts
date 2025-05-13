import { clsx, type ClassValue } from "clsx";
import { format, formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export const formatDate = (date: Date): string => {
  return format(date, "d MMMM yyyy");
};

export const getTimeFrame = (createdAt: Date): string => {
  return formatDistanceToNow(createdAt, {
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

export const handleSuccess = (
  successMessage: string,
  setOpen: (open: boolean) => void,
) => {
  toast.success(successMessage);
  setOpen(false);
};
