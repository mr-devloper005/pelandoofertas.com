import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileText, ImageIcon, ListChecks, PenLine } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/create',
    title: pagesContent.create.metadata.title,
    description: pagesContent.create.metadata.description,
  })
}

const taskIcon = [PenLine, ListChecks, ImageIcon, FileText]

export default function CreatePage() {
  const tasks = SITE_CONFIG.tasks.filter((task) => task.enabled)

  return (
    <EditableSiteShell>
      <main className="bg-[var(--editable-page-bg,#f8f4ee)] px-4 py-12 text-[var(--editable-page-text,#1f1713)] sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <div className="grid overflow-hidden rounded-[2.5rem] border border-black/10 bg-white shadow-sm lg:grid-cols-[0.95fr_1.05fr]">
            <div className="p-8 sm:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.26em] text-neutral-500">
                {pagesContent.create.hero.badge}
              </p>
              <h1 className="mt-4 max-w-2xl text-4xl font-black leading-[0.95] tracking-[-0.07em] sm:text-6xl">
                {pagesContent.create.hero.title}
              </h1>
              <p className="mt-6 max-w-xl text-sm font-semibold leading-8 text-neutral-600">
                {pagesContent.create.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-black text-white">
                  Login to create <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-black text-black">
                  Create account
                </Link>
              </div>
            </div>
            <div className="border-t border-black/10 bg-neutral-950 p-6 text-white lg:border-l lg:border-t-0 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {tasks.map((task, index) => {
                  const Icon = taskIcon[index % taskIcon.length]
                  return (
                    <div key={task.key} className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                      <Icon className="h-5 w-5 text-white/70" />
                      <h2 className="mt-4 text-xl font-black tracking-[-0.04em]">{task.label}</h2>
                      <p className="mt-3 text-xs font-semibold leading-6 text-white/55">
                        Create a polished {task.label.toLowerCase()} entry with title, summary, media, and related details.
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <form className="mt-8 grid gap-5 rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-2">
            <label className="grid gap-2 text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
              Title
              <input className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-bold normal-case tracking-normal text-black outline-none" placeholder="Add post title" />
            </label>
            <label className="grid gap-2 text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
              Target URL
              <input className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-bold normal-case tracking-normal text-black outline-none" placeholder="https://example.com" />
            </label>
            <label className="grid gap-2 text-xs font-black uppercase tracking-[0.18em] text-neutral-500 lg:col-span-2">
              Description
              <textarea className="min-h-36 rounded-2xl border border-black/10 px-4 py-3 text-sm font-bold normal-case tracking-normal text-black outline-none" placeholder="Write the post content here..." />
            </label>
            <div className="lg:col-span-2">
              <button type="button" className="rounded-full bg-black px-6 py-3 text-sm font-black text-white">
                Save draft locally
              </button>
              <p className="mt-3 text-xs font-semibold text-neutral-500">
                This editable page is ready for your final create flow styling and field changes.
              </p>
            </div>
          </form>
        </section>
      </main>
    </EditableSiteShell>
  )
}
