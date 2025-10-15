import CreateJobDialog from "@/components/recruiter/manage jobs/CreateJobDialog";
import ManageJobsInitialDataContainer from "@/components/recruiter/manage jobs/ManageJobsInitialDataContainer";
import React, { Suspense } from "react";

const ManageJobsPage = () => {
  return (
    <section className="flex flex-col  h-full gap-4">
      <Suspense fallback={<h1>loading...</h1>}>
        <ManageJobsInitialDataContainer />
      </Suspense>
      <CreateJobDialog />
    </section>
  );
};

export default ManageJobsPage;
