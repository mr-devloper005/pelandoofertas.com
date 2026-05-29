import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f4f1ec',
  '--slot4-page-text': '#101010',
  '--slot4-panel-bg': '#efe8df',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#4d463f',
  '--slot4-soft-muted-text': '#685f55',
  '--slot4-accent': '#ef5246',
  '--slot4-accent-fill': '#ef5246',
  '--slot4-accent-soft': '#ffd5ce',
  '--slot4-dark-bg': '#090909',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#dbd4cb',
  '--slot4-cream': '#f6efe7',
  '--slot4-warm': '#fbf7f2',
  '--slot4-lavender': '#d8e4ff',
  '--slot4-gray': '#e9e9e9',
  '--slot4-header-bg': '#090909',
  '--slot4-footer-bg': '#0f2136',
  '--slot4-body-gradient': 'linear-gradient(180deg, #f9f6f1 0%, #f4f1ec 38%, #ebebeb 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-black/[0.1]',
  darkBorder: 'border-white/12',
  shadow: 'shadow-[0_16px_48px_rgba(0,0,0,0.1)]',
  shadowStrong: 'shadow-[0_24px_80px_rgba(0,0,0,0.18)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.72))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center',
    rail: 'flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[160px] shrink-0 snap-start sm:w-[180px]',
    mosaicGrid: 'grid gap-4 md:grid-cols-2 xl:grid-cols-4',
  },
  type: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.28em]',
    heroTitle: 'font-serif text-5xl leading-[0.92] tracking-[-0.05em] sm:text-6xl lg:text-7xl',
    sectionTitle: 'font-serif text-3xl leading-[0.96] tracking-[-0.04em] sm:text-4xl',
    body: 'text-[15px] leading-8',
  },
  surface: {
    card: `rounded-[1.8rem] border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[1.8rem] border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-[1.8rem] ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-full ${editablePalette.accentBg} px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-0.5 hover:brightness-95`,
    secondary: `inline-flex items-center justify-center rounded-full border ${editablePalette.border} ${editablePalette.surfaceBg} px-6 py-3 text-sm font-black uppercase tracking-[0.18em] ${editablePalette.surfaceText} transition duration-300 hover:-translate-y-0.5 hover:bg-black/[0.03]`,
    accent: `inline-flex items-center justify-center rounded-full ${editablePalette.darkBg} px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-0.5 hover:opacity-90`,
  },
  media: {
    frame: `relative overflow-hidden rounded-[1.35rem] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(0,0,0,0.16)]',
    fade: 'transition duration-300 ease-out hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; the shared shell and page sections consume those variables.',
  'Keep homepage structure inside src/editable/sections/HomeSections.tsx so the full landing page can be redesigned in one place.',
  'Use broad grids and large hero bands; the screenshot reference depends on strong horizontal structure.',
  'Create card variety across featured, compact, horizontal, list, and image-first components.',
  'Keep fetched posts intact and always use postHref() for task-specific links.',
] as const
