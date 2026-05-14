import Link from 'next/link'
import { MessageSquare, ArrowRight, Send } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { ContactLeadForm } from "@/components/shared/contact-lead-form";

const supportTopics = [
  {
    title: 'Business Listings',
    description: 'Questions about creating, editing, or managing your business listings.',
  },
  {
    title: 'Account Support',
    description: 'Help with login, profile settings, and account management.',
  },
  {
    title: 'Partnerships',
    description: 'Inquiries about advertising, sponsorships, and business partnerships.',
  },
  {
    title: 'Technical Issues',
    description: 'Report bugs, errors, or technical problems with the platform.',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#061e29]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Get in Touch</h1>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-8 text-slate-600">
            Have questions or need assistance? We're here to help you succeed with your business listing journey.
          </p>
        </section>

        
        {/* Contact Form & Info */}
        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Contact Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Send us a message</h2>
            <p className="mt-2 text-sm text-slate-600">Fill out the form below and we'll get back to you within 24 hours.</p>
            <ContactLeadForm />
          </div>

          {/* Support Topics */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Common Topics</h3>
              <div className="space-y-3">
                {supportTopics.map((topic) => (
                  <div key={topic.title} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                    <h4 className="text-sm font-semibold">{topic.title}</h4>
                    <p className="mt-1 text-xs text-slate-600">{topic.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="rounded-2xl border border-[#1d546d]/20 bg-gradient-to-br from-[#1d546d] to-[#5f9598] p-8 text-white">
          <div className="flex items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-semibold">Can't find what you're looking for?</h2>
              <p className="mt-2 text-base leading-7 text-white/90">
                Check out our Help Center for comprehensive guides and frequently asked questions.
              </p>
            </div>
            <Link
              href="/help"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1d546d] hover:bg-white/90 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              Visit Help Center
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
