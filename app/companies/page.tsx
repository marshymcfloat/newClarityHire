import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CompanyCard from "@/components/ui/companies/CompanyCard";
import { dummyCompanies } from "@/constants";
import React from "react";

const page = () => {
  return (
    <main className="h-screen flex justify-center items-center">
      <Card className="lg:min-w-[80%] lg:min-h-[80vh]">
        <CardHeader>
          <CardTitle className="text-2xl capitalize">
            Find opportunies on these companies
          </CardTitle>
        </CardHeader>
        <CardContent className="lg:grid lg:grid-cols-4">
          {dummyCompanies.map((company) => (
            <CompanyCard
              id={company.id}
              name={company.name}
              key={company.id}
              description={company.description}
              slug={company.slug}
            />
          ))}
        </CardContent>
      </Card>
    </main>
  );
};

export default page;
