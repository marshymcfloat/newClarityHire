"use client";

import { Job } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const jobColumns: ColumnDef<Job>[] = [
  { accessorKey: "title", header: "Job Title" },
  { accessorKey: "department", header: "Department" },
  { accessorKey: "createdAt", header: "Created at" },
  { accessorKey: "status", header: "Status" },
];
