import ContactForm from "@/src/components/forms/ContactForm";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="w-full text-white/90">
      {/* HERO — placeholder (no image yet) */}
      <section className="relative h-[220px] sm:h-[280px] md:h-[320px] bg-gradient-to-br from-vt-maroon to-vt-impactOrange">
        {/* subtle overlay for contrast */}
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-4 sm:px-6 lg:px-10 pb-6 sm:pb-8">
          <h1 className="text-3xl sm:text-5xl font-vt-bold text-white">
            Contact Us
          </h1>

          <nav aria-label="Breadcrumb" className="mt-2 text-sm text-white/80">
            <ol className="flex items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-white hover:underline underline-offset-2"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-white">Contact</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="bg-[#14171a]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
          <h2 className="text-3xl font-vt-extrabold text-white/95">
            Get in Touch
          </h2>
          <p className="mt-2 max-w-2xl text-base font-vt-normal text-white/80 sm:text-lg">
            Reach out to <span className="font-vt-bold">Veterans@VT</span> with
            any questions, for support, or to get involved.
            <br className="hidden sm:block" />
            We&apos;re here to help!
          </p>

          {/* FORM + INFO CARDS */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* LEFT: CONTACT FORM CARD */}
            <section
              className="rounded-xl border border-white/10 bg-[#1a1e22] p-6 shadow-lg sm:p-8"
              aria-label="Contact form"
            >
              <h3 className="text-xl font-vt-bold text-white/95">
                Contact Form
              </h3>

              <div className="mt-4">
                <ContactForm />
              </div>
            </section>

            {/* RIGHT: CONTACT INFO CARD */}
            <section
              className="rounded-xl border border-white/10 bg-[#1a1e22] p-6 shadow-lg sm:p-8"
              aria-label="Contact information"
            >
              <h3 className="text-xl font-vt-bold text-white/95">
                Contact Info
              </h3>

              <div className="mt-5 space-y-4">
                {/* VISIT US */}
                <div className="rounded-lg border border-white/10 p-4">
                  <div className="flex items-start gap-3">
                    <MdLocationPin
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-vt-impactOrange"
                      size={22}
                    />
                    <div>
                      <p className="font-vt-bold text-white/90">Visit Us</p>
                      <p className="mt-1 text-sm text-white/70">
                        Student Veterans Lounge
                        <br />
                        VetZone – Johnson Student Center
                        <br />
                        Blacksburg, VA
                      </p>
                    </div>
                  </div>
                </div>

                {/* EMAIL US */}
                <div className="rounded-lg border border-white/10 p-4">
                  <div className="flex items-start gap-3">
                    <IoIosMail
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-vt-impactOrange"
                      size={22}
                    />
                    <div>
                      <p className="font-vt-bold text-white/90">Email Us</p>
                      <a
                        href="mailto:veterans@vt.edu"
                        className="mt-1 inline-block text-sm text-white/85 underline-offset-2 hover:text-vt-impactOrange hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-impactOrange focus-visible:ring-offset-2"
                      >
                        veterans@vt.edu
                      </a>
                    </div>
                  </div>
                </div>

                {/* CALL US */}
                <div className="rounded-lg border border-white/10 p-4">
                  <div className="flex items-start gap-3">
                    <FaPhoneAlt
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-vt-impactOrange"
                      size={18}
                    />
                    <div>
                      <p className="font-vt-bold text-white/90">Call Us</p>
                      <p className="mt-1 text-sm text-white/70">
                        (540) 231-5555
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
