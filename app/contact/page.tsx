import Image from "next/image";
import PageHero from "@/components/PageHero";
import SlackQRCard from "@/components/SlackQRCard";

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Conversemos."
        description="Sobre tecnología, Salesforce, inteligencia artificial, diseño de soluciones, el futuro de los negocios, o sobre la vida, el clima, y por qué las lechuzas tienen un vuelo completamente silencioso."
      />

      <section className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* WhatsApp */}
          <a
            href="https://wa.me/524775815010?text=Hola,%20conoc%C3%AD%20a%20Laila"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-between gap-5 rounded-2xl border border-green-200 bg-gradient-to-b from-green-50 to-white p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="overflow-hidden rounded-2xl border border-green-100 shadow-sm">
              <Image
                src="/jgr-qr.PNG"
                alt="QR WhatsApp Jonathan Gomez"
                width={160}
                height={160}
                className="h-40 w-40 object-cover"
              />
            </div>

            <div>
              <h2 className="mb-1 text-2xl font-semibold text-gray-950">WhatsApp</h2>
              <p className="text-sm text-gray-500">Escanea el QR o toca para abrir chat</p>
            </div>

            <span className="rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(34,197,94,0.3)] transition group-hover:bg-green-600 group-hover:shadow-[0_12px_28px_rgba(34,197,94,0.38)]">
              Abrir en WhatsApp
            </span>
          </a>

          {/* Slack */}
          <SlackQRCard />

          {/* Links */}
          <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-8">
            <h2 className="text-2xl font-semibold text-gray-950">Encuéntrame en</h2>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/jonathangomezr/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-[#0a66c2]/20 bg-[#0a66c2]/5 p-4 transition hover:-translate-y-0.5 hover:border-[#0a66c2]/40 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0a66c2]">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-950">LinkedIn</p>
                <p className="text-xs text-gray-500">in/jonathangomezr</p>
              </div>
              <svg className="ml-auto h-4 w-4 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#0a66c2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Trailblazer */}
            <a
              href="https://www.salesforce.com/trailblazer/jgomez30"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-[#00a1e0]/20 bg-[#00a1e0]/5 p-4 transition hover:-translate-y-0.5 hover:border-[#00a1e0]/40 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#032D61]">
                <Image
                  src="/trailhead.png"
                  alt="Trailhead"
                  width={36}
                  height={36}
                  className="h-[50%] w-[50%] object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-950">Trailblazer Profile</p>
                <p className="text-xs text-gray-500">trailblazer/jgomez30</p>
              </div>
              <svg className="ml-auto h-4 w-4 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#00a1e0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="http://www.youtube.com/@laila-jgr"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-[#ff0000]/20 bg-[#ff0000]/5 p-4 transition hover:-translate-y-0.5 hover:border-[#ff0000]/40 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ff0000]">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-950">YouTube</p>
                <p className="truncate text-xs text-gray-500">@laila-jgr</p>
              </div>
              <svg className="ml-auto h-4 w-4 shrink-0 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#ff0000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:jonathan.gomez@salesforce.com"
              className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-800">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-950">Email</p>
                <p className="truncate text-xs text-gray-500">jonathan.gomez@salesforce.com</p>
              </div>
              <svg className="ml-auto h-4 w-4 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}
