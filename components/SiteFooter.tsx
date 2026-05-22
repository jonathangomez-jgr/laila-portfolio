import type { Dictionary } from "@/lib/i18n";

export default function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="px-6 pb-8 pt-4 md:px-8">
      <div className="mx-auto max-w-[1360px] border-t border-slate-200/70 pt-6 text-sm text-gray-500">
        {dict.footer.text}
      </div>
    </footer>
  );
}
