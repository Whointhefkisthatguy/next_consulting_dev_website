import type { Metadata } from "next";
import { automationContent } from "@/content/squeeze/automation";
import ServicePage from "@/components/service/ServicePage";

export const metadata: Metadata = {
  title: automationContent.meta.title,
  description: automationContent.meta.description,
  openGraph: {
    title: automationContent.meta.title,
    description: automationContent.meta.description,
    images: [{ url: automationContent.meta.ogImage, width: 1200, height: 630 }],
  },
};

export default function AutomationPage() {
  return <ServicePage content={automationContent} />;
}
