import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: 'Local login page for this public site.' })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-14rem)] max-w-[1520px] items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.88fr] lg:px-8">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Member access</p>
            <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[0.94] tracking-[-0.06em] sm:text-6xl">Welcome back to the board.</h1>
            <p className="mt-6 max-w-lg text-[15px] leading-8 text-[var(--slot4-muted-text)]">
              This login works locally using browser storage, so testers can create an account and sign in without backend auth.
            </p>
          </div>
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.08)] sm:p-8">
            <h2 className="text-2xl font-black tracking-[-0.04em]">Login</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-[var(--slot4-muted-text)]">
              New here?{' '}
              <Link href="/signup" className="font-black text-[var(--slot4-accent)] underline-offset-4 hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
