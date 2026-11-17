import type { Metadata } from "next";

export interface IMetaTags {
  url: string;
  title: string;
  description: string;
  imgUrl: string;
  tags: string[];
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://arcbids.com";

export class MetaTagService {
  static CreateMetaTags = (props: IMetaTags): Metadata => {
    return {
      metadataBase: new URL(SITE_URL),
      title: props.title,
      description: props.description,
      keywords: props.tags,
      alternates: {
        canonical: props.url,
      },
      openGraph: {
        title: props.title,
        description: props.description,
        url: props.url,
        siteName: "ArcBids",
        images: [
          {
            url: props.imgUrl,
            width: 1200,
            height: 630,
            alt: props.title,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: props.title,
        description: props.description,
        images: [props.imgUrl],
      },
    };
  };
}
