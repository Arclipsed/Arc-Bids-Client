import { Suspense } from "react";
import type { Metadata } from "next";
import { AuctionPage } from "@/components/AuctionPage";
import { MetaTagService } from "@/services/MetaTagService";
import { EN } from "@/translations/en/en";

export const metadata: Metadata = MetaTagService.CreateMetaTags(
  EN.AuctionPage.MetaTags
);

async function AuctionRoomContent({
  params,
}: {
  params: Promise<{ room: string }>;
}) {
  const { room } = await params;
  return <AuctionPage initialRoomKey={decodeURIComponent(room)} />;
}

export default function AuctionRoomSlugPage({
  params,
}: {
  params: Promise<{ room: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#05070c]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3ff2e0]/20 border-t-[#3ff2e0]" />
        </div>
      }
    >
      <AuctionRoomContent params={params} />
    </Suspense>
  );
}
