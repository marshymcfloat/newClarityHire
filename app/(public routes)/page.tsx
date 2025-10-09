import Link from "next/link";

const page = () => {
  return (
    <main className="overflow-y-auto">
      <div className="h-screen flex justify-center items-center">
        <div className="">
          <h1 className="font-bold text-[120px]  tracking-widest">
            ClarityHire.
          </h1>
          <p className="text-center ">
            seek jobs from these{" "}
            <span className="underline cursor-pointer font-medium">
              <Link href={"/companies"}>companies</Link>
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default page;
