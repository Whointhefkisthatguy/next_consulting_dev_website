import { graphicDesignContent as c } from "@/content/squeeze/graphic-design";
import GraphicDesignHero from "./graphic-design/GraphicDesignHero";
import SpecimenRow from "./graphic-design/SpecimenRow";
import TrustStrip from "./TrustStrip";
import Promise from "./Promise";
import WhatYouGet from "./WhatYouGet";
import WorkGrid from "./WorkGrid";
import Process from "./Process";
import ServiceOfferCTA from "./ServiceOfferCTA";
import SecondaryCTA from "./SecondaryCTA";

export default function GraphicDesignSqueeze() {
  return (
    <>
      <GraphicDesignHero kicker={c.hero.kicker} headline={c.hero.headline} subhead={c.hero.subhead} />
      <TrustStrip stats={c.trustStats} ctaLabel="Book the brand check" ctaHref="#offer" />
      <SpecimenRow word="next" />
      <Promise text={c.promise} />
      <WhatYouGet deliverables={c.deliverables} />
      {c.workSamples && <WorkGrid samples={c.workSamples} heading="Selected brand work" />}
      <Process steps={c.process} />
      <ServiceOfferCTA offer={c.offer} />
      <SecondaryCTA />
    </>
  );
}
