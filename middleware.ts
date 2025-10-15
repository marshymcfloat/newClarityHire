import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/prisma/prisma";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 1. If the user is not a logged-in recruiter, do nothing.
  // Let the page-level logic handle authorization.
  if (!token || !token.isRecruiter) {
    return NextResponse.next();
  }

  const userId = token.id as string;
  const companyId = token.activeCompanyId as string;

  // 2. If token is incomplete, do nothing and let the user get logged out or handled by the app.
  if (!userId || !companyId) {
    console.error("Recruiter token is missing userId or activeCompanyId.");
    return NextResponse.next();
  }

  try {
    const companyMember = await prisma.companyMember.findUnique({
      where: {
        userId_companyId: {
          userId: userId,
          companyId: companyId,
        },
      },
      include: {
        company: {
          select: { slug: true },
        },
      },
    });

    if (companyMember && companyMember.company.slug) {
      const {
        id: memberId,
        company: { slug: companySlug },
      } = companyMember;

      const recruiterBasePath = `/${companySlug}/${memberId}`;

      if (pathname.startsWith(recruiterBasePath)) {
        return NextResponse.next();
      }

      const redirectUrl = new URL(`${recruiterBasePath}/dashboard`, req.url);
      return NextResponse.redirect(redirectUrl);
    }
  } catch (error) {
    console.error("Error in middleware while fetching company data:", error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
