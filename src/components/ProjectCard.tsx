import Image from "next/image";
import CategoryPill from "./CategoryPill";
import SecondaryButton from "./SecondaryButton";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  image?: string;
}

export default function ProjectCard({ slug, title, description, tags, githubUrl, image }: ProjectCardProps) {
  return (
    <div className="border border-surface bg-surface hover:border-red transition-colors duration-200 h-full flex flex-col">
      {image && (
        <div className="hidden desktop:block relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-top"
            sizes="(min-width: 1024px) 50vw, 0px"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-medium text-white mb-3 line-clamp-2">{title}</h3>
        <div className="flex gap-2 mb-3 flex-wrap">
          {tags.map((tag) => (
            <CategoryPill key={tag} label={tag} color="text-white" />
          ))}
        </div>
        <p className="text-sm text-muted line-clamp-3 flex-1 mb-4">{description}</p>
        <div className="flex gap-3">
          <SecondaryButton label="Details" href={`/projects/${slug}`} />
          {githubUrl && <SecondaryButton label="Code" href={githubUrl} />}
        </div>
      </div>
    </div>
  );
}
