import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Building2, FileText, MessageSquare, Phone, Mail, ArrowRight, Search, BookOpen, ShieldCheck, Zap } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteIdentity } from '@/config/site.identity'

const helpCategories = [
  {
    icon: Building2,
    title: 'Business Listings',
    description: 'Learn how to create, manage, and optimize your business listings for maximum visibility.',
    link: '/listings',
  },
  {
    icon: BookOpen,
    title: 'Account Management',
    description: 'Manage your profile, settings, and account preferences with our comprehensive guides.',
    link: '/settings',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy & Security',
    description: 'Understand how we protect your data and what controls you have over your information.',
    link: '/privacy',
  },
  {
    icon: Zap,
    title: 'Getting Started',
    description: 'Quick start guides to help you make the most of the platform from day one.',
    link: '/about',
  },
]

const faqs = [
  {
    question: 'How do I create a business listing?',
    answer: 'To create a business listing, click the "Add listing" button in the navigation bar or visit the create page. Fill in your business details including name, description, contact information, and location. Your listing will be reviewed and published within 24 hours.',
  },
  {
    question: 'Is there a cost to list my business?',
    answer: 'Basic business listings are free. We offer premium packages for enhanced visibility, featured placement, and additional marketing tools. Contact our sales team for custom enterprise solutions.',
  },
  {
    question: 'How can I edit my listing?',
    answer: 'Log in to your account and navigate to your dashboard. From there, you can edit any of your listings, update images, modify contact details, and change business information at any time.',
  },
  {
    question: 'What makes a listing stand out?',
    answer: 'High-quality photos, detailed descriptions, accurate contact information, and customer reviews all contribute to a standout listing. Complete all fields and keep your information up to date for the best results.',
  },
  {
    question: 'How do I report an issue with a listing?',
    answer: 'If you find incorrect information or inappropriate content, use the report button on the listing page or contact us directly at support. We review all reports within 48 hours.',
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#061e29]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">How can we help you?</h1>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-8 text-slate-600">
            Find answers, guides, and resources to make the most of your business listing experience.
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search for help topics..."
                className="w-full h-12 pl-12 pr-4 rounded-full border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1d546d] focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Browse by Category</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {helpCategories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.title}
                  href={category.link}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1d546d]/10 text-[#1d546d] group-hover:bg-[#1d546d] group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{category.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#1d546d]">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="rounded-2xl border border-[#1d546d]/20 bg-gradient-to-br from-[#1d546d] to-[#5f9598] p-8 text-white">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold">Still need help?</h2>
              <p className="mt-4 text-base leading-7 text-white/90">
                Our support team is here to assist you with any questions or issues you may have.
              </p>
              <div className="mt-6 space-y-4">
                <a
                  href={`mailto:${siteIdentity.contactEmail}`}
                  className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  {siteIdentity.contactEmail}
                </a>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1d546d] hover:bg-white/90 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                Contact Support
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
