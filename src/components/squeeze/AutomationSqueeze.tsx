import { automationContent as c } from "@/content/squeeze/automation";
import { loadCaseStudies } from "@/lib/case-studies";
import AutomationHero from "./automation/AutomationHero";
import RomanSection from "./automation/RomanSection";
import CaseStudyList from "./automation/CaseStudyList";
import TrustStrip from "./TrustStrip";
import Promise from "./Promise";
import WhatYouGet from "./WhatYouGet";
import Process from "./Process";
import ServiceOfferCTA from "./ServiceOfferCTA";
import SecondaryCTA from "./SecondaryCTA";

export default async function AutomationSqueeze() {
  const studies = await loadCaseStudies();
  return (
    <>
      <AutomationHero kicker={c.hero.kicker} headline={c.hero.headline} subhead={c.hero.subhead} />
      <TrustStrip stats={c.trustStats} accent="mono" ctaLabel="Book a discovery call" ctaHref="#offer" />
      <section className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)" }}>
        <div className="max-w-[900px]">
          <RomanSection numeral="I" label="The thesis" />
          <Promise text={c.promise} />
        </div>
      </section>
      <section className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)", background: "#0c0c0e" }}>
        <div className="max-w-[1100px]">
          <RomanSection numeral="II" label="What you get" />
          <WhatYouGet deliverables={c.deliverables} heading="" />
        </div>
      </section>
      <section className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)" }}>
        <div className="max-w-[1100px]">
          <RomanSection numeral="III" label="Evidence" />
          <CaseStudyList studies={studies} />
        </div>
      </section>
      <section className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)" }}>
        <div className="max-w-[1100px]">
          <RomanSection numeral="IV" label="Method" />
          <Process steps={c.process} heading="" />
        </div>
      </section>
      <ServiceOfferCTA offer={c.offer} />
      <SecondaryCTA />
    </>
  );
}
