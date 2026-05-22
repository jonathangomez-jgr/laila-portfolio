import { notFound } from 'next/navigation'
import { hasLocale, locales, getDictionary } from '@/lib/i18n'
import SiteChrome from '@/components/SiteChrome'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  return (
    <SiteChrome dict={dict} lang={lang}>
      {children}
    </SiteChrome>
  )
}
