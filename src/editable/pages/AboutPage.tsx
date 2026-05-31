import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid max-w-[1520px] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:px-8 lg:py-14">
          <article className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-[-0.06em] sm:text-6xl">How {SITE_CONFIG.name} works</h1>
            <p className="mt-5 max-w-3xl text-[15px] leading-8 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-4">
              {pagesContent.about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-8 text-[var(--slot4-page-text)]/85">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <aside className="space-y-4">
            <div className="rounded-[2rem] bg-[var(--slot4-dark-bg)] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
              <p className="text-[11px] font-black uppercase tracking-[0.26em] text-white/60">Snapshot</p>
              <h2 className="mt-4 font-serif text-3xl tracking-[-0.04em]">Built for scanning, browsing, and quick action.</h2>
            </div>
            {pagesContent.about.values.map((value, index) => (
              <div key={value.title} className="rounded-[1.8rem] border border-black/10 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">0{index + 1}</p>
                <h2 className="mt-3 font-serif text-2xl tracking-[-0.04em]">{value.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
            </div>
          ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
