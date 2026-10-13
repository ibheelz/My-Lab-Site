interface TechStackCardProps {
  emoji: string;
  category: string;
  tools: string;
}

export default function TechStackCard({ emoji, category, tools }: TechStackCardProps) {
  return (
    <div className="bg-surface p-4 flex flex-col gap-2 border border-border">
      <div className="text-2xl">{emoji}</div>
      <h3 className="text-lg font-medium text-white">{category}</h3>
      <p className="text-sm text-muted">{tools}</p>
    </div>
  );
}
