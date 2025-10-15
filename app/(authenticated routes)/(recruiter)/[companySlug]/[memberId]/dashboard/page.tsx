import StatCardInitialDataContainer from "@/components/recruiter/dashboard/StatCardInitialDataContainer";
import { Suspense } from "react";

const RecruiterDashboardPage = () => {
  return (
    <section className=" h-full p-4">
      <Suspense>
        <StatCardInitialDataContainer />
      </Suspense>
    </section>
  );
};

export default RecruiterDashboardPage;
