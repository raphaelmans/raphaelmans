export function ExperienceSkills({
  skills,
}: {
  skills: readonly string[];
}) {
  return (
    <ul
      aria-label="Skills and technologies"
      data-experience-skills
      className="mt-4 flex max-w-[680px] flex-wrap gap-x-3 gap-y-1 text-xs leading-[1.65] text-muted-foreground"
    >
      {skills.map((skill) => (
        <li
          key={skill}
          className="inline-flex items-baseline gap-1.5 before:text-primary/65 before:content-['·']"
        >
          {skill}
        </li>
      ))}
    </ul>
  );
}
