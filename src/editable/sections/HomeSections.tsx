import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import {
  CompactIndexCard,
  HorizontalPostCard,
  ImageFirstCard,
  RailPostCard,
  getEditablePostImage,
  postHref,
} from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function safePosts(posts: SitePost[]) {
  return posts.filter(Boolean)
}

function sectionLead(index: number, post?: SitePost | null) {
  return post ? `${String(index + 1).padStart(2, '0')} • ${post.title}` : `0${index + 1} • Featured`
}

function ActionTile({ href, label, description }: { href: string; label: string; description: string }) {
  return (
    <Link
      href={href}
      className="group flex min-h-[112px] flex-col justify-between rounded-[1.4rem] border border-white/10 bg-[var(--slot4-accent)] p-5 text-white transition duration-300 hover:-translate-y-1 hover:brightness-95"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm font-black uppercase tracking-[0.18em]">{label}</span>
        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <p className="mt-4 max-w-[22ch] text-xs leading-5 text-white/82">{description}</p>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const featured = safePosts(posts).slice(0, 6)
  const heroSlides = featured.length ? featured : posts.slice(0, 6)
  const tiles = [
    { label: 'Business', href: '/classified?category=business', description: 'Browse services, shops, and everyday business offers.' },
    { label: 'Real Estate', href: '/classified?category=real-estate', description: 'Open property posts and location-based notices.' },
    { label: 'Automotive', href: '/classified?category=automotive', description: 'Jump into cars, parts, and vehicle offers.' },
    { label: 'Services', href: '/classified?category=service', description: 'Read direct service posts and requests.' },
    { label: 'Shopping', href: '/classified?category=shopping', description: 'See retail offers and product highlights.' },
    { label: 'Jobs', href: '/classified?category=jobs-payroll', description: 'Check work opportunities and hiring notices.' },
    { label: 'Food', href: '/classified?category=food', description: 'Browse food, hospitality, and delivery posts.' },
    { label: 'Finance', href: '/classified?category=finance', description: 'Open money-related offers and updates.' },
    { label: 'Search', href: '/search', description: 'Find posts, categories, and pages.' },
  ]

  return (
    <section className="overflow-hidden bg-[var(--slot4-page-bg)] pt-4">
      <div className="mx-auto grid max-w-[1520px] gap-4 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="slot4-hero-panel slot4-fade-up rounded-[2rem] border border-white/10 bg-[var(--slot4-dark-bg)] text-white shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
          <div className="grid gap-6 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.26em] text-white/80">
                {pagesContent.home.hero.badge}
              </span>
              <span className="rounded-full bg-[var(--slot4-accent)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.26em] text-white">
                Classified
              </span>
            </div>

            <div>
              <h1 className="max-w-4xl font-serif text-5xl leading-[0.9] tracking-[-0.06em] text-white sm:text-6xl lg:text-[5.6rem]">
                {pagesContent.home.hero.title.join(' ')}
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-8 text-white/76 sm:text-base">
                {pagesContent.home.hero.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href={primaryRoute} className={dc.button.primary}>
                Browse now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/18 bg-white/5 px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
              >
                Contact us
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.3rem] border border-white/12 bg-white/6 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/55">Focus</p>
                <p className="mt-2 font-serif text-2xl tracking-[-0.04em]">{pagesContent.home.hero.focusLabel}</p>
              </div>
              <div className="rounded-[1.3rem] border border-white/12 bg-white/6 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/55">Latest</p>
                <p className="mt-2 font-serif text-2xl tracking-[-0.04em]">{featured[0]?.title ? 'New entries' : 'Ready to browse'}</p>
              </div>
              <div className="rounded-[1.3rem] border border-white/12 bg-white/6 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/55">Route</p>
                <p className="mt-2 font-serif text-2xl tracking-[-0.04em]">/{primaryTask}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="slot4-fade-up slot4-delay-1 grid gap-3">
          <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-[linear-gradient(180deg,rgba(9,9,9,0.92),rgba(9,9,9,0.18))] px-4 py-3 text-white">
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em]">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--slot4-accent)]" />
                Live board
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white" aria-label="Previous slide">
                  ‹
                </button>
                <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-white" aria-label="Pause animation">
                  ❚❚
                </button>
                <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white" aria-label="Next slide">
                  ›
                </button>
              </div>
            </div>

            <div className="slot4-hero-stage grid grid-cols-2 gap-3 p-4 pt-14 sm:grid-cols-3">
              {heroSlides.map((post, index) => (
                <Link
                  key={post.id || post.slug || index}
                  href={postHref(primaryTask, post, primaryRoute)}
                  className={`slot4-hero-card group relative overflow-hidden rounded-[1.35rem] border border-black/10 bg-black/5 shadow-[0_16px_48px_rgba(0,0,0,0.08)] ${
                    index === 0 ? 'col-span-2 row-span-2 min-h-[360px]' : 'min-h-[170px]'
                  }`}
                >
                  <img
                    src={getEditablePostImage(post)}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.68))]" />
                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)]">
                    {sectionLead(index, post)}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h3 className={`line-clamp-2 ${index === 0 ? 'text-2xl' : 'text-lg'} font-serif leading-tight tracking-[-0.04em]`}>
                      {post.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 border-t border-black/10 bg-white px-4 py-3">
              {heroSlides.slice(0, 4).map((post, index) => (
                <span key={post.id || post.slug || index} className={`h-2.5 rounded-full transition-all duration-500 ${index === 0 ? 'w-8 bg-[var(--slot4-accent)]' : 'w-2.5 bg-black/20'}`} />
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {tiles.map((tile) => (
              <ActionTile key={tile.href} {...tile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const railPosts = safePosts(timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts).slice(0, 10)
  if (!railPosts.length) return null

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-[1520px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div className="slot4-fade-up">
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-white/55">Our story</p>
            <h2 className="mt-4 font-serif text-4xl leading-[0.96] tracking-[-0.05em] sm:text-5xl">
              A useful space for offers, posts, and everyday browsing.
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-8 text-white/78">
              <p>
                The site keeps a strong visual order so people can move from featured posts to related pages without losing track of what they came here to see.
              </p>
              <p>
                Large image panels, direct action buttons, and compact labels help the layout feel practical while still standing apart from a standard template.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryRoute} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-white">
                Browse classifieds <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-white">
                Contact us
              </Link>
            </div>
          </div>

          <div className="slot4-fade-up slot4-delay-1">
            <div className="flex items-end justify-between gap-3">
              <h3 className="text-[11px] font-black uppercase tracking-[0.26em] text-white/55">More to scan</h3>
              <Link href={primaryRoute} className="text-sm font-black uppercase tracking-[0.18em] text-white/70 hover:text-white">
                View all
              </Link>
            </div>
            <div className="mt-4 grid gap-4">
              {railPosts.slice(0, 6).map((post, index) => (
                <RailPostCard key={post.id || post.slug || index} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const featured = safePosts(posts).slice(0, 6)
  if (!featured.length) return null

  return (
    <section className="bg-[var(--slot4-accent)] text-white">
      <div className="mx-auto grid max-w-[1520px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="slot4-fade-up">
          <p className="text-[11px] font-black uppercase tracking-[0.26em] text-white/75">Our mission</p>
          <h2 className="mt-4 font-serif text-4xl leading-[0.96] tracking-[-0.05em] sm:text-5xl">
            Keep the layout direct, confident, and easy to use.
          </h2>
          <p className="mt-6 max-w-2xl text-[15px] leading-8 text-white/85">
            A clear structure makes it simpler for visitors to explore offers, browse classifieds, and move from one page to the next without friction.
          </p>
          <div className="mt-8 rounded-[1.6rem] border border-white/15 bg-black/10 p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-white/65">The promise</p>
            <p className="mt-3 max-w-xl font-serif text-2xl leading-[1.2] tracking-[-0.04em]">
              "A cleaner board, stronger headings, and a rhythm that feels like a real classified site."
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {featured.slice(0, 4).map((post, index) => (
            <HorizontalPostCard key={post.id || post.slug || index} post={post} href={postHref(primaryTask, post, primaryRoute)} label={index % 2 === 0 ? 'Featured' : 'Spotlight'} />
          ))}
          {featured[4] ? <CompactIndexCard post={featured[4]} href={postHref(primaryTask, featured[4], primaryRoute)} index={4} /> : null}
          {featured[5] ? <CompactIndexCard post={featured[5]} href={postHref(primaryTask, featured[5], primaryRoute)} index={5} /> : null}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const featured = safePosts(posts).slice(0, 4)
  const archive = safePosts(timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts).slice(4, 12)

  return (
    <section className="bg-[var(--slot4-gray)]">
      <div className="mx-auto max-w-[1520px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="slot4-fade-up flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[var(--slot4-muted-text)]">Our categories</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.05em]">Trusted lanes and featured areas</h2>
          </div>
          <Link href={primaryRoute} className="hidden text-sm font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)] sm:inline-flex">
            View all
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((post, index) => (
            <div key={post.id || post.slug || index} className="rounded-[1.6rem] border border-black/10 bg-white p-5 shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
              <div className="flex h-36 items-center justify-center overflow-hidden rounded-[1.2rem] bg-black/5">
                <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover" />
              </div>
              <p className="mt-4 text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">0{index + 1}</p>
              <h3 className="mt-2 font-serif text-2xl tracking-[-0.04em]">{post.title}</h3>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[2rem] bg-[var(--slot4-dark-bg)] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-white/55">Latest mix</p>
            <h3 className="mt-4 font-serif text-3xl tracking-[-0.04em]">Fresh posts and useful pages stay easy to skim.</h3>
            <p className="mt-4 text-sm leading-7 text-white/75">
              The section below keeps the browsing cadence moving with compact cards, image-led cards, and clearer details.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {archive.map((post, index) => (
              <ImageFirstCard key={post.id || post.slug || index} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="bg-[var(--slot4-footer-bg)] text-white">
      <div className="mx-auto max-w-[1520px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-white/55">Contact us</p>
            <h2 className="mt-4 font-serif text-4xl leading-[0.96] tracking-[-0.05em] sm:text-5xl">
              Need a post, a promotion, or a general update?
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-8 text-white/72">
              Use the contact page to send a note, then keep browsing through the site sections that matter most.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[var(--slot4-accent)] px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5">
              Send inquiry
            </Link>
            <Link href="/classified" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-white/10">
              Browse classifieds
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
