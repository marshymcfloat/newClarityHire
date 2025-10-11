import { prisma } from "@/prisma/prisma";
import JobDetails from "./JobDetails";

const JobDetailsDataContainer = async ({ id }: { id: string }) => {
  const jobDetails = await prisma.job.findFirst({
    where: { id },
    include: { Company: true },
  });

  if (!jobDetails) {
    return <h1>No details found for this job</h1>;
  }

  return <JobDetails jobDetails={jobDetails} jobId={id} />;
};

export default JobDetailsDataContainer;
