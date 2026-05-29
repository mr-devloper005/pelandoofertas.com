import { redirect } from 'next/navigation'

import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { fetchTaskPostBySlug } from '@/lib/task-data'

export const revalidate = 3

export default async function LegacyPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  for (const task of SITE_CONFIG.tasks.filter((item) => item.enabled)) {
    const post = await fetchTaskPostBySlug(task.key as TaskKey, slug)
    if (post) {
      redirect(`${task.route}/${encodeURIComponent(slug)}`)
    }
  }

  redirect(`/classified/${encodeURIComponent(slug)}`)
}
