"use client";

import { Badge } from "@/components/ui/badge";
import { Job, JobStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

export const jobColumns: ColumnDef<Job>[] = [
  { accessorKey: "title", header: "Job Title" },
  { accessorKey: "department", header: "Department" },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: JobStatus = row.getValue("status");

      return (
        <Badge
          className={clsx("capitalize", {
            "bg-green-400 text-white": status === "PUBLISHED",
            "bg-yellow-400 text-black": status === "DRAFT",
            "bg-gray-400 text-white": status === "ARCHIVED",
          })}
        >
          {status.toLowerCase()}
        </Badge>
      );
    },
  },
];
