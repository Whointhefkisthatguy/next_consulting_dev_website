import AutomationSqueeze from "@/components/squeeze/AutomationSqueeze";
import { automationContent as c } from "@/content/squeeze/automation";
import { buildPageMetadata, buildServiceSchema } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: c.meta.title,
  description: c.meta.description,
  path: c.route,
  ogImage: c.meta.ogImage,
});

export default function AutomationPage() {
  const schema = buildServiceSchema({
    name: "Automation",
    description: c.meta.description,
    url: `https://nextconsulting.dev${c.route}`,
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <AutomationSqueeze />
    </>
  );
}
