import { useState } from "react";

export default function ResumeDownload() {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative inline-block"
    >
      <button className="group relative mt-2 cursor-pointer overflow-hidden rounded-md border border-dotted border-slate-800 px-1 py-0.5 text-[5px] text-[var(--accent)] lg:px-3 lg:py-1 lg:text-[10px] 2xl:text-sm">
        <span className="relative z-10">Download CV</span>
        <span className="border-trail"></span>
      </button>

      {open && (
        <div className="top absolute left-1/2 z-20 w-32 -translate-x-1/2 rounded-md border border-slate-700 bg-black/95 p-2 text-xs shadow-lg backdrop-blur-md">
          <a
            href="/jhonatan_ferreira_resume.pdf"
            download
            className="block rounded px-2 py-1 text-gray-300 hover:bg-white/10 hover:text-white"
          >
            🇺🇸 English
          </a>

          <a
            href="/jhonatan_ferreira_resume_pt.pdf"
            download
            className="mt-1 block rounded px-2 py-1 text-gray-300 hover:bg-white/10 hover:text-white"
          >
            🇧🇷 Português
          </a>
        </div>
      )}
    </div>
  );
}
