import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ companyId: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { companyId } = await params;
  try {
    console.log(companyId);

    const questions = await prisma.question.findMany({ where: { companyId } });

    if (!questions) {
      throw new Error("There is an unexpected error occured");
    }

    return NextResponse.json(questions);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
