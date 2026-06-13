export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '#' },
    { label: 'Create Neon Sign', href: '#' },
    { label: 'Business Neon Sign', href: '#' },
    { label: 'Business Signage', href: '#' },
    { label: 'Inspire Me', href: '#' },
    { label: 'FAQ', href: '/faq' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
  ]

  return (
    <footer className="font-euclid bg-black text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.25fr_0.8fr_1fr] lg:gap-20 lg:px-10 lg:py-20">
        <div className="max-w-xl">
          <div className="mb-8">
            <p className="text-3xl font-bold leading-none tracking-wide sm:text-4xl">
              All About Neon
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.55em] text-[#00ED64]">
              Custom Signs
            </p>
          </div>

          <p className="max-w-lg text-base font-semibold leading-7 text-white/90">
            Create custom neon signs for your home, business, events, and
            creative projects with bright designs built to stand out.
          </p>
        </div>

        <div>
          <h2 className="mb-7 text-sm font-bold uppercase tracking-[0.18em]">
            Quick Links
          </h2>
          <nav aria-label="Footer navigation">
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-base font-medium text-white underline underline-offset-2 transition hover:text-[#00ED64]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div>
          <h2 className="mb-7 text-sm font-bold uppercase tracking-[0.18em]">
            Contact
          </h2>
          <div className="space-y-4 text-base font-medium leading-7 text-white/90">
            <p>1550 Down River Dr, Woodland, WA 98674</p>
            <a
              href="tel:3602256826"
              className="block text-white underline underline-offset-2 transition hover:text-[#00ED64]"
            >
              (360) 225-6826
            </a>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
                Emergency · After Hours · Anytime
              </p>
              <p>
                Dave Sams{' '}
                <a
                  href="tel:3602817994"
                  className="text-white underline underline-offset-2 transition hover:text-[#00ED64]"
                >
                  (360) 281-7994
                </a>{' '}
                · Call or text
              </p>
            </div>
            <p>Monday to Friday: 8am to 5pm</p>
            <a
              href="tel:3602256826"
              className="inline-flex h-11 items-center justify-center rounded bg-[#BA171A] px-7 text-sm font-bold text-white transition hover:bg-[#d31d21]"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-6 text-sm text-white/75 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>© 2026 All About Neon · All Rights Reserved</p>
          <a href="#" className="underline underline-offset-2 hover:text-white">
            Sitemap
          </a>
          <p>Website by Creative Design</p>
        </div>
      </div>
    </footer>
  )
}
