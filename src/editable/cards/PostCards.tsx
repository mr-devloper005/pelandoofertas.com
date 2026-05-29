import Link from 'next/link'
import { ArrowRight, Clock3, Image as ImageIcon } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

function getContent(post?: SitePost | null) {
  return post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
}

function isUrl(value: string) {
  return value.startsWith('/') || /^https?:\/\//i.test(value)
}

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export function getEditablePostImage(post?: SitePost | null) {
  const content = getContent(post)
  const media = Array.isArray(post?.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = text(content.image) || text(content.featuredImage) || text(content.thumbnail) || text(content.heroImage)
  const logo = text(content.logo) || text(content.avatar)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])][0] || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = getContent(post)
  const raw = text(content.description) || text(content.summary) || text(content.excerpt) || post?.summary || ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = getContent(post)
  return text(content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

function fallbackTitle(post?: SitePost | null) {
  return text(post?.title) || 'Untitled post'
}

export function EditorialFeatureCard({ post, href, label = 'Featured read' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block overflow-hidden ${dc.surface.dark} ${dc.motion.lift}`}>
      <div className="relative min-h-[520px] p-5 sm:p-8 lg:min-h-[640px]">
        <img src={getEditablePostImage(post)} alt={fallbackTitle(post)} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.85))]" />
        <div className="relative z-10 flex h-full min-h-[450px] flex-col justify-end lg:min-h-[560px]">
          <p className={`${dc.type.eyebrow} text-white/75`}>{label}</p>
          <h3 className="mt-4 max-w-3xl text-4xl font-serif leading-[0.94] tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
            {fallbackTitle(post)}
          </h3>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/75 sm:text-base">{getEditableExcerpt(post, 190)}</p>
          <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)]">
            Open post <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block min-w-0 overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
        <img src={getEditablePostImage(post)} alt={fallbackTitle(post)} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.55))]" />
        <span className={`absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${pal.panelText}`}>
          No. {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="p-5">
        <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{getEditableCategory(post)}</p>
        <h3 className="mt-3 line-clamp-2 text-2xl font-serif leading-tight tracking-[-0.04em]">{fallbackTitle(post)}</h3>
        <p className={`mt-3 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getEditableExcerpt(post, 135)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block overflow-hidden ${dc.surface.soft} ${dc.motion.lift}`}>
      <div className="flex items-start gap-4 p-5">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${pal.darkBg} text-xs font-black text-white`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <p className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] ${pal.accentText}`}>
            <Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}
          </p>
          <h3 className="mt-2 line-clamp-2 text-xl font-serif leading-tight tracking-[-0.04em]">{fallbackTitle(post)}</h3>
          <p className={`mt-2 line-clamp-2 text-sm leading-6 ${pal.mutedText}`}>{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group grid min-w-0 gap-5 overflow-hidden ${dc.surface.card} p-4 ${dc.motion.lift} sm:grid-cols-[230px_minmax(0,1fr)]`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-black/5">
        <img src={getEditablePostImage(post)} alt={fallbackTitle(post)} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="min-w-0 p-2 sm:py-4 sm:pr-5">
        <p className={`${dc.type.eyebrow} ${pal.accentText}`}>Read {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-3 line-clamp-3 text-2xl font-serif leading-tight tracking-[-0.04em] sm:text-3xl">{fallbackTitle(post)}</h2>
        <p className={`mt-4 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em]">
          Open post <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export function HorizontalPostCard({ post, href, label = 'Featured' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group grid overflow-hidden ${dc.surface.card} ${dc.motion.lift} md:grid-cols-[0.84fr_1fr]`}>
      <div className="relative min-h-[210px] bg-black/5">
        <img src={getEditablePostImage(post)} alt={fallbackTitle(post)} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.52))]" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--slot4-page-text)]">
          {label}
        </span>
      </div>
      <div className="p-6">
        <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{getEditableCategory(post)}</p>
        <h3 className="mt-3 line-clamp-2 text-3xl font-serif leading-tight tracking-[-0.04em]">{fallbackTitle(post)}</h3>
        <p className={`mt-4 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getEditableExcerpt(post, 150)}</p>
      </div>
    </Link>
  )
}

export function ImageFirstCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className="relative aspect-[3/4] bg-black/5">
        <img src={getEditablePostImage(post)} alt={fallbackTitle(post)} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className={`absolute inset-0 ${pal.overlay}`} />
        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--slot4-page-text)]">
          Image {String(index + 1).padStart(2, '0')}
        </div>
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)]">
          <ImageIcon className="h-3 w-3" /> Visual
        </div>
        <h3 className="mt-4 line-clamp-2 text-xl font-serif leading-tight tracking-[-0.04em]">{fallbackTitle(post)}</h3>
      </div>
    </Link>
  )
}
