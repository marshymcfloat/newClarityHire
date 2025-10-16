import CreateJobDialog from "@/components/recruiter/manage jobs/CreateJobDialog";
import CreateQuestionDialog from "@/components/recruiter/manage jobs/CreateQuestionDialog";
import ManageJobsInitialDataContainer from "@/components/recruiter/manage jobs/ManageJobsInitialDataContainer";
import React, { Suspense } from "react";

const ManageJobsPage = () => {
  return (
    <section className="flex flex-col  h-full gap-4">
      <Suspense fallback={<h1>loading...</h1>}>
        <ManageJobsInitialDataContainer />
      </Suspense>

      <div className="flex  justify-end">
        <div className="flex gap-4">
          <CreateQuestionDialog />
          <CreateJobDialog />
        </div>
      </div>
    </section>
  );
};

export default ManageJobsPage;
