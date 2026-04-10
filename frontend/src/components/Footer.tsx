import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Over Mij', href: '/over-mij' },
  { label: 'Contact', href: '/contact' },
];

const legalLinks = [
  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
  { label: 'Privacy', href: '/privacy' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-3">
              Over AffiliateBlog
            </h3>
            <p className="text-sm leading-relaxed">
              De beste producttips en eerlijke reviews voor jouw budget.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-3">
              Navigatie
            </h3>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-3">
              Juridisch
            </h3>
            <ul className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col gap-2 text-xs text-gray-500 text-center">
          <p>Dit blog bevat affiliate links.</p>
          <p>© 2025 AffiliateBlog. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
