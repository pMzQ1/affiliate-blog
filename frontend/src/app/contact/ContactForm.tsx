'use client'

import { useState, FormEvent } from 'react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 px-6 py-5 text-green-800">
        <p className="font-medium">
          Bedankt voor je bericht! Ik neem zo snel mogelijk contact op.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Naam */}
      <div>
        <label
          htmlFor="naam"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Naam <span className="text-red-500">*</span>
        </label>
        <input
          id="naam"
          name="naam"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm focus:border-[#6C63FF] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/30 transition"
          placeholder="Jouw naam"
        />
      </div>

      {/* E-mailadres */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          E-mailadres <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm focus:border-[#6C63FF] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/30 transition"
          placeholder="jouw@email.nl"
        />
      </div>

      {/* Bericht */}
      <div>
        <label
          htmlFor="bericht"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Bericht <span className="text-red-500">*</span>
        </label>
        <textarea
          id="bericht"
          name="bericht"
          rows={6}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm focus:border-[#6C63FF] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/30 transition resize-y"
          placeholder="Schrijf hier je bericht..."
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <p className="text-red-600 text-sm">
          Er is iets misgegaan. Probeer het later opnieuw.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#6C63FF' }}
      >
        {status === 'submitting' ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Verzenden...
          </>
        ) : (
          'Verstuur bericht'
        )}
      </button>
    </form>
  )
}
