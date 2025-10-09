import { prisma } from "@/prisma/prisma";
import AvailableJobsList from "./AvailableJobsList";

const AvailableJobsDataContainer = async ({
  companySlug,
}: {
  companySlug: string;
}) => {
  const company = await prisma.company.findFirst({
    where: { slug: companySlug },
    select: { id: true },
  });

  const availableJobs = await prisma.job.findMany({
    where: { companyId: company?.id },
  });

  return (
    <>
      <AvailableJobsList jobs={availableJobs} companySlug={companySlug} />
    </>
  );
};

export default AvailableJobsDataContainer;
