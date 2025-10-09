import React from "react";
import { Skeleton } from "../ui/skeleton";

const AvailableJobsListSkeleton = () => {
  return (
    <div className="flex-1 grid-cols-4 grid ">
      <Skeleton className="w-[400px] h-[250px]" />
      <Skeleton className="w-[400px] h-[250px]" />
      <Skeleton className="w-[400px] h-[250px]" />
    </div>
  );
};

export default AvailableJobsListSkeleton;
