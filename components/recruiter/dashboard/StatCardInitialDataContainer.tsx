import { authOptions } from "@/lib/auth";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import StatCard from "./StatCard";

const StatCardInitialDataContainer = async () => {
  const session = await getServerSession(authOptions);

  const activeJobs = await prisma.job.count({
    where: { companyId: session?.user.activeCompanyId, status: "PUBLISHED" },
  });

  return (
    <div className="">
      <StatCard
        title="Jobs"
        description="Count of published and active jobs."
        data={activeJobs}
      />
    </div>
  );
};

export default StatCardInitialDataContainer;
