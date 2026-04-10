import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Over Mij | AffiliateBlog',
  description:
    'Leer meer over de persoon achter AffiliateBlog — tips over cadeaus, tech gadgets en kinderproducten voor Nederlandse en Belgische shoppers.',
}

export default function OverMijPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Over Mij</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Hallo! Fijn dat je even langskomt. Ik ben Ferdi, de blogger achter
            AffiliateBlog. Al jaren ben ik gepassioneerd door het zoeken naar de
            beste producten — niet omdat het makkelijk is, maar juist omdat er
            zoveel keuze is en je het kaf van het koren wil scheiden.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Op dit blog deel ik eerlijke tips en aanbevelingen over{' '}
            <strong className="text-gray-900">cadeaus</strong> voor elk moment
            en elk budget,{' '}
            <strong className="text-gray-900">tech gadgets</strong> die je leven
            echt makkelijker maken, en{' '}
            <strong className="text-gray-900">kinderproducten</strong> waar
            ouders op kunnen vertrouwen. Of je nu op zoek bent naar een
            verjaardagscadeau, een handig apparaatje of speelgoed voor de kleine
            — hier vind je eerlijke informatie zonder gedoe.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Ik neem de tijd om producten te onderzoeken en bespreek alleen
            artikelen die ik zelf de moeite waard vind of waarvan ik op basis
            van grondig onderzoek denk dat ze echt iets toevoegen. Jouw
            vertrouwen is mij meer waard dan een snelle klik.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            Woon je in Nederland of België? Dan is dit blog speciaal voor jou.
            Ik houd rekening met lokale beschikbaarheid, prijzen en winkels
            zodat de aanbevelingen ook echt bruikbaar zijn.
          </p>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <p className="text-gray-600 mb-4">
            Benieuwd naar de nieuwste artikelen?
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#6C63FF' }}
          >
            Bekijk het blog
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  )
}
