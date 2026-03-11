"use client";

import { ResourceItem } from "@/src/types/Resource";
import { MdDownload, MdPrint, MdInsertDriveFile } from "react-icons/md";

function formatUpdated(dateISO?: string) {
  if (!dateISO) return null;
  const d = new Date(dateISO);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

function canPrint(resource: ResourceItem) {
  return resource.printable && resource.fileType === "PDF";
}

export default function ResourceCard({ resource }: { resource: ResourceItem }) {
  const updated = formatUpdated(resource.lastUpdated);

  const handlePrint = () => {
    // Opens PDF in new tab and triggers print (works best for same-origin PDFs in /public)
    const w = window.open(resource.href, "_blank", "noopener,noreferrer");
    if (!w) return;
    // Some browsers need a short delay for the PDF viewer to load before printing
    setTimeout(() => {
      try {
        w.focus();
        w.print();
      } catch {
        // If print is blocked, user can print from the PDF viewer
      }
    }, 600);
  };

  return (
    <article className="rounded-xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#1a1e22] p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start gap-3">
        <div
          className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-[#20252a]"
          aria-hidden="true"
        >
          <MdInsertDriveFile className="text-vt-maroon" size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-base font-vt-bold text-black/95 dark:text-white/95">
              {resource.title}
            </h4>

            <span className="rounded-full border border-black/10 dark:border-white/10 px-2 py-0.5 text-xs font-semibold text-black/75 dark:text-white/75">
              {resource.fileType}
            </span>

            {resource.fileSize && (
              <span className="text-xs text-black/60 dark:text-white/60">
                {resource.fileSize}
              </span>
            )}

            {updated && (
              <span className="text-xs text-black/60 dark:text-white/60">
                • Updated {updated}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            {resource.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={resource.href}
              className="inline-flex items-center gap-2 rounded-md bg-vt-impactOrange px-3 py-2 text-sm font-semibold text-white ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-impactOrange focus-visible:ring-offset-2"
              download={resource.fileType !== "LINK"}
            >
              <MdDownload aria-hidden="true" />
              Download
            </a>

            {canPrint(resource) && (
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-md border border-black/20 dark:border-white/20 bg-gray-100 dark:bg-[#20252a] px-3 py-2 text-sm font-semibold text-black/90 dark:text-white/90 ring-1 ring-inset ring-black/10 dark:ring-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-200 dark:hover:bg-[#2a3036] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-impactOrange focus-visible:ring-offset-2"
              >
                <MdPrint aria-hidden="true" />
                Print
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
