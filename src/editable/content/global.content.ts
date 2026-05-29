import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: 'Classifieds, offers, and practical browsing',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Browse the board',
    primaryLinks: [
      { label: 'Home', href: '/' },
      { label: 'Classified', href: '/classified' },
      { label: 'Search', href: '/search' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Post an inquiry', href: '/contact' },
      secondary: { label: 'Browse classified', href: '/classified' },
    },
  },
  footer: {
    tagline: 'Straightforward browsing with a strong visual rhythm',
    description: 'A classified-first layout for offers, requests, services, and practical browsing with a clear, memorable structure.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Classified', href: '/classified' },
          { label: 'Search', href: '/search' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        title: 'Quick links',
        links: [
          { label: 'How it works', href: '/about' },
          { label: 'Saved comments', href: '/comments' },
        ],
      },
    ],
    bottomNote: 'Built for clean discovery and easy browsing.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
