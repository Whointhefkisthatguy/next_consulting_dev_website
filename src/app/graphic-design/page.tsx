import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata = { title: "Graphic Design — Next Consulting" };

export default function GraphicDesignPage() {
  return (
    <ServicePageLayout
      title="Graphic Design"
      quote="Design is not just what it looks like and feels like. Design is how it works."
      quoteAuthor="Steve Jobs"
      heroImage="/images/bg-paper.jpg"
      bodyImage="/images/bg-workspace.jpg"
      intro={[
        "Your brand is a system of signals. Every mark, every color, every piece of collateral tells your customer who they\u2019re dealing with \u2014 before you ever get to make your case.",
        "We build visual identity systems from the ground up for companies that understand the difference between looking professional and communicating authority. If your brand has outgrown its look, we fix that.",
        "Every asset we create is designed to work together as a system \u2014 not a collection of one-offs that slowly drift apart.",
      ]}
      deliverables={[
        { name: "Logo & Brand Mark", description: "A mark that works at every scale, on every surface, in every context." },
        { name: "Brand Identity System", description: "Colors, typography, spacing, usage rules \u2014 a complete style guide your team can follow." },
        { name: "Marketing Collateral", description: "Print-ready assets, brochures, business cards, and sales materials that match the standard." },
        { name: "Social Media Templates", description: "Branded templates your team can use without breaking the system." },
        { name: "Presentation Design", description: "Pitch decks and internal presentations that communicate the same authority as everything else." },
      ]}
    />
  );
}
