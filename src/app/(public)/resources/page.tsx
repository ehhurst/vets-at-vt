'use client';
import ResourceCard from "@/src/components/resrouces/ResourceCard";
import { fakeResources } from "@/src/types/FakeResourceData";
import ResourcesCategoryGrid, {categoryMeta, sectionId} from "@/src/components/resrouces/ResourcesCategoryGrid";
import { ResourceCategory } from "@/src/types/Resource";
import Link from "next/link";

function uniqueCategories(resources: typeof fakeResources): ResourceCategory[] {
  const set = new Set<ResourceCategory>();
  resources.forEach((r) => set.add(r.category));
  return Array.from(set);
}

export default function ResourcesPage() {
  const categories = uniqueCategories(fakeResources);

  return (
    <main className="w-full">
      {/* HERO — placeholder (no image yet) */}
      <section className="relative h-[220px] sm:h-[280px] md:h-[320px] bg-gradient-to-br from-vt-maroon to-vt-impactOrange">
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

        <div className="relative mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 sm:px-6 lg:px-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-vt-bold text-white">Resources</h1>
          <p className="mt-2 max-w-2xl text-white/85 text-sm sm:text-base">
            Forms, guides, and information packets you can download, print, and keep handy.
          </p>

          <nav aria-label="Breadcrumb" className="mt-3 text-xs sm:text-sm text-white/80">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white hover:underline underline-offset-2">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-white">Resources</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* INTRO BAND */}
      <section className="bg-gray-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
          <h2 className="text-vt-maroon text-3xl font-vt-extrabold">Download & Print</h2>
          <p className="mt-2 max-w-3xl text-gray-600 text-base sm:text-lg font-vt-normal">
            Access commonly used veteran forms and information packets. Most items are provided as printable PDFs for convenience.
          </p>

          {/* Category jump cards */}
          <div className="mt-6">
            <ResourcesCategoryGrid categories={categories} />
          </div>

          {/* Helpful note */}
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-gray-900">
            <p className="text-sm text-gray-700 dark:text-gray-200">
              <span className="font-vt-bold">Important:</span> These documents are provided for informational purposes. For official submission requirements and deadlines, consult Virginia Tech or the VA directly.
            </p>
          </div>

          {/* Resource sections */}
          <div className="mt-10 space-y-10">
            {categories.map((cat) => {
              const meta = categoryMeta[cat];
              const items = fakeResources.filter((r) => r.category === cat);

              return (
                <section key={cat} id={sectionId(cat)} className="scroll-mt-24">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-vt-bold text-gray-900 dark:text-white">
                        {meta.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {meta.desc}
                      </p>
                    </div>

                    <a
                      href="#top"
                      className="hidden sm:inline text-sm font-semibold text-vt-impactOrange hover:underline underline-offset-2"
                    >
                      Back to top
                    </a>
                  </div>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    {items.map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-xl bg-vt-maroon p-6 sm:p-8 text-white">
            <h3 className="text-xl font-vt-bold">Need help finding the right form?</h3>
            <p className="mt-2 text-white/85">
              Contact Veterans@VT and we’ll point you in the right direction.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-flex rounded-md bg-white px-4 py-2 font-semibold text-vt-maroon hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-vt-maroon"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
