import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata = { title: "Websites — Next Consulting" };

export default function WebsitesPage() {
  return (
    <ServicePageLayout
      title="Websites"
      quote="The details are not the details. They make the design."
      quoteAuthor="Charles Eames"
      heroImage="/images/bg-code.jpg"
      bodyImage="/images/bg-ink.jpg"
      intro={[
        "Your website is not a brochure. It\u2019s the first system your customer interacts with \u2014 and the one that sets every expectation that follows. We design and build full-stack web experiences that treat your website as what it actually is: a revenue instrument.",
        "Every decision we make is framed through client experience and operational impact. Not what looks good in a portfolio \u2014 what converts, retains, and compounds over time.",
        "From custom UI/UX to backend architecture, authentication, payments, and third-party integrations \u2014 we build the whole thing and we build it to last.",
      ]}
      deliverables={[
        { name: "Custom UI/UX Design", description: "Wireframing through high-fidelity design, informed by your customer\u2019s actual journey." },
        { name: "Full-Stack Development", description: "Frontend, backend, database, deployment \u2014 one team, one standard." },
        { name: "Backend Integration", description: "Authentication, payments, CRM hooks, and third-party APIs wired in from day one." },
        { name: "SEO & Performance", description: "Structured for search engines and optimized for speed. Not afterthoughts \u2014 foundations." },
        { name: "Ongoing Support", description: "Iteration, monitoring, and optimization after launch. We don\u2019t disappear." },
      ]}
      process={[
        { title: "Discovery", description: "We audit your current experience, map your customer journey, and define what success looks like." },
        { title: "Architecture", description: "Information architecture, technical stack decisions, and wireframes before a pixel is placed." },
        { title: "Build", description: "Design and development in parallel, with review checkpoints at every milestone." },
        { title: "Launch & Iterate", description: "Deployment, monitoring, and continuous improvement based on real data." },
      ]}
    />
  );
}
