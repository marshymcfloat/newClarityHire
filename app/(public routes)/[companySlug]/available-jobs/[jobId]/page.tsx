import JobDetailsDataContainer from "@/components/companySlug/jobDetails/JobDetailsDataContainer";
import JobDetailsSkeleton from "@/components/companySlug/jobDetails/JobDetailsSkeleton";
import { Suspense } from "react";

type Params = Promise<{ companySlug: string; jobId: string }>;

const JobDetailsPage = async ({ params }: { params: Params }) => {
  const { jobId } = await params;

  return (
    <>
      <div className="flex flex-col w-full h-full gap-2 p-4">
        <Suspense fallback={<JobDetailsSkeleton />}>
          <JobDetailsDataContainer id={jobId} />
        </Suspense>
      </div>
    </>
  );
};

export default JobDetailsPage;
