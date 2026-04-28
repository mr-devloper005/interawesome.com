import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Cookie, ShieldCheck, BarChart3, Settings, Info, ArrowRight, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteIdentity } from '@/config/site.identity'

const cookieTypes = [
  {
    icon: ShieldCheck,
    title: 'Essential Cookies',
    description: 'Required for authentication, security, and core platform functionality. These cannot be disabled.',
    examples: ['Session authentication', 'Security tokens', 'Platform stability'],
  },
  {
    icon: BarChart3,
    title: 'Analytics Cookies',
    description: 'Help us understand how users interact with our platform to improve performance and user experience.',
    examples: ['Page views', 'User flows', 'Feature usage'],
  },
  {
    icon: Settings,
    title: 'Preference Cookies',
    description: 'Remember your settings, language preferences, and customization choices for a personalized experience.',
    examples: ['Theme settings', 'Language selection', 'Saved filters'],
  },
  {
    icon: Info,
    title: 'Marketing Cookies',
    description: 'Used to deliver relevant advertisements and measure the effectiveness of our marketing campaigns.',
    examples: ['Ad personalization', 'Campaign tracking', 'Conversion analytics'],
  },
]

const userControl = [
  {
    title: 'Browser Settings',
    description: 'You can configure your browser to refuse cookies or alert you when cookies are being sent.',
  },
  {
    title: 'Opt-Out Options',
    description: 'Some third-party services offer opt-out mechanisms for their tracking cookies.',
  },
  {
    title: 'Cookie Preferences',
    description: 'We provide a cookie consent banner where you can customize your cookie preferences.',
  },
]

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#061e29]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1d546d]/10 text-[#1d546d]">
              <Cookie className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Cookie Policy</h1>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-8 text-slate-600">
            Learn about the cookies we use, why we use them, and how you can control your cookie preferences.
          </p>
          <p className="mt-2 text-sm text-slate-500">Last updated: April 27, 2026</p>
        </section>

        {/* Cookie Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Types of Cookies We Use</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {cookieTypes.map((type) => {
              const Icon = type.icon
              return (
                <div key={type.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1d546d]/10 text-[#1d546d]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{type.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{type.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {type.examples.map((example) => (
                      <span key={example} className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* User Control */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Your Cookie Choices</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-6 md:grid-cols-3">
              {userControl.map((control) => (
                <div key={control.title} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5f9598]/10 text-[#1d546d]">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{control.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{control.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cookie Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">What Are Cookies?</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm leading-7 text-slate-600">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform. Cookies are widely used and enable features such as:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="text-[#1d546d]">•</span>
                Remembering your login state and preferences
              </li>
              <li className="flex gap-2">
                <span className="text-[#1d546d]">•</span>
                Understanding how you use our platform to improve it
              </li>
              <li className="flex gap-2">
                <span className="text-[#1d546d]">•</span>
                Personalizing content and advertisements
              </li>
              <li className="flex gap-2">
                <span className="text-[#1d546d]">•</span>
                Measuring the effectiveness of our marketing campaigns
              </li>
            </ul>
          </div>
        </section>

        {/* Contact for Cookies */}
        <section className="rounded-2xl border border-[#1d546d]/20 bg-gradient-to-br from-[#1d546d] to-[#5f9598] p-8 text-white">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold">Questions About Cookies?</h2>
              <p className="mt-2 text-base leading-7 text-white/90">
                If you have questions about our cookie policy or how we use cookies, please contact us.
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
