'use client'

import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, Tag, Star, Clock, ExternalLink, ChevronRight, MessageSquare, Award, Users, CheckCircle } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { useState, useEffect } from 'react'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const [activeSection, setActiveSection] = useState('about')

  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website.trim() : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const logo = typeof content.logo === 'string' ? content.logo : images[0]

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'hours', label: 'Working Hours' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'contact', label: 'Contact' },
    { id: 'location', label: 'Location' },
    { id: 'faq', label: 'FAQ' },
  ]

  const workingHours = [
    { day: 'Monday', start: '9:00 AM', end: '6:00 PM' },
    { day: 'Tuesday', start: '9:00 AM', end: '6:00 PM' },
    { day: 'Wednesday', start: '9:00 AM', end: '6:00 PM' },
    { day: 'Thursday', start: '9:00 AM', end: '6:00 PM' },
    { day: 'Friday', start: '9:00 AM', end: '6:00 PM' },
    { day: 'Saturday', start: '10:00 AM', end: '4:00 PM' },
    { day: 'Sunday', start: 'Closed', end: '' },
  ]

  const faqs = [
    { question: 'What services do you offer?', answer: 'We provide comprehensive business solutions tailored to your needs.' },
    { question: 'How can I contact you?', answer: 'You can reach us via phone, email, or visit our location during business hours.' },
    { question: 'What are your operating hours?', answer: 'Our standard hours are Monday-Friday 9AM-6PM, Saturday 10AM-4PM.' },
    { question: 'Do you offer consultations?', answer: 'Yes, we offer free initial consultations to discuss your requirements.' },
    { question: 'What makes you different from competitors?', answer: 'We focus on personalized service, attention to detail, and long-term customer relationships.' },
  ]

  
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }))

      const currentSection = sectionElements.find(({ element }) => {
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950">
          ← Back to {taskLabel}
        </Link>

        {/* Header Section */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
            {/* Logo */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <ContentImage src={logo} alt={post.title} width={96} height={96} className="h-full w-full object-cover" />
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-slate-950 md:text-3xl">{post.title}</h1>
              
              {/* Rating */}
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`h-4 w-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                  ))}
                  <span className="ml-2 text-sm text-slate-600">4.5 (12 Ratings)</span>
                </div>
              </div>

              {/* Category & Location */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                  {category || 'Business'}
                </Badge>
                {location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {location}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                {phone && (
                  <a href={`tel:${phone}`} className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                )}
                {website && (
                  <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-950 hover:bg-slate-50">
                    <Globe className="h-4 w-4" />
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Navigation */}
        <div className="sticky top-0 z-10 mb-8 overflow-x-auto border-b border-slate-200 bg-white/95 backdrop-blur-sm">
          <nav className="flex gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'text-slate-950'
                    : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                {section.label}
                {activeSection === section.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-950" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            {/* About Section */}
            <section id="about" className="rounded-2xl border border-slate-200 bg-white p-6 scroll-mt-20">
              <h2 className="text-xl font-semibold text-slate-950">About {post.title}</h2>
              <RichContent
                html={formatRichHtml(description, `${post.title} details coming soon.`)}
                className="mt-4 text-sm text-slate-600 prose-sm"
              />
              {highlights.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-slate-700">Highlights</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* Working Hours Section */}
            <section id="hours" className="rounded-2xl border border-slate-200 bg-white p-6 scroll-mt-20">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-950">
                <Clock className="h-5 w-5 text-slate-400" />
                Working Hours
              </h2>
              <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-slate-700">Day</th>
                      <th className="px-3 py-2 text-left font-medium text-slate-700">Open</th>
                      <th className="px-3 py-2 text-left font-medium text-slate-700">Close</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workingHours.map((hour, index) => (
                      <tr key={index} className="border-t border-slate-100">
                        <td className="px-3 py-2 text-slate-600">{hour.day}</td>
                        <td className="px-3 py-2 text-slate-600">{hour.start}</td>
                        <td className="px-3 py-2 text-slate-600">{hour.end}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Why Us Section */}
            <section id="why-us" className="rounded-2xl border border-slate-200 bg-white p-6 scroll-mt-20">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-950">
                <Award className="h-5 w-5 text-slate-400" />
                Why Choose {post.title}?
              </h2>
              <div className="mt-4 space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-slate-950">Expert Service</h3>
                    <p className="mt-1 text-sm text-slate-600">Professional team with years of experience in the industry.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-slate-950">Quality Assurance</h3>
                    <p className="mt-1 text-sm text-slate-600">Committed to delivering the highest quality standards in everything we do.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-slate-950">Customer Focus</h3>
                    <p className="mt-1 text-sm text-slate-600">Your satisfaction is our top priority, we go the extra mile.</p>
                  </div>
                </div>
                {website && (
                  <div className="mt-4">
                    <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm">
                      Learn more on our website <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="rounded-2xl border border-slate-200 bg-white p-6 scroll-mt-20">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-950">
                <MessageSquare className="h-5 w-5 text-slate-400" />
                Contact {post.title}
              </h2>
              <div className="mt-4 space-y-4">
                {phone && (
                  <div className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 bg-slate-50">
                    <Phone className="h-5 w-5 text-slate-400" />
                    <div>
                      <h3 className="font-medium text-slate-950">Phone</h3>
                      <a href={`tel:${phone}`} className="text-blue-600 hover:underline text-sm">{phone}</a>
                    </div>
                  </div>
                )}
                {email && (
                  <div className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 bg-slate-50">
                    <Mail className="h-5 w-5 text-slate-400" />
                    <div>
                      <h3 className="font-medium text-slate-950">Email</h3>
                      <a href={`mailto:${email}`} className="text-blue-600 hover:underline text-sm">{email}</a>
                    </div>
                  </div>
                )}
                {website && (
                  <div className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 bg-slate-50">
                    <Globe className="h-5 w-5 text-slate-400" />
                    <div>
                      <h3 className="font-medium text-slate-950">Website</h3>
                      <a href={website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm">{website}</a>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Location Section */}
            <section id="location" className="rounded-2xl border border-slate-200 bg-white p-6 scroll-mt-20">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-950">
                <MapPin className="h-5 w-5 text-slate-400" />
                Location
              </h2>
              {location && (
                <div className="mt-4 p-4 rounded-lg border border-slate-200 bg-slate-50">
                  <p className="text-sm text-slate-600">{location}</p>
                </div>
              )}
              {mapEmbedUrl && (
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                  <iframe
                    src={mapEmbedUrl}
                    title={`${post.title} map`}
                    className="h-64 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </section>

            {/* FAQ Section */}
            <section id="faq" className="rounded-2xl border border-slate-200 bg-white p-6 scroll-mt-20">
              <h2 className="text-xl font-semibold text-slate-950">Frequently Asked Questions</h2>
              <div className="mt-4 space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-slate-100 pb-4 last:border-0">
                    <h3 className="text-sm font-medium text-slate-950">
                      <span className="mr-2 text-blue-600">{index + 1}.</span>
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Contact */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-950">Quick Contact</h3>
              <div className="mt-4 space-y-3">
                {phone && (
                  <Button className="w-full" asChild>
                    <a href={`tel:${phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                )}
                {website && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={website} target="_blank" rel="noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      Visit Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Listings */}
        {related.length ? (
          <section className="mt-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-950">More in {category}</h2>
              <Link href={taskRoute} className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline">
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
