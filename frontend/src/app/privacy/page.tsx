import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacybeleid | AffiliateBlog',
  description:
    'Lees hoe AffiliateBlog omgaat met jouw persoonsgegevens — GDPR-conform privacybeleid.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Privacybeleid
        </h1>
        <p className="text-gray-500 mb-10">Laatste update: april 2025</p>

        <div className="space-y-10 text-gray-700 text-base leading-relaxed">

          {/* Wie zijn wij */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Wie zijn wij?
            </h2>
            <p>
              AffiliateBlog is een persoonlijk blog over cadeaus, tech gadgets
              en kinderproducten, gericht op Nederlandse en Belgische lezers.
              Voor vragen over dit privacybeleid of je persoonsgegevens kun je
              contact opnemen via de{' '}
              <Link
                href="/contact"
                className="font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
                style={{ color: '#6C63FF' }}
              >
                contactpagina
              </Link>
              .
            </p>
          </section>

          {/* Welke gegevens */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Welke gegevens verzamelen we?
            </h2>
            <p>
              Wij verzamelen alleen persoonsgegevens wanneer jij actief contact
              met ons opneemt via het contactformulier. In dat geval verwerken
              we de volgende gegevens:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
              <li>Naam</li>
              <li>E-mailadres</li>
              <li>De inhoud van je bericht</li>
            </ul>
            <p className="mt-3">
              Er worden geen gegevens verzameld van bezoekers die alleen de
              website bekijken zonder een formulier in te vullen.
            </p>
          </section>

          {/* Waarvoor */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Waarvoor gebruiken we je gegevens?
            </h2>
            <p>
              De gegevens die je via het contactformulier instuurt, gebruiken we
              uitsluitend om op jouw bericht te reageren. We gebruiken je
              gegevens niet voor marketingdoeleinden, we delen ze niet met
              derden en we verkopen ze nooit.
            </p>
          </section>

          {/* Bewaartermijn */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Hoe lang bewaren we je gegevens?
            </h2>
            <p>
              We bewaren je contactgegevens maximaal{' '}
              <strong className="text-gray-900">1 jaar</strong> na het laatste
              contact. Daarna worden ze verwijderd. Wil je dat je gegevens
              eerder worden verwijderd? Neem dan contact met ons op.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibond text-gray-900 mb-3">
              Cookies en tracking
            </h2>
            <p>
              AffiliateBlog maakt <strong className="text-gray-900">geen gebruik</strong>{' '}
              van tracking cookies of analytics-software (zoals Google
              Analytics). Er wordt geen profielbeschrijving van bezoekers
              opgesteld en je surfgedrag wordt niet gevolgd. Een cookiebanner is
              daarom niet van toepassing op deze website.
            </p>
            <p className="mt-3">
              Sommige externe partijen (zoals Bol.com of Amazon) waarnaar we
              linken, kunnen wel cookies plaatsen wanneer je hun websites
              bezoekt. Dat valt buiten onze invloedssfeer en wordt geregeld door
              hun eigen privacybeleid.
            </p>
          </section>

          {/* Jouw rechten */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Jouw rechten
            </h2>
            <p>
              Onder de AVG (Algemene Verordening Gegevensbescherming) heb je de
              volgende rechten:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
              <li>
                <strong className="text-gray-900">Inzage</strong> — je kunt
                opvragen welke gegevens we van je hebben
              </li>
              <li>
                <strong className="text-gray-900">Correctie</strong> — je kunt
                onjuiste gegevens laten aanpassen
              </li>
              <li>
                <strong className="text-gray-900">Verwijdering</strong> — je
                kunt vragen om je gegevens te wissen
              </li>
              <li>
                <strong className="text-gray-900">Bezwaar</strong> — je kunt
                bezwaar maken tegen de verwerking van je gegevens
              </li>
            </ul>
            <p className="mt-3">
              Om gebruik te maken van deze rechten, neem je contact op via de{' '}
              <Link
                href="/contact"
                className="font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
                style={{ color: '#6C63FF' }}
              >
                contactpagina
              </Link>
              . We reageren binnen 30 dagen op je verzoek.
            </p>
          </section>

          {/* Wijzigingen */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Wijzigingen in dit beleid
            </h2>
            <p>
              We kunnen dit privacybeleid van tijd tot tijd aanpassen, bijvoorbeeld
              als de website verandert of als wetgeving dat vereist. We raden je
              aan om deze pagina regelmatig te bekijken. De datum bovenaan de
              pagina geeft aan wanneer het beleid voor het laatst is bijgewerkt.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
