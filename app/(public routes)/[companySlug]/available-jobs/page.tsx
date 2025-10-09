import AvailableJobsDataContainer from "@/components/available-jobs/AvailableJobsDataContainer";
import AvailableJobsListSkeleton from "@/components/available-jobs/AvailableJobsListSkeleton";
import { Suspense } from "react";

type Params = Promise<{ companySlug: string }>;

const page = async ({ params }: { params: Params }) => {
  const { companySlug } = await params;

  return (
    <>
      <div className="flex flex-col w-full h-full gap-2 p-4">
        <h1 className="text-2xl capitalize">
          available jobs at <span className="font-medium">{companySlug}</span>
        </h1>

        <Suspense fallback={<AvailableJobsListSkeleton />}>
          <AvailableJobsDataContainer companySlug={companySlug} />
        </Suspense>
      </div>
    </>
  );
};

export default page;
