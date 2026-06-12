import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { globalContent } from '@/editable/content/global.content'

export function EditableFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="slot4-footer border-t border-white/10 bg-[var(--slot4-footer-bg)] text-white">
      <div className="mx-auto grid max-w-[1520px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-16">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-white">
              <img src="/logo.png?v=20260529" alt={globalContent.site.name} className="h-12 w-12 object-contain" />
            </span>
            <span>
              <span className="block text-2xl font-black tracking-[-0.08em] text-[#ef5246]">{globalContent.site.name}</span>
              <span className="block text-[11px] font-black uppercase tracking-[0.26em] text-white/60">{globalContent.footer.tagline}</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/72">{globalContent.footer.description}</p>
        </div>

        <div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.26em] text-white/55">Browse</h3>
          <div className="mt-4 grid gap-3">
            {globalContent.footer.columns[0].links.map((item) => (
              <Link key={item.href} href={item.href} className="group inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-white/10">
                <span>{item.label}</span>
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </div>

      </div>
      <div className="border-t border-white/10 bg-black/15">
        <div className="mx-auto flex max-w-[1520px] flex-col gap-3 px-4 py-4 text-xs font-black uppercase tracking-[0.22em] text-white/60 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Copyright © {year}</p>
          <p>{globalContent.site.name}</p>
        </div>
      </div>
    </footer>
  )
}
