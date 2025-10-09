import JobCard from "@/components/available-jobs/JobCard";
import { dummyJobs } from "@/constants";

type Params = Promise<{ companySlug: string }>;

const page = async ({ params }: { params: Params }) => {
  const { companySlug } = await params;

  return (
    <div className="flex flex-col w-full h-full gap-2">
      <h1 className="text-2xl capitalize">
        available jobs at <span className="font-medium">{companySlug}</span>
      </h1>

      <div className=" flex-1 p-2">
        {dummyJobs.map((job) => (
          <JobCard key={job.id} job={job} companySlug={companySlug} />
        ))}
      </div>
    </div>
  );
};

export default page;
