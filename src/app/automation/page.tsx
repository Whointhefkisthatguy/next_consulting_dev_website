import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata = { title: "Automation — Next Consulting" };

export default function AutomationPage() {
  return (
    <ServicePageLayout
      title="Automation"
      quote="The first rule of any technology used in a business is that automation applied to an efficient operation will magnify the efficiency."
      quoteAuthor="Bill Gates"
      heroImage="/images/bg-circuit.jpg"
      bodyImage="/images/bg-steel.jpg"
      intro={[
        "Your team is doing work a machine should be doing. Every manual handoff, every copy-paste, every \u201Ccan you send me that report\u201D is friction that compounds against you. We find it and we remove it.",
        "We map your workflows, identify where time and accuracy are being lost, and deploy intelligent automation that scales with your business \u2014 not against it.",
        "This is not about replacing people. It\u2019s about freeing them to do the work that actually requires a human \u2014 and letting systems handle everything else.",
      ]}
      deliverables={[
        { name: "Workflow Audit", description: "We map your current processes end-to-end and identify every point of friction." },
        { name: "AI-Powered Automation", description: "Intelligent process automation designed to compound efficiency over time." },
        { name: "CRM & Data Integration", description: "Connect your systems so data flows where it needs to without human intervention." },
        { name: "Custom Internal Tooling", description: "Dashboards and tools built for your specific operational needs." },
        { name: "Accountability Systems", description: "Automated notifications, escalations, and reporting that keep your team honest." },
        { name: "Ongoing Optimization", description: "We monitor, measure, and continuously improve what we\u2019ve built." },
      ]}
      process={[
        { title: "Audit", description: "Map every workflow, identify friction points, and quantify the cost of manual processes." },
        { title: "Design", description: "Architect the automation strategy \u2014 what to automate, what to integrate, what to build." },
        { title: "Deploy", description: "Build and deploy automations with testing at every step." },
        { title: "Monitor", description: "Ongoing measurement and optimization to ensure the system compounds." },
      ]}
    />
  );
}
