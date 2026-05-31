import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Classified offers and practical browsing',
      description: 'Browse a bold homepage with featured classified posts, quick filters, and clear discovery blocks.',
      openGraphTitle: 'Classified offers and practical browsing',
      openGraphDescription: 'A striking homepage built for browsing classified posts and related pages.',
      keywords: ['classifieds', 'offers', 'services', 'public board'],
    },
    hero: {
      badge: 'Featured board',
      title: ['A bold home for', 'classified offers and discovery.'],
      description: 'A strong visual system, compact headlines, and clear browse paths help the board feel immediate and memorable.',
      primaryCta: { label: 'Browse classifieds', href: '/classified' },
      secondaryCta: { label: 'Search board', href: '/search' },
      searchPlaceholder: 'Search posts, categories, and offers',
      focusLabel: 'Focus',
      featureCardBadge: 'Fresh picks',
      featureCardTitle: 'The homepage rotates through the latest classified posts and featured cards.',
      featureCardDescription: 'Each section keeps the browsing rhythm fast, visual, and easy to scan on mobile.',
    },
    intro: {
      badge: 'How it works',
      title: 'Designed for quick browsing, strong hierarchy, and practical discovery.',
      paragraphs: [
        'The homepage leads with large visual panels, a clear navigation rhythm, and a mix of post styles that keep browsing engaging.',
        'Visitors can move from featured content into classifieds, category filters, and supporting details without losing orientation.',
        'The layout stays readable across devices while still feeling distinctive and intentionally designed.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Large hero bands and strong color contrast.',
        'Multiple card styles for different classified types.',
        'A focused footer and compact mobile navigation.',
        'Clear route blocks for browsing and contact.',
      ],
      primaryLink: { label: 'How it works', href: '/about' },
      secondaryLink: { label: 'Contact us', href: '/contact' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Browse the board, check the latest posts, and keep moving.',
      description: 'Use the site to scan offers, filter categories, and jump into content quickly from a memorable landing page.',
      primaryCta: { label: 'Open classified', href: '/classified' },
      secondaryCta: { label: 'Open contact', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest entries from this section.',
    },
  },
  about: {
    badge: 'How it works',
    title: 'A direct, visual, and practical classifieds experience.',
    description: `${slot4BrandConfig.siteName} presents classified posts with a strong header, clear card structure, and a layout that keeps useful pages easy to reach.`,
    paragraphs: [
      'The design centers on discovery first, with content grouped into panels, rails, and strong section breaks.',
      'It keeps the experience simple enough for quick scanning while still giving the board a memorable identity.',
    ],
    values: [
      {
        title: 'Clear structure',
        description: 'Strong headings, bold colors, and tightly controlled spacing keep the pages easy to scan.',
      },
      {
        title: 'Flexible browsing',
        description: 'The layout supports homepage discovery, classified archives, and detail pages without changing the core routes.',
      },
      {
        title: 'Mobile friendly',
        description: 'Sections collapse cleanly on smaller screens so the layout stays polished and usable.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Reach out with a request, a post, or a new idea.',
    description: 'Use the form below to send a note about posting, promotion, or any classified inquiry.',
    formTitle: 'Send a request',
  },
  detailPages: {
    article: {
      relatedTitle: 'Related classifieds',
      fallbackTitle: 'Classified details',
    },
    listing: {
      relatedTitle: 'Related classifieds',
      fallbackTitle: 'Classified details',
    },
    image: {
      relatedTitle: 'Related classifieds',
      fallbackTitle: 'Classified details',
    },
    profile: {
      relatedTitle: 'Related classifieds',
      fallbackDescription: 'Classified details will appear here once available.',
      visitButton: 'Open related post',
    },
  },
} as const
