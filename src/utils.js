export function generateEmail(lead) {
  const firstName = lead.hiringManager.name.split(" ")[0];
  const companyHook = lead.about.split(".")[0];

  return `Hi ${firstName},

I've been watching ${lead.company} closely — ${companyHook.charAt(0).toLowerCase() + companyHook.slice(1)}. The timing of what you're building really resonates with where I see the market heading.

I noticed you're hiring a ${lead.role} and wanted to reach out directly rather than through the usual channels. My background is in building product marketing engines at high-growth startups — the kind of environment where you're simultaneously defining the category, enabling a scrappy sales team, and shipping positioning that actually moves pipeline.

A few things that might be relevant:

• Built positioning and GTM motions from zero at [Company] — took the product from "what is this?" to a recognized category leader
• Led product launches that drove [X]% increase in qualified pipeline and [X]% improvement in sales cycle velocity  
• Deep experience in ${lead.tags.slice(0, 2).join(" and ")} — I understand both the buyer and the technical landscape

I'd love 20 minutes to learn more about where ${lead.company} is headed and share some initial thinking on how I could accelerate your GTM.

Would any time this week work for a quick call?

Best,
[Your Name]`;
}

export function generateLemlistPayload(lead) {
  return {
    email: `${lead.hiringManager.name.toLowerCase().replace(/ /g, ".")}@${lead.company.toLowerCase().replace(/ /g, "")}.com`,
    firstName: lead.hiringManager.name.split(" ")[0],
    lastName: lead.hiringManager.name.split(" ").slice(1).join(" "),
    companyName: lead.company,
    customVar1: lead.role,
    customVar2: lead.stage,
    customVar3: lead.about.split(".")[0],
  };
}
