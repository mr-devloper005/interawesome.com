import Link from 'next/link'
import { Building2, Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight, Send } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteIdentity } from '@/config/site.identity'

const contactMethods = [
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak directly with our support team during business hours.',
    value: '+1 (555) 123-4567',
    action: 'tel:+15551234567',
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us a detailed message and we will respond within 24 hours.',
    value: siteIdentity.contactEmail,
    action: `mailto:${siteIdentity.contactEmail}`,
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Stop by our office for in-person consultations and meetings.',
    value: '123 Business Ave, Suite 100',
    action: '#',
  },
]

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

        {/* Contact Methods */}
        <section className="mb-12">
          <div className="grid gap-6 md:grid-cols-3">
            {contactMethods.map((method) => {
              const Icon = method.icon
              return (
                <a
                  key={method.title}
                  href={method.action}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1d546d]/10 text-[#1d546d] group-hover:bg-[#1d546d] group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{method.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{method.description}</p>
                  <p className="mt-3 text-sm font-medium text-[#1d546d]">{method.value}</p>
                </a>
              )
            })}
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Contact Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Send us a message</h2>
            <p className="mt-2 text-sm text-slate-600">Fill out the form below and we'll get back to you within 24 hours.</p>
            <form className="mt-6 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1d546d] focus:border-transparent"
                  placeholder="Your name"
                />
                <input
                  className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1d546d] focus:border-transparent"
                  placeholder="Email address"
                />
              </div>
              <input
                className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1d546d] focus:border-transparent"
                placeholder="Subject"
              />
              <select className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1d546d] focus:border-transparent text-slate-600">
                <option value="">Select a topic</option>
                <option value="listings">Business Listings</option>
                <option value="account">Account Support</option>
                <option value="partnership">Partnerships</option>
                <option value="technical">Technical Issues</option>
                <option value="other">Other</option>
              </select>
              <textarea
                className="min-h-[180px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1d546d] focus:border-transparent"
                placeholder="Tell us more about your inquiry..."
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1d546d] px-6 text-sm font-semibold text-white hover:bg-[#5f9598] transition-colors"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Office Hours & Support Topics */}
          <div className="space-y-6">
            {/* Office Hours */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-[#1d546d]" />
                <h3 className="text-lg font-semibold">Office Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>

            {/* Support Topics */}
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
