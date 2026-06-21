import Reveal from '../../../components/layout/Reveal'

const reasons = [
  {
    number: '01',
    title: 'Decades of Experience',
    copy: 'Founded in 1992, with more than 30 years servicing signs and a second-generation family team behind it.',
  },
  {
    number: '02',
    title: 'Full-Service Shop',
    copy: 'Design, installation, and repair, plus maintenance support to keep your signs looking new.',
  },
  {
    number: '03',
    title: 'Local & Reliable',
    copy: 'Based in Woodland, WA and serving Washington and Oregon with quick regional response.',
  },
  {
    number: '04',
    title: 'Family-Owned, Personal Service',
    copy: 'Real relationships, hands-on support, and a team that knows the work from start to finish.',
  },
  {
    number: '05',
    title: 'Trusted by Brands',
    copy: 'Our customer service keeps people coming back and recommending us to others.',
  },
  {
    number: '06',
    title: 'Expert Technicians',
    copy: 'Licensed, certified, and experienced with the technical side of sign work and fabrication.',
  },
  {
    number: '07',
    title: 'Quality, Affordable Signs',
    copy: 'Whatever material you need, we can get it made at a fair price without cutting corners.',
  },
  {
    number: '08',
    title: 'Quality Results',
    copy: 'Exact-match replacements and professional results backed by strong labor and component warranties.',
  },
  {
    number: '09',
    title: 'Custom Solutions',
    copy: 'Bring a logo or a rough idea. We can adapt it, redraw it, and make it work for your sign.',
  },
]

export default function WhyChooseSection() {
  return (
    <section className="bg-[#F3FBF7] px-6 py-16 text-[#001E2B] sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#00684A]">
              Why choose us
            </p>
            <h2 className="mt-3 text-3xl font-extrabold uppercase leading-tight sm:text-4xl lg:text-5xl">
              Why choose All About Neon
            </h2>
            <div className="mx-auto mt-5 h-1.5 w-24 rounded-full bg-[#00ED64]" />
          </div>
        </Reveal>

        <div className="mt-10 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:mt-12 lg:gap-8 xl:grid-cols-3">
          {reasons.map((reason, index) => (
            <Reveal key={reason.number} delay={index * 70} className="h-full">
              <article
                className={[
                  'flex h-full min-h-[16rem] min-w-0 flex-col rounded-[1.25rem] border border-transparent bg-white/40 p-6 shadow-[0_10px_24px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-black/8 hover:bg-white/60',
                ].join(' ')}
              >
                <p className="text-sm font-black text-[#00A35B]">
                  {reason.number}
                </p>
                <h3 className="mt-5 max-w-64 text-xl font-extrabold uppercase leading-snug tracking-[0.12em] sm:text-2xl">
                  {reason.title}
                </h3>
                <p className="mt-3 max-w-72 text-base font-semibold leading-7 text-[#001E2B]/75">
                  {reason.copy}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
