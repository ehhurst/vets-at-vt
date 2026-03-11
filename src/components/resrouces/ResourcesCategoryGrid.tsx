"use client";

import { ResourceCategory } from "@/src/types/Resource";
import { MdSchool, MdVerified, MdDiversity3, MdHealthAndSafety, MdChecklist } from "react-icons/md";

const categoryMeta: Record<ResourceCategory, { title: string; desc: string; icon: React.ReactNode }> = {
  ACADEMIC: {
    title: "Academic & Enrollment",
    desc: "Enrollment, certification guidance, and academic forms.",
    icon: <MdSchool aria-hidden="true" size={22} className="text-vt-maroon" />,
  },
  VA_BENEFITS: {
    title: "VA & Benefits",
    desc: "GI Bill® info, checklists, and benefits comparisons.",
    icon: <MdVerified aria-hidden="true" size={22} className="text-vt-maroon" />,
  },
  CAMPUS_COMMUNITY: {
    title: "Campus & Community",
    desc: "Lounge info, commuting, housing, and local resources.",
    icon: <MdDiversity3 aria-hidden="true" size={22} className="text-vt-maroon" />,
  },
  WELLNESS_SUPPORT: {
    title: "Wellness & Support",
    desc: "Counseling, crisis resources, and peer support.",
    icon: <MdHealthAndSafety aria-hidden="true" size={22} className="text-vt-maroon" />,
  },
  ORIENTATION: {
    title: "Orientation Packets",
    desc: "New veteran packet, checklists, and timelines.",
    icon: <MdChecklist aria-hidden="true" size={22} className="text-vt-maroon" />,
  },
};

function sectionId(cat: ResourceCategory) {
  return `cat-${cat.toLowerCase()}`;
}

export default function ResourcesCategoryGrid({ categories }: { categories: ResourceCategory[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat) => {
        const meta = categoryMeta[cat];
        return (
          <a
            key={cat}
            href={`#${sectionId(cat)}`}
            className="group rounded-xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#1a1e22] p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-impactOrange focus-visible:ring-offset-2"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-[#20252a] group-hover:bg-gray-200 dark:group-hover:bg-[#2a3036]">
                {meta.icon}
              </div>
              <div>
                <h3 className="text-base font-vt-bold text-black/95 dark:text-white/95">
                  {meta.title}
                </h3>
                <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                  {meta.desc}
                </p>
                <p className="mt-3 text-sm font-semibold text-black/80 dark:text-white/80 group-hover:text-vt-impactOrange group-hover:underline underline-offset-2">
                  View resources →
                </p>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}

export { sectionId, categoryMeta };
