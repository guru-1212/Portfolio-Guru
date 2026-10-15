import { profile } from "@/data/portfolio";
import { WhatsappIcon } from "./icons";

// Floating "chat on WhatsApp" button, bottom-right on every page.
export function WhatsappButton() {
  return (
    <a
      href={profile.links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with me on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 sm:bottom-7 sm:right-7"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full border border-border bg-background/90 px-3.5 py-2 text-sm font-medium opacity-0 shadow-lg backdrop-blur-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
      <span className="relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.65)] transition-transform duration-300 group-hover:scale-110">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30 motion-reduce:hidden" aria-hidden="true" />
        <WhatsappIcon className="relative size-7" />
      </span>
    </a>
  );
}
