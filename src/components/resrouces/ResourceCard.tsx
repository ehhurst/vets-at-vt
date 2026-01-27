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
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow dark:border-white/10 dark:bg-gray-900">
      <div className="flex items-start gap-3">
        <div
          className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10"
          aria-hidden="true"
        >
          <MdInsertDriveFile className="text-vt-maroon" size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-base font-vt-bold text-gray-900 dark:text-white">
              {resource.title}
            </h4>

            <span className="rounded-full border border-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-700 dark:border-white/10 dark:text-gray-200">
              {resource.fileType}
            </span>

            {resource.fileSize && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {resource.fileSize}
              </span>
            )}

            {updated && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                • Updated {updated}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {resource.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={resource.href}
              className="inline-flex items-center gap-2 rounded-md bg-vt-impactOrange px-3 py-2 text-sm font-semibold text-white hover:bg-vt-maroon focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-maroon focus-visible:ring-offset-2"
              download={resource.fileType !== "LINK"}
            >
              <MdDownload aria-hidden="true" />
              Download
            </a>

            {canPrint(resource) && (
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-maroon focus-visible:ring-offset-2 dark:border-white/10 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-white/5"
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
