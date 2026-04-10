import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact | AffiliateBlog',
  description:
    'Heb je een vraag, tip of wil je samenwerken? Neem contact op met AffiliateBlog.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact</h1>
        <p className="text-gray-700 text-lg mb-10">
          Heb je een vraag, tip of wil je samenwerken? Stuur me een bericht!
        </p>

        <ContactForm />
      </div>
    </main>
  )
}
