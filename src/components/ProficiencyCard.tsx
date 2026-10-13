interface ProficiencyCardProps {
  emoji: string;
  title: string;
  accentColor: string;
  skills: Array<{ name: string; level: number }>;
}

export default function ProficiencyCard({ emoji, title, accentColor, skills }: ProficiencyCardProps) {
  return (
    <div className="bg-surface p-4 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{emoji}</span>
        <h3 className={`text-lg font-medium ${accentColor}`}>{title}</h3>
      </div>

      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.name}>
            <p className="text-sm text-white mb-1">{skill.name}</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-2 ${
                    i < skill.level ? `bg-${accentColor.split("-")[1]}` : "bg-surface border border-border"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
