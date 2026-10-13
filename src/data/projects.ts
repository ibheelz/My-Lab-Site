export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  image?: string;
}

export const projects: Project[] = [
  {
    slug: "helpdesk-ticketing-system",
    title: "Helpdesk Ticketing System",
    description: "Internal ticketing tool for logging, tracking, and resolving IT support requests across departments.",
    tags: ["Next.js", "IT Support", "TypeScript"],
    githubUrl: "https://github.com/abiola",
    featured: true,
  },
  {
    slug: "network-monitoring-dashboard",
    title: "Network Monitoring Dashboard",
    description: "Real-time dashboard for monitoring network health, device status, and bandwidth usage across the LAN.",
    tags: ["Node.js", "Networking", "Dashboards"],
    githubUrl: "https://github.com/abiola",
  },
  {
    slug: "it-asset-tracker",
    title: "IT Asset Tracker",
    description: "Inventory management system for tracking hardware, software licenses, and equipment assignments.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "https://github.com/abiola",
  },
];
