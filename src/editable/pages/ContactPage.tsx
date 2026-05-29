'use client'

import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return { soft: 'border border-black/10 bg-white', muted: 'text-[var(--slot4-muted-text)]' }
  }
  if (kind === 'editorial') {
    return { soft: 'border border-black/10 bg-white', muted: 'text-[var(--slot4-muted-text)]' }
  }
  if (kind === 'visual') {
    return { soft: 'border border-white/10 bg-white/5 text-white', muted: 'text-white/75' }
  }
  return { soft: 'border border-black/10 bg-white', muted: 'text-[var(--slot4-muted-text)]' }
}

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)

  const lanes =
      productKind === 'directory'
      ? [
          { icon: Building2, title: 'Classified help', body: 'Talk through posts, updates, and practical publishing questions.' },
          { icon: Phone, title: 'Promotions', body: 'Ask about bulk submissions, campaign pages, or featured placements.' },
          { icon: MapPin, title: 'Coverage', body: 'Need a new category lane? We can shape it around that.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Submissions', body: 'Send posts, updates, and pages that fit the board.' },
            { icon: Mail, title: 'Publishing notes', body: 'Coordinate formatting, publishing workflow, or content placement.' },
            { icon: Sparkles, title: 'Support', body: 'Need help with page structure or classified placement?' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Visual requests', body: 'Discuss image-led posts, features, and display options.' },
              { icon: Sparkles, title: 'Media support', body: 'Ask about asset placement or visual presentation.' },
              { icon: Mail, title: 'General contact', body: 'Send a message for posting or partnership questions.' },
            ]
          : [
              { icon: Bookmark, title: 'Resources', body: 'Suggest useful posts, offers, or reference material.' },
              { icon: Mail, title: 'Partnerships', body: 'Coordinate curation projects and connected page work.' },
              { icon: Sparkles, title: 'Help desk', body: 'Need support with the browsing flow or content placement?' },
            ]

  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid max-w-[1520px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-14">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-[-0.06em] sm:text-6xl">{pagesContent.contact.title}</h1>
            <p className={`mt-5 max-w-2xl text-[15px] leading-8 ${tone.muted}`}>{pagesContent.contact.description}</p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane, index) => (
                <div key={lane.title} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                  <lane.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <p className="mt-3 text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">0{index + 1}</p>
                  <h2 className="mt-2 font-serif text-2xl tracking-[-0.04em]">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.08)] sm:p-8">
            <h2 className="text-2xl font-black tracking-[-0.04em]">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
