import { Building } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Job } from "@prisma/client";

const JobCard = ({ job, companySlug }: { job: Job; companySlug: string }) => {
  return (
    <Link href={`/${companySlug}/${job.id}`}>
      <Card className="w-fit lg:max-w-[400px] lg:min-w-[400px] hover:shadow-md transition-all duration-200">
        <CardHeader>
          <CardTitle className="text-2xl ">{job.title}</CardTitle>
          <div className="flex gap-2">
            <Badge className="">{job.jobType}</Badge>
            <Badge className="">{job.experienceLevel}</Badge>
            <Badge className="">{job.location}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-wrap">{job.summary}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default JobCard;
