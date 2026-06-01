import Link from 'next/link'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Bookmark,
  Building2,
  Camera,
  FileText,
  MapPin,
  MessageCircle,
  Megaphone,
  Send,
  UserRound,
} from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'
import { CompactIndexCard, getEditableExcerpt, postHref } from '@/editable/cards/PostCards'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 5)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => (post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {})
const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singleImages = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singleImages].filter(Boolean).slice(0, 12)
}

const getBody = (post: SitePost) => {
  const content = getContent(post)
  return asText(content.body) || asText(content.description) || asText(content.details) || post.summary || 'Details will appear here once available.'
}

const formatPlainText = (raw: string) => {
  if (/<[a-z][\s\S]*>/i.test(raw)) return raw.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  return raw
    .split(/\n{2,}/)
    .map((part) => `<p>${part.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`)
    .join('')
}

const summaryText = (post: SitePost) => post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || ''
const categoryOf = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback

const mapSrcFor = (post: SitePost) => {
  return ''
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const detailVars = { '--detail-bg': preset.colors.background, '--detail-text': preset.colors.foreground, '--detail-surface': preset.colors.surface, '--detail-accent': preset.colors.accent } as CSSProperties

  return (
    <EditableSiteShell>
      <main style={detailVars} className="bg-[var(--detail-bg)] text-[var(--detail-text)]">
        {task === 'listing' ? <ListingDetail post={post} related={related} /> : null}
        {task === 'classified' ? <ClassifiedDetail post={post} related={related} /> : null}
        {task === 'image' ? <ImageDetail post={post} related={related} /> : null}
        {task === 'sbm' ? <BookmarkDetail post={post} related={related} /> : null}
        {task === 'pdf' ? <PdfDetail post={post} related={related} /> : null}
        {task === 'profile' ? <ProfileDetail post={post} related={related} /> : null}
        {task === 'article' ? <ArticleDetail post={post} related={related} comments={comments} /> : null}
      </main>
    </EditableSiteShell>
  )
}

function BackLink({ task }: { task: TaskKey }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.18em]">
      <ArrowLeft className="h-4 w-4" /> Back to {taskConfig?.label || 'posts'}
    </Link>
  )
}

function SectionLabel({ children }: { children: string }) {
  return <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[var(--detail-accent)]">{children}</p>
}

function ArticleDetail({ post, related, comments }: { post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const images = getImages(post)
  return (
    <section className="mx-auto grid max-w-[1520px] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-14">
      <article className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10">
        <BackLink task="article" />
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[var(--slot4-accent-soft)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em]">{categoryOf(post, 'Article')}</span>
          {post.publishedAt ? <span className="text-xs font-black uppercase tracking-[0.2em] text-black/50">{new Date(post.publishedAt).toLocaleDateString()}</span> : null}
        </div>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.92] tracking-[-0.06em] sm:text-6xl">{post.title}</h1>
        {images[0] ? <img src={images[0]} alt="" className="mt-8 max-h-[620px] w-full rounded-[1.8rem] object-cover" /> : null}
        <BodyContent post={post} />
        <GalleryStrip images={images.slice(1)} label="Related visuals" />
        <EditableComments slug={post.slug} comments={comments} />
      </article>
      <RelatedPanel task="article" related={related} />
    </section>
  )
}

function ListingDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const logo = images[0]
  const address = getField(post, ['address', 'location', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  const mapSrc = mapSrcFor(post)
  return (
    <section className="mx-auto max-w-[1520px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <BackLink task="listing" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <article className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.08)] sm:p-8">
          <div className="grid gap-6 sm:grid-cols-[150px_1fr]">
            <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-[1.8rem] bg-[var(--detail-bg)] ring-1 ring-black/10">
              {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <Building2 className="h-14 w-14 opacity-40" />}
            </div>
            <div>
              <SectionLabel>Business listing</SectionLabel>
              <h1 className="mt-3 max-w-4xl font-serif text-5xl leading-[0.92] tracking-[-0.06em] sm:text-6xl">{post.title}</h1>
              <p className="mt-5 max-w-3xl text-[15px] leading-8 text-black/70">{summaryText(post)}</p>
            </div>
          </div>
          <InfoGrid
            items={[
              ['Location', address, MapPin],
              ['Phone', phone, Phone],
              ['Email', email, Mail],
              ['Website', website, Globe2],
            ]}
          />
          <BodyContent post={post} />
          <GalleryStrip images={images.slice(1)} label="Business showcase" />
        </article>
        <aside className="space-y-5">
          {mapSrc ? <MapBox src={mapSrc} label={address || post.title} /> : <ContactAction website={website} phone={phone} email={email} />}
          {mapSrc ? <ContactAction website={website} phone={phone} email={email} /> : null}
          <RelatedPanel task="listing" related={related} />
        </aside>
      </div>
    </section>
  )
}

function ClassifiedDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'availability', 'type'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  return (
    <section className="mx-auto grid max-w-[1520px] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-14">
      <aside className="rounded-[2rem] border border-black/10 bg-[var(--detail-text)] p-6 text-[var(--detail-bg)] shadow-[0_24px_80px_rgba(0,0,0,0.24)] lg:sticky lg:top-24 lg:self-start">
        <BackLink task="classified" />
        <p className="mt-10 text-[11px] font-black uppercase tracking-[0.26em] text-white/55">Classified notice</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.92] tracking-[-0.06em] sm:text-6xl">{post.title}</h1>
        <div className="mt-8 grid gap-3">
          {price ? <BadgeLine label="Price" value={price} /> : null}
          {condition ? <BadgeLine label="Condition" value={condition} /> : null}
          {location ? <BadgeLine label="Location" value={location} /> : null}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {phone ? (
            <a href={`tel:${phone}`} className="rounded-full bg-[var(--detail-bg)] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-[var(--detail-text)]">
              Call now
            </a>
          ) : null}
          {email ? (
            <a href={`mailto:${email}`} className="rounded-full border border-white/25 px-5 py-3 text-sm font-black uppercase tracking-[0.18em]">
              Email
            </a>
          ) : null}
        </div>
      </aside>
      <article className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.08)] sm:p-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[1.8rem] bg-[var(--slot4-accent)] p-6 text-white">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/70">Offer</p>
            <h2 className="mt-4 font-serif text-4xl leading-[0.95] tracking-[-0.05em]">{post.title}</h2>
            <p className="mt-4 text-[15px] leading-8 text-white/85">{summaryText(post) || getEditableExcerpt(post, 160)}</p>
          </div>
          <div className="overflow-hidden rounded-[1.8rem] border border-black/10 bg-black/5">
            {images[0] ? <img src={images[0]} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full min-h-[260px] items-center justify-center text-black/35"><Megaphone className="h-12 w-12" /></div>}
          </div>
        </div>
        <GalleryStrip images={images.slice(1)} label="Offer images" />
        <BodyContent post={post} />
        <ContactAction website={website} phone={phone} email={email} />
        <RelatedPanel task="classified" related={related} />
      </article>
    </section>
  )
}

function ImageDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  return (
    <section className="mx-auto max-w-[1520px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <BackLink task="image" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.74fr_1.26fr]">
        <aside className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.08)] lg:sticky lg:top-24 lg:self-start">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--detail-text)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-[var(--detail-bg)]">
            <Camera className="h-4 w-4" /> Image story
          </div>
          <h1 className="mt-6 font-serif text-5xl leading-[0.92] tracking-[-0.06em] sm:text-6xl">{post.title}</h1>
          <p className="mt-5 text-[15px] leading-8 text-black/70">{summaryText(post)}</p>
          <BodyContent post={post} compact />
          <ContactAction website={getField(post, ['website', 'url'])} phone={getField(post, ['phone', 'telephone'])} email={getField(post, ['email'])} />
        </aside>
        <div className="grid gap-4 sm:grid-cols-2">
          {(images.length ? images : ['/placeholder.svg?height=900&width=1200']).map((image, index) => (
            <figure key={`${image}-${index}`} className={`overflow-hidden rounded-[1.8rem] border border-black/10 bg-white shadow-[0_16px_48px_rgba(0,0,0,0.08)] ${index === 0 ? 'sm:col-span-2' : ''}`}>
              <img src={image} alt="" className="h-full w-full object-cover" />
              {index === 0 ? <figcaption className="p-5 text-sm font-bold text-black/60">Featured visual from this post.</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <RelatedPanel task="image" related={related} />
      </div>
    </section>
  )
}

function BookmarkDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  return (
    <section className="mx-auto grid max-w-[1520px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-14">
      <article className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.08)] sm:p-8">
        <BackLink task="sbm" />
        <div className="mt-10 flex h-20 w-20 items-center justify-center rounded-[1.6rem] bg-[var(--detail-text)] text-[var(--detail-bg)]">
          <Bookmark className="h-9 w-9" />
        </div>
        <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[0.92] tracking-[-0.06em] sm:text-6xl">{post.title}</h1>
        <p className="mt-5 max-w-3xl text-[15px] leading-8 text-black/70">{summaryText(post)}</p>
        <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--detail-text)] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-[var(--detail-bg)]">
          Request more details
        </Link>
        <BodyContent post={post} />
      </article>
      <RelatedPanel task="sbm" related={related} />
    </section>
  )
}

function PdfDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  return (
    <section className="mx-auto grid max-w-[1520px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-14">
      <article className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.08)] sm:p-8">
        <BackLink task="pdf" />
        <div className="mt-8 grid gap-6 sm:grid-cols-[120px_1fr]">
          <div className="flex h-28 w-28 items-center justify-center rounded-[1.6rem] bg-[var(--detail-text)] text-[var(--detail-bg)]">
            <FileText className="h-12 w-12" />
          </div>
          <div>
            <SectionLabel>PDF resource</SectionLabel>
            <h1 className="mt-3 max-w-4xl font-serif text-5xl leading-[0.92] tracking-[-0.06em] sm:text-6xl">{post.title}</h1>
          </div>
        </div>
        <BodyContent post={post} />
        <div className="mt-8 rounded-[1.8rem] border border-black/10 bg-[var(--detail-bg)] p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-black/45">Document preview</p>
          <p className="mt-3 text-sm leading-7 text-black/70">
            This classified document is summarised on the page. Use the contact page to request the full details.
          </p>
          <Link href="/contact" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--detail-text)] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-[var(--detail-bg)]">
            Request document details
          </Link>
        </div>
      </article>
      <RelatedPanel task="pdf" related={related} />
    </section>
  )
}

function ProfileDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  const website = getField(post, ['website', 'url'])
  const email = getField(post, ['email'])
  return (
    <section className="mx-auto grid max-w-[1520px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[420px_minmax(0,1fr)] lg:px-8 lg:py-14">
      <aside className="rounded-[2rem] border border-black/10 bg-white p-8 text-center shadow-[0_16px_48px_rgba(0,0,0,0.08)] lg:sticky lg:top-24 lg:self-start">
        <BackLink task="profile" />
        <div className="mx-auto mt-10 flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-[var(--detail-bg)] ring-1 ring-black/10">
          {images[0] ? <img src={images[0]} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-16 w-16 opacity-45" />}
        </div>
        <h1 className="mt-6 font-serif text-5xl leading-[0.92] tracking-[-0.06em]">{post.title}</h1>
        {role ? <p className="mt-3 text-[11px] font-black uppercase tracking-[0.24em] text-[var(--detail-accent)]">{role}</p> : null}
        <ContactAction website={website} email={email} />
      </aside>
      <article className="rounded-[2rem] border border-black/10 bg-white p-7 shadow-[0_16px_48px_rgba(0,0,0,0.08)] sm:p-10">
        <BodyContent post={post} />
        <GalleryStrip images={images.slice(1)} label="Profile gallery" />
        <RelatedPanel task="profile" related={related} />
      </article>
    </section>
  )
}

function BodyContent({ post, compact = false }: { post: SitePost; compact?: boolean }) {
  return <div className={`article-content mt-8 max-w-none ${compact ? 'text-base leading-8' : 'text-[15px] leading-8'} text-black/80`} dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }} />
}

