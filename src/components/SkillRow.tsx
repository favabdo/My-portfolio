interface SkillRowProps {
  title: string;
  accent: string;
  skills: string[];
}

export default function SkillRow({ title, accent, skills }: SkillRowProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h3
        className="uppercase tracking-widest font-semibold text-sm sm:text-base px-1"
        style={{ color: accent }}
      >
        {title}
      </h3>
      <div className="no-scrollbar flex gap-2.5 overflow-x-auto pb-1">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full px-5 py-2.5 text-sm sm:text-base whitespace-nowrap flex-shrink-0"
            style={{
              border: `1px solid ${accent}40`,
              background: `${accent}14`,
              color: "#D7E2EA",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
