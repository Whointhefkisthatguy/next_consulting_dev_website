import { websitesContent as c } from "@/content/squeeze/websites";
import WebsitesHero from "./websites/WebsitesHero";
import TrustStrip from "./TrustStrip";
import Promise from "./Promise";
import WhatYouGet from "./WhatYouGet";
import WorkGrid from "./WorkGrid";
import Process from "./Process";
import StartProjectSection from "./StartProjectSection";
import SecondaryCTA from "./SecondaryCTA";

export default function WebsitesSqueeze() {
  return (
    <>
      <WebsitesHero kicker={c.hero.kicker} headline={c.hero.headline} subhead={c.hero.subhead} />
      <TrustStrip stats={c.trustStats} ctaLabel="Start your project" ctaHref="#offer" />
      <Promise text={c.promise} kicker="§ 03 · Promise" />
      <WhatYouGet deliverables={c.deliverables} heading="§ 04 · What you get" />
      {c.workSamples && <WorkGrid samples={c.workSamples} heading="§ 05 · Recent work" />}
      <Process steps={c.process} heading="§ 06 · Process" />
      <StartProjectSection service={c.slug} block={c.startProject} />
      <SecondaryCTA />
    </>
  );
}
