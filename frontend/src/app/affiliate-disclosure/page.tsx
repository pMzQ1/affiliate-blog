import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | AffiliateBlog',
  description:
    'Transparantie over affiliate links op AffiliateBlog — hoe het werkt en wat het voor jou betekent.',
}

export default function AffiliateDisclosurePage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Affiliate Disclosure
        </h1>

        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <p>
            Dit blog bevat affiliate links. Dit betekent dat als je via een link
            op deze website een aankoop doet, ik een kleine commissie ontvang
            van de betreffende winkel of het platform — zonder extra kosten voor
            jou. De prijs die jij betaalt is exact hetzelfde als wanneer je
            rechtstreeks naar de winkel gaat.
          </p>

          <p>
            Ik werk samen met affiliate programma&apos;s zoals{' '}
            <strong className="text-gray-900">Bol.com Partnerprogramma</strong>,{' '}
            <strong className="text-gray-900">Amazon Associates</strong> en{' '}
            <strong className="text-gray-900">Awin</strong>.
          </p>

          <p>
            De commissies die ik ontvang helpen mij om deze website te
            onderhouden en nieuwe content te maken. Mijn onafhankelijkheid staat
            voorop: ik raad alleen producten aan die ik zelf de moeite waard
            vind of waarvan ik op basis van onderzoek denk dat ze waardevol zijn
            voor mijn lezers. Affiliate relaties hebben geen invloed op mijn
            beoordelingen of aanbevelingen.
          </p>

          <p>
            Als je vragen hebt over deze disclosure, kun je contact met me
            opnemen via de{' '}
            <Link
              href="/contact"
              className="font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
              style={{ color: '#6C63FF' }}
            >
              contactpagina
            </Link>
            .
          </p>

          <p className="text-gray-500 text-base">
            Laatste update: april 2025
          </p>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-80"
            style={{ color: '#6C63FF' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Terug naar home
          </Link>
        </div>
      </div>
    </main>
  )
}
