import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[#14171a] px-4 py-16 text-white">
      <section className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-[#1a1e22] p-8 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-vt-impactOrange">
          Admin
        </p>
        <h1 className="mt-3 text-3xl font-vt-bold text-white/95">Admin dashboard</h1>
        <p className="mt-3 text-base text-white/70">
          You are signed in as an administrator. Continue to the admin dashboard to manage site
          content.
        </p>

        <div className="mt-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex rounded-md bg-vt-impactOrange px-5 py-3 text-base font-semibold text-white ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg"
          >
            Open admin dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
