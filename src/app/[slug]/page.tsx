import { Suspense } from "react";
import { OrganizationPublicClient } from "@/components/OrganizationPublicClient";

async function OrganizationLoader({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <OrganizationPublicClient slug={slug} />;
}

export default function OrganizationPublicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#05070c] text-zinc-100">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
          <p className="mt-4 text-xs font-medium text-zinc-400">
            Loading organization…
          </p>
        </div>
      }
    >
      <OrganizationLoader params={params} />
    </Suspense>
  );
}
