import Link from 'next/link'
import { ArrowRight, Building2, FileText, Image as ImageIcon, LayoutGrid, Tag, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory':
    'bg-[radial-gradient(ellipse_100%_80%_at_50%_-10%,rgba(29,84,109,0.12),transparent_50%),linear-gradient(180deg,#ffffff_0%,#f3f4f4_55%,#e8ecee_100%)]',
  'listing-showcase':
    'bg-[linear-gradient(180deg,#ffffff_0%,#f3f4f4_45%,#eef1f2_100%)]',
  'article-editorial':
    'bg-[linear-gradient(180deg,#f8fafb_0%,#ffffff_38%),repeating-linear-gradient(180deg,transparent,transparent_11px,rgba(6,30,41,0.04)_11px,rgba(6,30,41,0.04)_12px)]',
  'article-journal':
    'bg-[radial-gradient(circle_at_0%_0%,rgba(95,149,152,0.12),transparent_42%),linear-gradient(180deg,#ffffff_0%,#f3f4f4_100%)]',
  'image-masonry': 'bg-[linear-gradient(180deg,#061e29_0%,#0d2f3f_55%,#123a4a_100%)] text-white',
  'image-portfolio': 'bg-[linear-gradient(165deg,#061e29_0%,#1d546d_40%,#0a1f28_100%)] text-white',
  'profile-creator': 'bg-[linear-gradient(180deg,#050f14_0%,#0c2230_100%)] text-white',
  'profile-business':
    'bg-[linear-gradient(135deg,#f3f4f4_0%,#ffffff_40%,#e9eef0_100%)] border-b border-[#061e29]/8',
  'classified-bulletin':
    'bg-[linear-gradient(180deg,#fffdf8_0%,#f3f4f4_100%)]',
  'classified-market':
    'bg-[linear-gradient(90deg,#f3f4f4_0%,#ffffff_35%,#eef6f4_100%)]',
  'sbm-curation':
    'bg-[linear-gradient(180deg,#f4f6f8_0%,#ffffff_50%,#eef1f4_100%)]',
  'sbm-library':
    'bg-[radial-gradient(circle_at_100%_0%,rgba(29,84,109,0.08),transparent_40%),linear-gradient(180deg,#ffffff_0%,#f3f4f4_100%)]',
} as const

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const listingFallback = task === 'listing' && posts.length === 0 ? getMockPostsForTask('listing') : []
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const pagePosts = task === 'listing' ? [...posts, ...listingFallback] : posts
  const schemaItems = pagePosts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const shellClass = variantShells[layoutKey as keyof typeof variantShells] || 'bg-background'
  const Icon = taskIcons[task] || LayoutGrid

  const isDark = ['image-masonry', 'image-portfolio', 'profile-creator'].includes(layoutKey)
  const ui = isDark
    ? {
        muted: 'text-slate-300',
        panel: 'border border-white/10 bg-white/6',
        soft: 'border border-white/10 bg-white/5',
        input: 'border-white/10 bg-white/6 text-white',
        button: 'bg-white text-slate-950 hover:bg-slate-200',
      }
    : layoutKey.startsWith('article') || layoutKey.startsWith('sbm')
      ? {
          muted: 'text-slate-600',
          panel: 'border border-[#061e29]/10 bg-white shadow-[0_16px_48px_rgba(6,30,41,0.06)]',
          soft: 'border border-[#1d546d]/15 bg-[#f3f4f4]/90',
          input: 'border border-[#061e29]/12 bg-white text-[#061e29]',
          button: 'bg-[#1d546d] text-[#f3f4f4] hover:bg-[#5f9598]',
        }
      : {
          muted: 'text-slate-600',
          panel: 'border border-[#061e29]/10 bg-white shadow-[0_14px_40px_rgba(6,30,41,0.06)]',
          soft: 'border border-[#1d546d]/12 bg-[#f3f4f4]/80',
          input: 'border border-[#061e29]/12 bg-white text-[#061e29]',
          button: 'bg-[#1d546d] text-[#f3f4f4] hover:bg-[#5f9598]',
        }

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div className={`relative overflow-hidden rounded-2xl border-l-4 border-[#5f9598] p-7 sm:p-8 ${ui.panel}`}>
              <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#5f9598]/10 blur-2xl" aria-hidden />
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#1d546d]">
                <Icon className="h-4 w-4" /> {taskConfig?.label || task}
              </div>
              <h1 className="mt-4 max-w-2xl font-sans text-4xl font-semibold tracking-[-0.03em] text-[#061e29]">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${ui.muted}`}>
                Browse trusted business listings and jump into detail pages tuned for trust cues and geography-first context.
              </p>
            </div>
            <div className={`rounded-2xl p-6 ${ui.soft}`}>
              <p className={`text-xs uppercase tracking-[0.2em] ${ui.muted}`}>Filter by category</p>
              <form className="mt-4 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="max-w-3xl border-b border-[#061e29]/10 pb-8">
              <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-4 font-display text-5xl font-semibold tracking-[-0.04em] text-[#061e29]">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-base leading-8 ${ui.muted}`}>
                Editorial pacing with wider measure, serif headlines, and calmer supporting copy so long reads feel crafted—not templated.
              </p>
            </div>
            <div className={`rounded-2xl p-6 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.22em] text-[#1d546d]`}>Reading tools</p>
              <p className={`mt-4 text-sm leading-7 ${ui.muted}`}>Filter by category to move between topics while keeping the typographic rhythm consistent with the rest of the site.</p>
              <form className="mt-5 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {layoutKey === 'image-masonry' || layoutKey === 'image-portfolio' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5f9598]`}>
                <Icon className="h-3.5 w-3.5" /> Visual index
              </div>
              <h1 className="mt-5 font-sans text-5xl font-semibold tracking-[-0.05em]">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-xl text-sm leading-8 ${ui.muted}`}>
                Gallery-forward framing: larger tiles, cinematic gradients, and fewer text blocks so imagery leads before metadata.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className={`min-h-[200px] rounded-2xl border border-white/10 ${ui.panel}`} />
              <div className={`min-h-[200px] rounded-2xl border border-white/10 ${ui.soft}`} />
              <div className={`col-span-2 min-h-[110px] rounded-2xl border border-[#5f9598]/25 ${ui.panel}`} />
            </div>
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className={`mb-12 rounded-2xl p-8 sm:p-10 ${ui.panel}`}>
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div className={`min-h-[220px] rounded-xl border border-dashed border-[#1d546d]/25 ${ui.soft}`} />
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.26em] ${ui.muted}`}>{taskConfig?.label || task}</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-foreground">Identity pages with room for proof, story, and contact paths.</h1>
                <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>
                  A split hero keeps avatars and cover space separated from narrative copy—distinct from listing grids and article rails.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || layoutKey === 'classified-market' ? (
          <section className="mb-12 grid gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
            <div className={`flex flex-col justify-center rounded-2xl p-6 sm:p-7 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.26em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#061e29] sm:text-4xl">Offers, roles, and notices—optimized for fast decisions.</h1>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {['Scan-friendly tiles', 'Shorter copy blocks', 'Urgency-forward labels'].map((item) => (
                <div key={item} className={`rounded-xl p-4 ${ui.soft}`}>
                  <p className="text-sm font-semibold text-[#061e29]">{item}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="border-l-2 border-[#1d546d]/40 pl-6">
              <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#061e29]">Research shelves with compact density and link-first hierarchy.</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>
                Built for bookmarking workflows: tighter vertical rhythm, monospace accents in filters, and calmer panels than marketplace pages.
              </p>
            </div>
            <div className={`rounded-2xl p-6 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.22em] text-[#1d546d]`}>Shelf filter</p>
              <form className="mt-4 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {intro ? (
          <section className={`mb-12 rounded-2xl border border-[#061e29]/6 p-6 sm:p-8 ${ui.panel}`}>
            <h2 className="text-2xl font-semibold text-foreground">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${ui.muted}`}>{paragraph}</p>
            ))}
            {task !== 'listing' ? (
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                {intro.links.map((link) => (
                  <a key={link.href} href={link.href} className="font-semibold text-foreground hover:underline">{link.label}</a>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={pagePosts} category={category} />
      </main>
      <Footer />
    </div>
  )
}
