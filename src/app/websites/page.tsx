import WebsitesSqueeze from "@/components/squeeze/WebsitesSqueeze";
import { websitesContent as c } from "@/content/squeeze/websites";
import { buildPageMetadata, buildServiceSchema } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: c.meta.title,
  description: c.meta.description,
  path: c.route,
  ogImage: c.meta.ogImage,
});

export default function WebsitesPage() {
  const schema = buildServiceSchema({
    name: "Websites",
    description: c.meta.description,
    url: `https://nextconsulting.dev${c.route}`,
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <WebsitesSqueeze />
    </>
  );
}
