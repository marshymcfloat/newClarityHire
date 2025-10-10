import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPostedDate = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const days = Math.floor(diffInSeconds / 86400);
  if (days > 1) return `${days} days ago`;
  if (days === 1) return `1 day ago`;

  const hours = Math.floor(diffInSeconds / 3600);
  if (hours > 1) return `${hours} hours ago`;
  if (hours === 1) return `1 hour ago`;

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes > 0) return `${minutes} minutes ago`;

  return "Just now";
};

export const formatSalary = (min?: number | null, max?: number | null) => {
  if (!min && !max) return "Salary not disclosed";

  const format = (n: number) => `₱${(n / 1000).toFixed(0)}k`;

  if (min && max) return `${format(min)} - ${format(max)}`;
  if (min) return `From ${format(min)}`;
  if (max) return `Up to ${format(max)}`;
  return "Salary not disclosed";
};
