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
            className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-maroon focus-visible:ring-offset-2 dark:border-white/10 dark:bg-gray-900"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-gray-200 dark:bg-white/10 dark:group-hover:bg-white/15">
                {meta.icon}
              </div>
              <div>
                <h3 className="text-base font-vt-bold text-gray-900 dark:text-white">
                  {meta.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {meta.desc}
                </p>
                <p className="mt-3 text-sm font-semibold text-vt-impactOrange group-hover:underline underline-offset-2">
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
