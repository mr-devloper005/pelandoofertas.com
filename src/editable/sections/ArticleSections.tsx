import Link from 'next/link'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import type { SitePost, SiteFeedPagination } from '@/lib/site-connector'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { ArticleListCard, postHref } from '@/editable/cards/PostCards'

export function EditableArticleArchive({ posts, pagination, category = 'all', basePath = '/article' }: { posts: SitePost[]; pagination: SiteFeedPagination; category?: string; basePath?: string }) {
  const voice = taskPageVoices.classified
  const page = pagination.page || 1
  const pageHref = (nextPage: number) => `${basePath}?${new URLSearchParams({ ...(category && category !== 'all' ? { category } : {}), page: String(nextPage) }).toString()}`

  return (
    <main className={dc.shell.page}>
      <section className={`${dc.shell.section} pt-10 sm:pt-14 lg:pt-16`}>
        <div className="rounded-[2rem] bg-[var(--slot4-dark-bg)] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.2)] sm:p-8 lg:p-10">
          <p className={`${dc.type.eyebrow} text-white/70`}>{voice.eyebrow}</p>
          <h1 className={`${dc.type.heroTitle} mt-5 max-w-5xl`}>{voice.headline}</h1>
          <p className="mt-6 max-w-3xl text-[15px] leading-8 text-white/72">{voice.description}</p>
          <form action={basePath} className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <select name="category" defaultValue={category || 'all'} className="min-w-0 flex-1 rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-bold text-[var(--slot4-page-text)] outline-none">
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
            <button className={dc.button.primary}>Filter</button>
          </form>
        </div>
      </section>

      <section className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        {posts.length ? (
          <div className="grid gap-5">
            {posts.map((post, index) => (
              <ArticleListCard key={post.id || post.slug} post={post} href={postHref('article', post, basePath)} index={index + (page - 1) * pagination.limit} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-black/15 bg-white p-8 text-center shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
            <h2 className="font-serif text-3xl tracking-[-0.05em]">No posts found</h2>
            <p className={`mt-3 text-sm leading-7 ${pal.mutedText}`}>Try another category or return to the classified board.</p>
          </div>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {pagination.hasPrevPage ? (
            <Link href={pageHref(page - 1)} className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.18em]">
              Previous
            </Link>
          ) : null}
          <span className="rounded-full bg-[var(--slot4-dark-bg)] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-white">
            Page {page} of {pagination.totalPages || 1}
          </span>
          {pagination.hasNextPage ? (
            <Link href={pageHref(page + 1)} className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.18em]">
              Next
            </Link>
          ) : null}
        </div>
      </section>
    </main>
  )
}

export function EditableArticleDetailShell({ slug, post }: { slug: string; post: SitePost | null }) {
  const voice = taskPageVoices.classified
  return (
    <main className={dc.shell.page}>
      <section className={`${dc.shell.section} pt-10 sm:pt-14 lg:pt-16`}>
        <div className="grid gap-6 rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.08)] lg:grid-cols-[minmax(0,1fr)_320px] lg:p-10">
          <div className="min-w-0">
            <Link href="/classified" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.18em]">
              <ChevronLeft className="h-4 w-4" /> Classified
            </Link>
            <p className={`${dc.type.eyebrow} mt-8 ${pal.accentText}`}>{voice.eyebrow}</p>
            <h1 className={`mt-4 max-w-4xl ${dc.type.heroTitle} ${pal.panelText}`}>{post?.title || pagesContent.detailPages.article.fallbackTitle}</h1>
          </div>
          <aside className="min-w-0 rounded-[2rem] bg-[var(--slot4-dark-bg)] p-6 text-white">
            <p className={`${dc.type.eyebrow} text-white/70`}>Reading note</p>
            <p className="mt-4 text-sm leading-7 text-white/72">{voice.secondaryNote}</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)]">
              Contact <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>
      <section className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10">
          <p className={`text-sm leading-8 ${pal.mutedText}`}>{post?.summary || `Classified detail content for ${slug} will render through the editable detail page.`}</p>
        </div>
      </section>
    </main>
  )
}
