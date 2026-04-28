'use client'

import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag, Star, Share2, Heart, Clock, Facebook, ExternalLink, MessageSquare, ChevronRight } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { useState } from 'react'

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
  const [activeTab, setActiveTab] = useState('overview')
  const [isFavorited, setIsFavorited] = useState(false)

  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website.trim() : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const logo = typeof content.logo === 'string' ? content.logo : images[0]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'about', label: 'About' },
    { id: 'hours', label: 'Working Hours' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'contact', label: 'Contact' },
    { id: 'location', label: 'Location' },
    { id: 'faq', label: 'FAQ' },
    { id: 'reviews', label: 'Reviews' },
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
  ]

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

  const updatedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '21 Apr 2026'

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
            <div className="flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4 md:h-24 md:w-24">
              <ContentImage src={logo} alt={post.title} width={80} height={80} className="h-16 w-16 object-contain md:h-20 md:w-20" />
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
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <MessageSquare className="mr-1 h-3 w-3" />
                  Add Review
                </Button>
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
                <Button className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 overflow-x-auto border-b border-slate-200">
          <nav className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-slate-950'
                    : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
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
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-slate-950">ABOUT {post.title.toUpperCase()}</h2>
              <h3 className="mt-2 text-lg font-medium text-slate-700">{post.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
            </div>

            {/* Why Choose Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-slate-950">WHY CHOOSE {post.title.toUpperCase()}?</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                We are committed to providing exceptional service and quality. Our team of experts ensures that every interaction meets the highest standards.
                {website && (
                  <span className="mt-2 block">
                    Visit our <a href={website} target="_blank" rel="noreferrer" className="text-blue-600 underline">website</a> for more information.
                  </span>
                )}
              </p>
            </div>

            {/* Contact Details Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-slate-950">CONTACT DETAILS OF {post.title.toUpperCase()}</h2>
              <div className="mt-4 space-y-3">
                {phone && (
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>{phone}</span>
                  </div>
                )}
                {email && (
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a>
                  </div>
                )}
                {location && (
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>{location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Follow Us Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-slate-950">FOLLOW US</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {website && (
                  <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-950 hover:bg-slate-50">
                    <Globe className="h-4 w-4" />
                    Website
                  </a>
                )}
                <Button variant="outline" size="sm" className="rounded-lg">
                  <Facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-slate-950">FREQUENTLY ASKED QUESTIONS ABOUT {post.title.toUpperCase()}</h2>
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
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Share & Favorites */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share page
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-lg"
                  onClick={() => setIsFavorited(!isFavorited)}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  {isFavorited ? 'Favorited' : 'Add to Favorites'}
                </Button>
              </div>
            </div>

            {/* Working Hours */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-950">
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
            </div>

            {/* Map */}
            {mapEmbedUrl && (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <iframe
                  src={mapEmbedUrl}
                  title={`${post.title} map`}
                  className="h-64 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}

            {/* Updated By */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">UPDATED BY</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <ShieldCheck className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-950">{post.title}</p>
                  <p className="text-xs text-slate-500">On {updatedDate}</p>
                </div>
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
