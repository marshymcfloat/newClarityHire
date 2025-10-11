import React from "react";
import { Skeleton } from "../ui/skeleton";

const AvailableJobsListSkeleton = () => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="h-[250px] w-full rounded-lg" />
      <Skeleton className="h-[250px] w-full rounded-lg" />
    </div>
  );
};

export default AvailableJobsListSkeleton;
