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
    slug: "miela-digital",
    title: "Miela Digital's Website",
    description: "Marketing website for a Gaming and iGaming agency specialising in brand awareness and user acquisition. Built with HTML, Tailwind CSS, and JavaScript.",
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    liveUrl: "/miela",
    githubUrl: "https://github.com/ibheelz/Mieladigital",
    featured: true,
  },
  {
    slug: "coming-soon",
    title: "Coming Soon",
    description: "Next project in progress. Check back later.",
    tags: ["TBD"],
  },
];
