import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { FileText, Shield, AlertTriangle, Users, Ban, ArrowRight, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteIdentity } from '@/config/site.identity'

const termCategories = [
  {
    icon: Shield,
    title: 'Account Security',
    description: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
  },
  {
    icon: FileText,
    title: 'Content Ownership',
    description: 'You retain ownership of content you submit. By publishing, you grant us a license to display and distribute it on our platform.',
  },
  {
    icon: Users,
    title: 'Community Guidelines',
    description: 'Respect other users, avoid harassment, and contribute positively to the business listing community.',
  },
  {
    icon: Ban,
    title: 'Prohibited Activities',
    description: 'Spam, fraud, illegal content, and attempts to compromise platform security are strictly prohibited.',
  },
]

const acceptableUse = [
  {
    title: 'Accurate Information',
    description: 'Provide truthful and accurate business information in your listings.',
  },
  {
    title: 'Professional Conduct',
    description: 'Communicate professionally with other users and our support team.',
  },
  {
    title: 'Compliance',
    description: 'Follow all applicable laws and regulations in your use of the platform.',
  },
  {
    title: 'No Misrepresentation',
    description: 'Do not impersonate others or misrepresent your business affiliations.',
  },
]

const enforcement = [
  {
    title: 'Content Moderation',
    description: 'We reserve the right to review, remove, or moderate content that violates these terms.',
  },
  {
    title: 'Account Suspension',
    description: 'Serious or repeated violations may result in temporary or permanent account suspension.',
  },
  {
    title: 'Legal Action',
    description: 'We may take legal action against users who engage in illegal activities through our platform.',
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#061e29]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1d546d]/10 text-[#1d546d]">
              <FileText className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Terms of Service</h1>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-8 text-slate-600">
            The rules and guidelines for using {SITE_CONFIG.name}. By using our platform, you agree to these terms.
          </p>
          <p className="mt-2 text-sm text-slate-500">Last updated: April 27, 2026</p>
        </section>

        {/* Key Terms */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Key Terms</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {termCategories.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1d546d]/10 text-[#1d546d]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{category.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Acceptable Use */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Acceptable Use Policy</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              {acceptableUse.map((use) => (
                <div key={use.title} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5f9598]/10 text-[#1d546d]">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{use.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{use.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enforcement */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Enforcement & Consequences</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-6">
              {enforcement.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5f9598]/10 text-[#1d546d]">
                    <AlertTriangle className="h-4 w-4" />
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

        {/* Contact for Terms */}
        <section className="rounded-2xl border border-[#1d546d]/20 bg-gradient-to-br from-[#1d546d] to-[#5f9598] p-8 text-white">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold">Questions About Terms?</h2>
              <p className="mt-2 text-base leading-7 text-white/90">
                If you have questions about these terms or need clarification, please contact our legal team.
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
