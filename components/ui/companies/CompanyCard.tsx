import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../card";
import Link from "next/link";

const CompanyCard = ({
  id,
  name,
  description,
  slug,
}: {
  id: number;
  name: string;
  slug: string;
  description: string;
}) => {
  return (
    <Card className="bg-purple-200 hover:bg-purple-200/90   hover:shadow-md transition-all duration-200 cursor-pointer">
      <Link href={`${slug}/available-jobs`}>
        <CardHeader>
          <CardTitle className="text-2xl tracking-widest  ">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Link>
    </Card>
  );
};

export default CompanyCard;
