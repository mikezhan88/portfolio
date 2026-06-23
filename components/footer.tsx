import { profile } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-mono text-xs text-muted">
          © 2026 {profile.name}
        </p>
        <div className="flex gap-5 font-mono text-xs text-muted">
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
            GitHub
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
            LinkedIn
          </a>
          <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
