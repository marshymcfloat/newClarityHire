import { Prisma } from "@prisma/client";

export type ConfiguredComapnies = Prisma.CompanyGetPayload<{
  select: {
    id: true;
    coverImage: true;
    name: true;
    image: true;
    description: true;
    location: true;
    slug: true;
    websiteUrl: true;
  };
}>;