function InfoGrid({ items }: { items: Array<[string, string, typeof MapPin]> }) {
  const visible = items.filter(([, value]) => value)
  if (!visible.length) return null
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {visible.map(([label, value, Icon]) => (
        <div key={label} className="rounded-[1.4rem] border border-black/10 bg-[var(--detail-bg)] p-4">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-black/50">
            <Icon className="h-4 w-4" /> {label}
          </div>
          <p className="mt-2 break-words text-sm font-bold leading-6">{value}</p>
        </div>
      ))}
    </div>
  )
}

function GalleryStrip({ images, label, large = false }: { images: string[]; label: string; large?: boolean }) {
  if (!images.length) return null
  return (
    <section className="mt-8">
      <SectionLabel>{label}</SectionLabel>
      <div className={`mt-4 grid gap-3 ${large ? 'sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {images.slice(0, large ? 4 : 8).map((image, index) => (
          <img key={`${image}-${index}`} src={image} alt="" className="aspect-[4/3] rounded-[1.4rem] object-cover ring-1 ring-black/10" />
        ))}
      </div>
    </section>
  )
}

function MapBox({ src, label }: { src: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-2 p-4 text-sm font-black uppercase tracking-[0.18em]">
        <MapPin className="h-4 w-4" /> {label || 'Map location'}
      </div>
      <iframe src={src} title="Map" loading="lazy" className="h-80 w-full border-0" />
    </div>
  )
}

function ContactAction(_props?: { website?: string; phone?: string; email?: string }) {
  return (
    <div className="mt-5 rounded-[1.8rem] border border-black/10 bg-white p-5 shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-black/45">Quick actions</p>
      <p className="mt-4 text-sm leading-7 text-black/70">Need next steps for this post? Use the classified contact page to arrange a response.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[var(--detail-text)] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[var(--detail-bg)]">
          Send inquiry
        </Link>
        <Link href="/classified" className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-black uppercase tracking-[0.18em]">
          Browse board
        </Link>
      </div>
    </div>
  )
}

function BadgeLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[1.35rem] border border-white/12 bg-white/10 px-4 py-3 text-sm">
      <span className="font-black uppercase tracking-[0.16em] text-white/65">{label}</span>
      <span className="font-black">{value}</span>
    </div>
  )
}

function RelatedPanel({ task, related }: { task: TaskKey; related: SitePost[] }) {
  const taskConfig = getTaskConfig(task)
  return (
    <aside className="min-w-0 space-y-5">
      {related.length ? (
        <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-black tracking-[-0.04em]">More like this</h2>
            <Link href={taskConfig?.route || '/'} className="text-xs font-black uppercase tracking-[0.16em] text-black/45">
              View all
            </Link>
          </div>
          <div className="mt-5 grid gap-3">
            {related.map((item, index) => (
              <RelatedCard key={item.id || item.slug || index} task={task} post={item} />
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  )
}

function RelatedCard({ task, post }: { task: TaskKey; post: SitePost }) {
  const href = postHref(task, post)
  return <CompactIndexCard post={post} href={href} index={0} />
}

function EditableComments({ slug, comments }: { slug: string; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <section className="mt-10 rounded-[2rem] border border-black/10 bg-[var(--detail-bg)] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-2 text-lg font-black">
        <MessageCircle className="h-5 w-5" /> Comments
      </div>
      <div className="mt-5 grid gap-3">
        {comments.slice(0, 5).map((comment) => (
          <div key={comment.id} className="rounded-[1.35rem] border border-black/10 bg-white p-4">
            <p className="text-sm font-black">{comment.name}</p>
            <p className="mt-2 text-sm leading-6 text-black/70">{comment.comment}</p>
          </div>
        ))}
        {!comments.length ? <p className="text-sm text-black/55">No comments yet for {slug}.</p> : null}
      </div>
      <div className="mt-5 rounded-[1.35rem] border border-dashed border-black/10 bg-white p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-black/45">Leave a note</p>
        <div className="mt-3 flex items-center gap-3 rounded-full border border-black/10 bg-[var(--detail-bg)] px-4 py-3 text-sm text-black/55">
          <Send className="h-4 w-4" />
          Comments are saved locally in the browser.
        </div>
      </div>
    </section>
  )
}
