import {
  Job,
  Company,
  ExperienceLevel,
  JobType,
  WorkArrangement,
} from "@prisma/client";
import { Building2, FileText, TrendingUp } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
  EXPERIENCE_LEVEL_MAP,
  JOB_TYPE_MAP,
  WORK_ARRANGEMENT_MAP,
} from "@/constants";
import { formatSalary, getInitials } from "@/lib/utils";
import ApplyJobSheet from "./ApplyJobSheet";

type JobWithCompany = Job & { Company: Company };

const JobMiniDetails = ({
  arrangement,
  type,
  experience,
}: {
  arrangement: WorkArrangement;
  type: JobType;
  experience: ExperienceLevel;
}) => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge variant="secondary" className="flex items-center gap-1.5">
      <Building2 size={14} /> {WORK_ARRANGEMENT_MAP[arrangement]}
    </Badge>
    <Badge variant="secondary" className="flex items-center gap-1.5">
      <FileText size={14} /> {JOB_TYPE_MAP[type]}
    </Badge>
    <Badge variant="secondary" className="flex items-center gap-1.5">
      <TrendingUp size={14} /> {EXPERIENCE_LEVEL_MAP[experience]}
    </Badge>
  </div>
);

const JobDetails = ({
  jobDetails,
  jobId,
}: {
  jobDetails: JobWithCompany;
  jobId: string;
}) => {
  const {
    Company,
    benefits,
    experienceLevel,
    jobType,
    location,
    qualifications,
    responsibilities,
    salaryMax,
    salaryMin,
    skills,
    summary,
    title,
    workArrangement,
  } = jobDetails;

  return (
    <div className="container mx-auto space-y-8 overflow-y-auto">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={Company.image || undefined}
                  alt={`${Company.name} logo`}
                />
                <AvatarFallback className="text-xl font-bold">
                  {getInitials(Company.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-muted-foreground">
                  {Company.name} • {location}
                </p>
                <div className="pt-2">
                  <JobMiniDetails
                    arrangement={workArrangement}
                    experience={experienceLevel}
                    type={jobType}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <ApplyJobSheet
                jobTitle={jobDetails.title}
                jobSummary={jobDetails.summary}
                jobId={jobId}
              />
              <p className="font-semibold text-slate-800">
                {formatSalary(salaryMin, salaryMax)}
                <span className="font-normal text-muted-foreground">
                  {" "}
                  / month
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div className="space-y-8 md:col-span-2">
          <div>
            <h2 className="mb-4 text-xl font-semibold">Job Summary</h2>
            <p className="text-muted-foreground">{summary}</p>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-semibold">Responsibilities</h2>
            <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
              {responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-semibold">Qualifications</h2>
            <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
              {qualifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6 md:col-span-1">
          {skills.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-semibold">Skills Required</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {benefits.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-semibold">Benefits</h3>
              <ul className="ml-6 list-disc space-y-2 text-sm text-muted-foreground">
                {benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
