import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

type CompanyCardProps = {
  name: string;
  slug: string;
  description: string;
  image: string | null;
  location: string;
};

const CompanyCard = ({
  name,
  description,
  slug,
  image,
  location,
}: CompanyCardProps) => {
  const companyLogo = image || "https://via.placeholder.com/150";

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Image
          src={companyLogo}
          alt={`${name} logo`}
          width={64}
          height={64}
          className="object-contain border rounded-lg aspect-square"
        />
        <div className="flex-grow">
          <Link href={`/${slug}/available-jobs`} className="hover:underline">
            <CardTitle className="text-xl font-bold">{name}</CardTitle>
          </Link>
          <CardDescription className="mt-1 line-clamp-1">
            {location}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/${slug}/available-jobs`}>View Jobs</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
