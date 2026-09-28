import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import team from "@/data/team.json";
import { RevealGroup, RevealItem } from "@/components/site/reveal";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function TeamGrid() {
  return (
    <RevealGroup
      stagger={0.08}
      className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {team.map((person) => (
        <RevealItem key={person.name}>
          <div className="group rounded-3xl border border-ink/10 bg-paper p-6 text-center transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(22,36,28,0.25)]">
            <Avatar className="mx-auto size-16 border border-ink/10 transition-transform duration-300 group-hover:scale-105">
              <AvatarFallback className="bg-ink font-display text-lg text-cream">
                {initials(person.name)}
              </AvatarFallback>
            </Avatar>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">
              {person.name}
            </h3>
            <p className="text-sm text-ember">{person.role}</p>
            <p className="mt-1 text-xs text-ink/50">{person.credential}</p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
