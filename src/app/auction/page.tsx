import type { Metadata } from "next";
import { AuctionPage } from "@/components/AuctionPage";
import { MetaTagService } from "@/services/MetaTagService";
import { EN } from "@/translations/en/en";

export const metadata: Metadata = MetaTagService.CreateMetaTags(
  EN.AuctionPage.MetaTags
);

export default function AuctionRoomPage() {
  return <AuctionPage />;
}
