import { prisma } from "@/prisma/prisma";
import JobForm from "./JobForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const JobApplicationDataContainer = async ({ jobId }: { jobId: string }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Please login first</p>;
  }

  const questionJobs = await prisma.questionOnJob.findMany({
    where: { jobId },
    include: {
      Question: true,
    },
  });

  const userResumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
  });

  return <JobForm questions={questionJobs} resumes={userResumes} />;
};

export default JobApplicationDataContainer;
