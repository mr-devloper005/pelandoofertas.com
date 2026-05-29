'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { globalContent } from '@/editable/content/global.content'
import { editablePalette as pal } from '@/editable/layouts/design-contract'

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Classified', href: '/classified' },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function EditableNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className={`sticky top-0 z-50 ${pal.pageBg} text-[var(--slot4-dark-text)]`}>
      <div className={`slot4-navbar border-b border-white/10 bg-[var(--slot4-header-bg)]`}>
        <div className="mx-auto flex min-h-[88px] w-full max-w-[1520px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.25rem] bg-white shadow-lg shadow-black/25">
              <img src="/logo.png?v=20260529" alt={globalContent.site.name} className="h-14 w-14 object-contain" />
            </span>
            <span className="hidden sm:block">
              <span className="block text-[2rem] font-black tracking-[-0.08em] text-[#ef5246] leading-none">{globalContent.site.name}</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="border-b border-white/5 bg-[var(--slot4-accent)] text-white">
        <div className="mx-auto flex max-w-[1520px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <nav className="flex flex-wrap gap-2">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border px-4 py-2 text-sm font-black uppercase tracking-[0.16em] transition ${
                    active
                      ? 'border-white bg-white text-[var(--slot4-accent)]'
                      : 'border-white/30 bg-white/0 text-white hover:bg-white hover:text-[var(--slot4-accent)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

        </div>

        {open ? (
          <div className="border-t border-white/15 bg-black px-4 py-4 md:hidden">
            <div className="grid gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
