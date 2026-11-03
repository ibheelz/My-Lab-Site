export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  image?: string;
  hideFromHome?: boolean;
}

export const projects: Project[] = [
  {
    slug: "miela-digital",
    title: "Miela Digital's Website",
    description: "Marketing website for a Gaming and iGaming agency specialising in brand awareness and user acquisition. Built with HTML, Tailwind CSS, and JavaScript.",
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    liveUrl: "/miela/",
    githubUrl: "https://github.com/ibheelz/Mieladigital",
    image: "/images/miela-cover.png",
    featured: true,
  },
  {
    slug: "mielo",
    title: "Mielo - Influencer Discovery Tool",
    description: "Influencer discovery platform for LATAM streamers across Twitch, YouTube, and Kick. Helps iGaming brands identify and vet creators by region, language, and audience profile.",
    tags: ["React", "Node.js", "PostgreSQL"],
    liveUrl: "/mielo",
    githubUrl: "https://github.com/ibheelz/Mielo",
    image: "/images/mielo-cover.png",
    featured: true,
  },
  {
    slug: "eyekontact",
    title: "Eyekontact Limited's Website",
    description: "Marketing website for Nigeria's leading out-of-home (OOH) advertising company. Built with React and Tailwind CSS.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "/eyekontact",
    githubUrl: "https://github.com/ibheelz/Eyekontact",
    image: "/images/eyekontact-cover.png",
    featured: true,
    hideFromHome: true,
  },
];
