import { Suspense } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/email-auth";
import { MetaTagService } from "@/services/MetaTagService";
import { EN } from "@/translations/en/en";

export const metadata: Metadata = MetaTagService.CreateMetaTags(
  EN.LoginPage.MetaTags
);

async function LoginAuthGate({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (session) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#05070c]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
        </div>
      }
    >
      <LoginAuthGate>{children}</LoginAuthGate>
    </Suspense>
  );
}
