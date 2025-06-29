import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function rupiahFormat(value: number) {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
}

export function dateFormat(date: Date | null, format = "DD MMMM YYYY") {
  const dateToFormat = date ? dayjs(date) : dayjs();
  return dateToFormat.format(format);
}
