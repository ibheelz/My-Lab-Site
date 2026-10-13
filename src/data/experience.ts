export interface ExperienceEntry {
  type: "work" | "cert";
  title: string;
  org: string;
  dateRange: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    type: "work",
    title: "IT Support Specialist",
    org: "TechOps Solutions",
    dateRange: "2024 - Present",
    bullets: [
      "Resolved 500+ helpdesk tickets with avg response time under 1 hour",
      "Managed Windows/macOS endpoints and Active Directory for 200+ users",
      "Deployed and maintained network infrastructure including switches and APs",
    ],
  },
  {
    type: "work",
    title: "Desktop Support Technician",
    org: "Reliance IT Services",
    dateRange: "2022 - 2024",
    bullets: [
      "Provided on-site and remote support for hardware and software issues",
      "Reduced recurring ticket volume by 30% through documentation and training",
      "Handled hardware procurement, imaging, and asset tracking",
    ],
  },
  {
    type: "cert",
    title: "CompTIA A+",
    org: "CompTIA",
    dateRange: "Certified 2023",
    bullets: [
      "Hardware, networking, operating systems, and troubleshooting",
      "Industry-standard entry certification for IT support professionals",
    ],
  },
  {
    type: "cert",
    title: "Google IT Support Certificate",
    org: "Google / Coursera",
    dateRange: "Completed 2022",
    bullets: [
      "Covered networking, operating systems, system administration, and security",
      "Hands-on labs in troubleshooting and customer support scenarios",
    ],
  },
];
