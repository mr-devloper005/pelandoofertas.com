import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed, type SitePost } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: 'Search posts',
    description: 'Search posts, stories, listings, and useful resources from this site.',
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compact = (value: unknown) =>
  typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim() : ''
const lower = (value: unknown) => compact(value).toLowerCase()
const contentOf = (post: SitePost) =>
  post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
const imageOf = (post: SitePost) => {
  const content = contentOf(post)
  const media = Array.isArray(post.media)
    ? post.media.find((item) => item && typeof item.url === 'string')?.url
    : ''
  const gallery = Array.isArray(content.images)
    ? (content.images.find((item) => typeof item === 'string') as string | undefined)
    : ''

  return (
    media ||
    compact(content.featuredImage) ||
    compact(content.image) ||
    compact(content.thumbnail) ||
    gallery ||
    ''
  )
}
const summaryOf = (post: SitePost) => {
  const content = contentOf(post)
  return (
    post.summary ||
    compact(content.summary) ||
    compact(content.description) ||
    compact(content.excerpt) ||
    compact(content.body)
  )
}
const matches = (post: SitePost, query: string, task: string, category: string) => {
  const content = contentOf(post)
  const taskKey = getPostTaskKey(post)
  if (task && taskKey !== task) return false

  const categoryText = lower(content.category)
  const tagsText = Array.isArray(post.tags) ? post.tags.join(' ').toLowerCase() : ''
  if (category && !`${categoryText} ${tagsText}`.includes(category)) return false
  if (!query) return true

  return [
    post.title,
    post.summary,
    content.title,
    content.description,
    content.body,
    content.excerpt,
    content.category,
    Array.isArray(post.tags) ? post.tags.join(' ') : '',
  ].some((item) => lower(item).includes(query))
}

function SearchResult({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = imageOf(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'

  return (
    <Link
      href={href}
      className={`group overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${index === 0 ? 'md:col-span-2' : ''}`}
    >
      {image ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-black shadow-sm">
            {taskLabel}
          </span>
        </div>
      ) : null}
      <div className="p-5 sm:p-6">
        {!image ? (
          <span className="rounded-full bg-black px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
            {taskLabel}
          </span>
        ) : null}
        <h2 className="mt-4 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.04em] text-neutral-950">
          {post.title}
        </h2>
        {summary ? (
          <p className="mt-3 line-clamp-3 text-sm font-semibold leading-7 text-neutral-600">
            {stripHtml(summary)}
          </p>
        ) : null}
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
          Open result <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; task?: string; category?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const feed = await fetchSiteFeed(80, { fresh: true, timeoutMs: 5000 })
  const posts = (feed?.posts || []).filter((post) => matches(post, query, task, category)).slice(0, 48)

  return (
    <EditableSiteShell>
      <main className="bg-[var(--editable-page-bg,#f8f4ee)] px-4 py-12 text-[var(--editable-page-text,#1f1713)] sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-neutral-500">Search</p>
                <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] sm:text-6xl">
                  Find posts faster.
                </h1>
                <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-neutral-600">
                  Search articles, listings, bookmarks, images, PDFs, and profiles from the live site feed.
                </p>
              </div>
              <form action="/search" className="flex w-full max-w-xl gap-3 rounded-full border border-black/10 bg-neutral-50 p-2">
                <Search className="ml-3 mt-2.5 h-5 w-5 text-neutral-400" />
                <input
                  name="q"
                  defaultValue={resolved.q || ''}
                  placeholder="Search posts..."
                  className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none"
                />
                <button className="rounded-full bg-black px-5 py-3 text-sm font-black text-white">Search</button>
              </form>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <SearchResult key={post.id || post.slug} post={post} index={index} />
            ))}
          </div>
          {!posts.length ? (
            <div className="mt-8 rounded-[2rem] border border-dashed border-black/20 bg-white p-10 text-center">
              <h2 className="text-2xl font-black">No matching posts found.</h2>
              <p className="mt-3 text-sm font-semibold text-neutral-500">
                Try another keyword or browse the task pages from the navbar.
              </p>
            </div>
          ) : null}
        </section>
      </main>
    </EditableSiteShell>
  )
}
