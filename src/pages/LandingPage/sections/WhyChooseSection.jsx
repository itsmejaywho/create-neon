const reasons = [
  {
    number: '01',
    title: 'Decades of Experience',
    copy: 'Founded in 1992, over 30 years servicing signs. Today we are a second-generation family-owned shop, with the third generation on the way.',
  },
  {
    number: '02',
    title: 'Full-Service Shop',
    copy: 'Design, installation, and repair, plus an affordable maintenance program to keep your signs looking brand new.',
  },
  {
    number: '03',
    title: 'Local & Reliable',
    copy: 'Based in Woodland, WA. Serving all of Washington and Oregon, with quick response in the Vancouver, Portland, and Longview area.',
  },
  {
    number: '04',
    title: 'Family-Owned, Personal Service',
    copy: 'We are family-owned, now in the second generation, with the third generation growing into the business. Small shop, real relationships: not a call center.',
  },
  {
    number: '05',
    title: 'Trusted by Brands',
    copy: 'Our dedication to customer service has created a bounty of returning customers and word-of-mouth referrals.',
  },
  {
    number: '06',
    title: 'Expert Technicians',
    copy: 'Our technicians are WA & OR 04 Electrical Journeyman, Certified Welders, CCO Crane Certified, and CDL licensed. UL Listed Fab Shop.',
  },
  {
    number: '07',
    title: 'Quality, Affordable Signs',
    copy: 'Whatever material you need for your signs, we can get it made: quality work at a fair price.',
  },
  {
    number: '08',
    title: 'Quality Results',
    copy: 'Exact-match replacements and professional results: your business front looking as good as new. We back our work with strong labor, LED, and power supply warranties.',
  },
  {
    number: '09',
    title: 'Custom Solutions',
    copy: 'Need a custom look? Bring your logo and we will use it; if you do not have one, we can redraw it for the sign. Our designers work with you from building to vehicles.',
  },
]

export default function WhyChooseSection() {
  return (
    <section className="bg-[#F3FBF7] px-6 py-16 text-[#001E2B] sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] ">
            Why Choose Us
          </p>
          <h2 className="mt-3 text-3xl font-extrabold uppercase leading-tight sm:text-4xl lg:text-5xl">
            Why Choose All About Neon
          </h2>
          <div className="mx-auto mt-5 h-1.5 w-24 rounded-full bg-[#00ED64]" />
        </div>

        <div className="mt-10 grid gap-y-12 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-y-16">
          {reasons.map((reason, index) => (
            <article
              key={reason.number}
              className={[
                'min-w-0 lg:min-h-70 lg:border-l lg:border-[#001E2B]/15 lg:px-8',
                index % 4 === 0 ? 'lg:border-l-0 lg:pl-0' : '',
              ].join(' ')}
            >
              <p className="text-sm font-black text-[#00A35B]">
                {reason.number}
              </p>
              <h3 className="mt-5 max-w-64 text-xl font-extrabold uppercase leading-snug tracking-[0.14em] sm:text-2xl">
                {reason.title}
              </h3>
              <p className="mt-3 max-w-72 text-base font-semibold leading-7 text-[#001E2B]/75">
                {reason.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
