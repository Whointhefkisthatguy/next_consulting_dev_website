import type { Metadata } from "next";
import { websitesContent } from "@/content/squeeze/websites";
import ServicePage from "@/components/service/ServicePage";

export const metadata: Metadata = {
  title: websitesContent.meta.title,
  description: websitesContent.meta.description,
  openGraph: {
    title: websitesContent.meta.title,
    description: websitesContent.meta.description,
    images: [{ url: websitesContent.meta.ogImage, width: 1200, height: 630 }],
  },
};

export default function WebsitesPage() {
  return <ServicePage content={websitesContent} />;
}
