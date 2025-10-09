import { Job } from "@prisma/client";
import JobCard from "./JobCard";

const AvailableJobsList = ({
  jobs,
  companySlug,
}: {
  jobs: Job[];
  companySlug: string;
}) => {
  return (
    <div className="grid grid-cols-4 gap-8 mt-8 ">
      {jobs.map((job) => (
        <JobCard companySlug={companySlug} key={job.id} job={job} />
      ))}
    </div>
  );
};

export default AvailableJobsList;
