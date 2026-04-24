import { graphicDesignContent as c } from "@/content/squeeze/graphic-design";
import GraphicDesignHero from "./graphic-design/GraphicDesignHero";
import LogoRulesCard from "./graphic-design/LogoRulesCard";
import SpecimenRow from "./graphic-design/SpecimenRow";
import TrustStrip from "./TrustStrip";
import Promise from "./Promise";
import WhatYouGet from "./WhatYouGet";
import WorkGrid from "./WorkGrid";
import Process from "./Process";
import StartProjectSection from "./StartProjectSection";
import SecondaryCTA from "./SecondaryCTA";

export default function GraphicDesignSqueeze() {
  return (
    <>
      <GraphicDesignHero
        kicker={c.hero.kicker}
        headline={c.hero.headline}
        subhead={c.hero.subhead}
        attribution={c.hero.attribution}
      />
      <TrustStrip stats={c.trustStats} ctaLabel="Start your project" ctaHref="#offer" />
      <LogoRulesCard />
      <SpecimenRow word="next" />
      <Promise text={c.promise} />
      <WhatYouGet deliverables={c.deliverables} />
      {c.workSamples && <WorkGrid samples={c.workSamples} heading="Selected brand work" />}
      <Process steps={c.process} />
      <StartProjectSection service={c.slug} block={c.startProject} />
      <SecondaryCTA />
    </>
  );
}
