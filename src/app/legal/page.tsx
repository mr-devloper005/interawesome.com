import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Scale, FileText, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

const legalDocuments = [
  {
    icon: FileText,
    title: 'Terms of Service',
    description: 'The rules and guidelines for using our platform.',
    link: '/terms',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your information.',
    link: '/privacy',
  },
  {
    icon: AlertCircle,
    title: 'Cookie Policy',
    description: 'Details about the cookies we use and your choices.',
    link: '/cookies',
  },
]

const legalPrinciples = [
  {
    title: 'Transparency',
    description: 'We clearly communicate our policies and practices to help you make informed decisions.',
  },
  {
    title: 'User Control',
    description: 'You have control over your data and can manage your preferences at any time.',
  },
  {
    title: 'Security',
    description: 'We implement industry-standard security measures to protect your information.',
  },
  {
    title: 'Compliance',
    description: 'We comply with applicable laws and regulations in the jurisdictions we operate.',
  },
]

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#061e29]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1d546d]/10 text-[#1d546d]">
              <Scale className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Legal Information</h1>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-8 text-slate-600">
            Access all legal documents, policies, and guidelines that govern your use of {SITE_CONFIG.name}.
          </p>
        </section>

        {/* Legal Documents */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Legal Documents</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {legalDocuments.map((doc) => {
              const Icon = doc.icon
              return (
                <Link
                  key={doc.title}
                  href={doc.link}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1d546d]/10 text-[#1d546d] group-hover:bg-[#1d546d] group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{doc.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{doc.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#1d546d]">
                    Read more <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Legal Principles */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Legal Principles</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-8 md:grid-cols-2">
              {legalPrinciples.map((principle) => (
                <div key={principle.title}>
                  <h3 className="text-lg font-semibold">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact for Legal Inquiries */}
        <section className="rounded-2xl border border-[#1d546d]/20 bg-gradient-to-br from-[#1d546d] to-[#5f9598] p-8 text-white">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold">Legal Inquiries</h2>
              <p className="mt-2 text-base leading-7 text-white/90">
                If you have specific legal questions or need to contact our legal team, please reach out through our contact page.
              </p>
            </div>
            <div className="flex items-center justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1d546d] hover:bg-white/90 transition-colors"
              >
                Contact Legal Team
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
