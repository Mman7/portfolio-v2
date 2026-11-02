import { ArrowUpRight } from "lucide-react";
import { contact } from "@/features/home/data";

const copyrightYear = "2026";

export function Footer() {
  return (
    <footer className="bg-[#141414] px-[clamp(20px,5vw,72px)] pb-6 pt-[38px]">
      <div className="flex justify-between gap-5 font-mono text-[11px] uppercase tracking-[.1em] text-muted max-[760px]:[&>span:last-child]:hidden">
        <span>ERIC MAN</span>
        <span>FULL-STACK DEVELOPER / PRODUCT BUILDER</span>
      </div>
      <div className="mt-7 flex justify-between gap-10 border-y border-line py-[clamp(72px,8vw,100px)] max-[760px]:flex-col max-[760px]:pb-[84px]">
        <p className="max-w-[720px] font-display text-[clamp(38px,6vw,88px)] leading-[.95] tracking-[-.06em]">
          Good things start with a conversation.
        </p>
        <div className="flex min-w-[140px] flex-col gap-[18px] max-[760px]:w-full">
          <a
            className="flex items-center justify-between gap-4 text-[15px] text-[#c7c4bd] transition-colors hover:text-foreground"
            href={`mailto:${contact.email}`}
          >
            Email <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a
            className="flex items-center justify-between gap-4 text-[15px] text-[#c7c4bd] transition-colors hover:text-foreground"
            href={contact.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a
            className="flex items-center justify-between gap-4 text-[15px] text-[#c7c4bd] transition-colors hover:text-foreground"
            href={contact.linkedIn}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="flex justify-between gap-5 pt-5 font-mono text-[11px] uppercase tracking-[.1em] text-quiet max-[760px]:[&>span:first-child]:hidden">
        <span>Available for thoughtful work.</span>
        <span>© {copyrightYear} Eric Man</span>
      </div>
    </footer>
  );
}
