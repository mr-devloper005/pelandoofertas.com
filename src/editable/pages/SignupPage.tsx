import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: 'Local signup page for this public site.' })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-text)] text-[var(--slot4-page-bg)]">
        <section className="mx-auto grid min-h-[calc(100vh-14rem)] max-w-[1520px] items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.18)] sm:p-8">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/60">Site access</p>
            <h1 className="mt-5 font-serif text-5xl leading-[0.94] tracking-[-0.06em] sm:text-6xl">Create your account.</h1>
            <p className="mt-6 max-w-lg text-[15px] leading-8 text-white/70">
              This sign up screen is presentational and stays browser-local for testing.
            </p>
          </div>
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 text-[var(--slot4-page-text)] shadow-[0_16px_48px_rgba(0,0,0,0.08)] sm:p-8">
            <h2 className="text-2xl font-black tracking-[-0.04em]">Sign up</h2>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-[var(--slot4-muted-text)]">
              Already have an account?{' '}
              <Link href="/login" className="font-black text-[var(--slot4-accent)] underline-offset-4 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
