import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ShieldCheck, Eye, Lock, UserCheck, Database, ArrowRight, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteIdentity } from '@/config/site.identity'

const dataCategories = [
  {
    icon: UserCheck,
    title: 'Account Information',
    description: 'Name, email address, profile details, and authentication credentials you provide when creating an account.',
  },
  {
    icon: Database,
    title: 'Usage Data',
    description: 'Pages visited, features used, time spent, and interaction patterns to improve our services.',
  },
  {
    icon: Eye,
    title: 'Content You Submit',
    description: 'Business listings, descriptions, images, and any content you publish on the platform.',
  },
  {
    icon: Lock,
    title: 'Communications',
    description: 'Messages, support inquiries, and any communications you have with our team.',
  },
]

const dataUsage = [
  {
    title: 'Service Delivery',
    description: 'To provide, maintain, and improve our business listing platform and related services.',
  },
  {
    title: 'Personalization',
    description: 'To customize your experience and show relevant content based on your preferences.',
  },
  {
    title: 'Security',
    description: 'To detect fraud, abuse, and security threats to protect our users and platform.',
  },
  {
    title: 'Analytics',
    description: 'To understand how our platform is used and make data-driven improvements.',
  },
]

const userRights = [
  {
    title: 'Access Your Data',
    description: 'Request a copy of the personal data we hold about you.',
  },
  {
    title: 'Correct Your Data',
    description: 'Update or correct inaccurate or incomplete information.',
  },
  {
    title: 'Delete Your Data',
    description: 'Request deletion of your personal data, subject to legal obligations.',
  },
  {
    title: 'Opt Out of Marketing',
    description: 'Unsubscribe from promotional communications at any time.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#061e29]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1d546d]/10 text-[#1d546d]">
              <ShieldCheck className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Privacy Policy</h1>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-8 text-slate-600">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="mt-2 text-sm text-slate-500">Last updated: April 27, 2026</p>
        </section>

        {/* Data We Collect */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Data We Collect</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {dataCategories.map((category) => {
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

        {/* How We Use Data */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">How We Use Your Data</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              {dataUsage.map((usage) => (
                <div key={usage.title} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5f9598]/10 text-[#1d546d]">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{usage.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{usage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Your Rights & Choices</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {userRights.map((right) => (
              <div key={right.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold">{right.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{right.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact for Privacy */}
        <section className="rounded-2xl border border-[#1d546d]/20 bg-gradient-to-br from-[#1d546d] to-[#5f9598] p-8 text-white">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold">Privacy Questions?</h2>
              <p className="mt-2 text-base leading-7 text-white/90">
                If you have questions about this privacy policy or how we handle your data, please contact our privacy team.
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
                Contact Privacy Team
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
