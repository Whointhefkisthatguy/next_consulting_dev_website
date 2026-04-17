import GraphicDesignSqueeze from "@/components/squeeze/GraphicDesignSqueeze";
import { graphicDesignContent as c } from "@/content/squeeze/graphic-design";
import { buildPageMetadata, buildServiceSchema } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: c.meta.title,
  description: c.meta.description,
  path: c.route,
  ogImage: c.meta.ogImage,
});

export default function GraphicDesignPage() {
  const schema = buildServiceSchema({
    name: "Graphic Design",
    description: c.meta.description,
    url: `https://nextconsulting.dev${c.route}`,
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <GraphicDesignSqueeze />
    </>
  );
}
