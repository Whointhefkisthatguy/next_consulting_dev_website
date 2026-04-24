import type { Metadata } from "next";
import { graphicDesignContent } from "@/content/squeeze/graphic-design";
import ServicePage from "@/components/service/ServicePage";

export const metadata: Metadata = {
  title: graphicDesignContent.meta.title,
  description: graphicDesignContent.meta.description,
  openGraph: {
    title: graphicDesignContent.meta.title,
    description: graphicDesignContent.meta.description,
    images: [{ url: graphicDesignContent.meta.ogImage, width: 1200, height: 630 }],
  },
};

export default function GraphicDesignPage() {
  return <ServicePage content={graphicDesignContent} />;
}
