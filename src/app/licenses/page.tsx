import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Code, Globe, Heart, ArrowRight, ExternalLink, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteIdentity } from '@/config/site.identity'

const openSourceLicenses = [
  {
    name: 'Next.js',
    version: '14.x',
    license: 'MIT License',
    description: 'The React framework for production web applications.',
    url: 'https://github.com/vercel/next.js',
  },
  {
    name: 'React',
    version: '18.x',
    license: 'MIT License',
    description: 'A JavaScript library for building user interfaces.',
    url: 'https://github.com/facebook/react',
  },
  {
    name: 'Tailwind CSS',
    version: '3.x',
    license: 'MIT License',
    description: 'A utility-first CSS framework for rapid UI development.',
    url: 'https://github.com/tailwindlabs/tailwindcss',
  },
  {
    name: 'Lucide React',
    version: '0.x',
    license: 'ISC License',
    description: 'Beautiful & consistent icon toolkit for React.',
    url: 'https://github.com/lucide-icons/lucide',
  },
  {
    name: 'TypeScript',
    version: '5.x',
    license: 'Apache License 2.0',
    description: 'Typed superset of JavaScript that compiles to plain JavaScript.',
    url: 'https://github.com/microsoft/TypeScript',
  },
  {
    name: 'shadcn/ui',
    version: 'latest',
    license: 'MIT License',
    description: 'Beautifully designed components built with Radix UI and Tailwind CSS.',
    url: 'https://ui.shadcn.com',
  },
]

const acknowledgments = [
  {
    title: 'Open Source Community',
    description: 'We are grateful to the open source community for creating and maintaining the tools that power this platform.',
  },
  {
    title: 'Design Inspiration',
    description: 'Our design system draws inspiration from modern design patterns and best practices across the web.',
  },
  {
    title: 'User Feedback',
    description: 'Thank you to all our users who provide feedback and help us improve the platform.',
  },
]

export default function LicensesPage() {
  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#061e29]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1d546d]/10 text-[#1d546d]">
              <Code className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Open Source Licenses</h1>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-8 text-slate-600">
            {SITE_CONFIG.name} is built on amazing open source software. Learn about the licenses and libraries that power our platform.
          </p>
        </section>

        {/* Licenses Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Third-Party Licenses</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {openSourceLicenses.map((license) => (
              <div key={license.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{license.name}</h3>
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                        {license.version}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{license.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-md bg-[#1d546d]/10 px-2 py-1 text-xs font-medium text-[#1d546d]">
                        {license.license}
                      </span>
                    </div>
                  </div>
                  <a
                    href={license.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-[#1d546d] hover:text-[#1d546d] transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Acknowledgments */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Acknowledgments</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-6 md:grid-cols-3">
              {acknowledgments.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5f9598]/10 text-[#1d546d]">
                    <Heart className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* License Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">License Summary</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm leading-7 text-slate-600">
              Most of the open source libraries used in {SITE_CONFIG.name} are permissively licensed under MIT or similar licenses. This allows us to use, modify, and distribute the software while providing attribution to the original authors. We are committed to respecting open source licenses and contributing back to the community when possible.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                MIT License
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                Apache License 2.0
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                ISC License
              </span>
            </div>
          </div>
        </section>

        {/* Contact for Licenses */}
        <section className="rounded-2xl border border-[#1d546d]/20 bg-gradient-to-br from-[#1d546d] to-[#5f9598] p-8 text-white">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold">License Questions?</h2>
              <p className="mt-2 text-base leading-7 text-white/90">
                If you have questions about our use of open source software or need license information, please contact us.
              </p>
              <a
                href={`mailto:${siteIdentity.contactEmail}`}
                className="mt-4 inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
                {siteIdentity.contactEmail}
              </a>
            </div>
            <div className="flex items-center justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1d546d] hover:bg-white/90 transition-colors"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
