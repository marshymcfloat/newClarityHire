import { ConfiguredComapnies } from "@/types";
import CompanyCard from "./CompanyCard";

const CompaniesList = ({ companies }: { companies: ConfiguredComapnies[] }) => {
  if (companies.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p>No companies found.</p>
        <p>Check back later or try refining your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          name={company.name}
          description={company.description}
          slug={company.slug}
          image={company.image}
          location={company.location}
        />
      ))}
    </div>
  );
};

export default CompaniesList;
