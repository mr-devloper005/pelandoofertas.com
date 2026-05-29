import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Building2, Camera, FileText, Filter, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'
import {
  CompactIndexCard,
  EditorialFeatureCard,
  HorizontalPostCard,
  ImageFirstCard,
  RailPostCard,
  ArticleListCard,
  getEditableCategory,
  getEditablePostImage,
} from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; badge: string; title: string; description: string }> = {
  article: {
    icon: FileText,
    badge: 'Classified',
    title: 'Classified cards with a readable rhythm',
    description: 'Longer posts stay readable with a stronger title hierarchy and calmer spacing.',
  },
  listing: {
    icon: Building2,
    badge: 'Classified',
    title: 'Directory-style classified cards',
    description: 'Business listings emphasize location, action cues, and quick comparison.',
  },
  classified: {
    icon: Megaphone,
    badge: 'Offer',
    title: 'Fast classifieds with practical scanning',
    description: 'Quick posts, sharper labels, and direct actions keep browsing moving.',
  },
  image: {
    icon: Camera,
    badge: 'Classified',
    title: 'Image-first classifieds with bolder visuals',
    description: 'Visual posts get more room to breathe and stay easy to scan on mobile.',
  },
  sbm: {
    icon: FileText,
    badge: 'Classified',
    title: 'Saved classified pages and reference notes',
    description: 'Saved posts read like a compact shelf with less clutter and clearer labels.',
  },
  pdf: {
    icon: FileText,
    badge: 'Classified',
    title: 'Document-style classified pages',
    description: 'Files feel more like a library with obvious file cues and structured summaries.',
  },
  profile: {
    icon: UserRound,
    badge: 'Classified',
    title: 'Seller profiles and trust cues',
    description: 'Identity and trust cues stay visible before the grid begins.',
  },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices.classified
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const page = pagination.page || 1
  const label = 'Classified'
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = { '--archive-bg': preset.colors.background, '--archive-text': preset.colors.foreground, '--archive-surface': preset.colors.surface, '--archive-accent': preset.colors.accent } as CSSProperties
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category
  const featured = posts.slice(0, 8)

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="mx-auto grid max-w-[1520px] gap-4 px-4 py-8 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-12">
          <div className="rounded-[2rem] bg-[var(--archive-text)] p-6 text-[var(--archive-bg)] shadow-[0_24px_80px_rgba(0,0,0,0.2)] sm:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em]">
              <Icon className="h-4 w-4" />
              {label}
            </div>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[0.94] tracking-[-0.06em] sm:text-6xl">
              {voice.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-8 text-[var(--archive-bg)]/78">{voice.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={basePath} className="rounded-full bg-[var(--archive-bg)] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-[var(--archive-text)]">
                Browse all
              </Link>
              <Link href="/search" className="rounded-full border border-white/20 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-[var(--archive-bg)]">
                Search posts
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {voice.chips.map((chip) => (
                <div key={chip} className="rounded-[1.25rem] border border-white/10 bg-white/8 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white/82">
                  {chip}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <form action={basePath} className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] text-[var(--archive-accent)]">
                <Filter className="h-4 w-4" /> Filter
              </div>
              <select name="category" defaultValue={category} className="mt-4 h-12 w-full rounded-full border border-black/10 bg-white px-4 text-sm font-bold outline-none">
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--archive-accent)] text-sm font-black uppercase tracking-[0.18em] text-white">
                Apply
              </button>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-black/50">Showing: {categoryLabel}</p>
            </form>

            <div className="grid gap-4 sm:grid-cols-2">
              {featured.slice(0, 4).map((post, index) => (
                <Link
                  key={post.id || post.slug || index}
                  href={`${basePath}/${post.slug}`}
                  className="group overflow-hidden rounded-[1.4rem] border border-black/10 bg-white shadow-[0_16px_48px_rgba(0,0,0,0.08)]"
                >
                  <div className="relative aspect-[4/3] bg-black/5">
                    <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.62))]" />
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--archive-text)]">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--archive-accent)]">{getEditableCategory(post)}</p>
                    <h3 className="mt-2 line-clamp-2 font-serif text-2xl tracking-[-0.04em]">{post.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1520px] px-4 pb-16 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-black/15 bg-white p-10 text-center shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
              <Search className="mx-auto h-8 w-8 text-black/40" />
              <h2 className="mt-4 font-serif text-3xl tracking-[-0.05em]">No posts found</h2>
              <p className="mt-2 text-sm leading-7 text-black/55">Try another category or refresh this page after publishing new content.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? (
              <Link href={pageHref(basePath, category, page - 1)} className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.18em]">
                Previous
              </Link>
            ) : null}
            <span className="rounded-full bg-[var(--archive-text)] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-[var(--archive-bg)]">
              Page {page} of {pagination.totalPages || 1}
            </span>
            {pagination.hasNextPage ? (
              <Link href={pageHref(basePath, category, page + 1)} className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.18em]">
                Next
              </Link>
            ) : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'listing') {
    return <HorizontalPostCard post={post} href={href} label="Directory" />
  }
  if (task === 'classified') {
    return index % 3 === 0 ? <EditorialFeatureCard post={post} href={href} label="Offer" /> : <CompactIndexCard post={post} href={href} index={index} />
  }
  if (task === 'image') {
    return index % 2 === 0 ? <ImageFirstCard post={post} href={href} index={index} /> : <RailPostCard post={post} href={href} index={index} />
  }
  if (task === 'sbm') {
    return <CompactIndexCard post={post} href={href} index={index} />
  }
  if (task === 'pdf') {
    return <HorizontalPostCard post={post} href={href} label="Document" />
  }
  if (task === 'profile') {
    return index % 2 === 0 ? <CompactIndexCard post={post} href={href} index={index} /> : <ImageFirstCard post={post} href={href} index={index} />
  }
  return <ArticleListCard post={post} href={href} index={index} />
}
