import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Classified desk',
    headline: 'Classified posts arranged with a classic editorial rhythm.',
    description: 'Offers, notices, and practical updates get more breathing room while staying visually tied to the rest of the board.',
    filterLabel: 'Choose category',
    secondaryNote: 'Use a calm pace, with clear headings and enough room for the listing to unfold.',
    chips: ['Offers', 'Longer detail', 'Calm pace'],
  },
  classified: {
    eyebrow: 'Notice board',
    headline: 'Fast-moving offers with a bold, practical presentation.',
    description: 'The classified pages lean into strong cards, quick scanning, and direct action cues.',
    filterLabel: 'Filter category',
    secondaryNote: 'Keep the page energetic and clear so offers feel easy to browse.',
    chips: ['Offers', 'Quick scan', 'Action first'],
  },
  sbm: {
    eyebrow: 'Saved offers',
    headline: 'Saved classifieds laid out like a useful shelf.',
    description: 'This section treats saved pages as grouped classified resources with clear labels and compact cards.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Simple, useful, and easy to return to later.',
    chips: ['Saved', 'Collections', 'Reference'],
  },
  profile: {
    eyebrow: 'Seller profiles',
    headline: 'Profiles with stronger identity cues and trust signals.',
    description: 'Bring names, roles, and supporting details forward so the classified page feels credible and discoverable.',
    filterLabel: 'Filter profile type',
    secondaryNote: 'Identity should be obvious before the grid begins.',
    chips: ['Identity', 'Trust', 'Discovery'],
  },
  pdf: {
    eyebrow: 'Document library',
    headline: 'Classified document pages that read like a clean archive.',
    description: 'Documents, guides, and files are presented with obvious file cues and a more structured rhythm.',
    filterLabel: 'Filter document type',
    secondaryNote: 'A simple archive layout helps documents feel easy to open and revisit.',
    chips: ['Documents', 'Downloads', 'Archive'],
  },
  listing: {
    eyebrow: 'Business board',
    headline: 'Classified listings that are clear, practical, and easy to compare.',
    description: 'Directory pages emphasize location, post details, and other helpful information without clutter.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Useful information should be visible within a couple of scrolls.',
    chips: ['Directory', 'Compare', 'Contact'],
  },
  image: {
    eyebrow: 'Visual board',
    headline: 'Image-led classifieds with a cleaner gallery-first feel.',
    description: 'The image section gives more weight to visuals and creates a stronger sense of browseable panels.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Let the images lead, while captions stay short and helpful.',
    chips: ['Gallery', 'Visual', 'Showcase'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
