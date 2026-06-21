import Reveal from '../../../components/layout/Reveal'
import workImage1 from '../../../assets/image/1.jpg'
import workImage2 from '../../../assets/image/2.jpg'
import workImage3 from '../../../assets/image/3.jpg'
import workImage4 from '../../../assets/image/4.jpg'
import workImage5 from '../../../assets/image/5.jpg'

const workCards = [
  {
    title: 'Symbols',
    description: 'Art / Symbols',
    image: workImage1,
    imageAlt: 'Neon sign sample',
  },
  {
    title: 'Food and Beverage',
    description: 'Art / Beverage / Food',
    image: workImage2,
    imageAlt: 'Neon sign sample',
  },
  {
    title: 'Music and Audio',
    description: 'Artist / Audio / Music',
    image: workImage3,
    imageAlt: 'Neon sign sample',
  },
  {
    title: 'Big Brands',
    description: 'Art / Big Brand / Neon',
    image: workImage4,
    imageAlt: 'Neon sign sample',
  },
  {
    title: 'Retail Spaces',
    description: 'Art / Storefront / Neon',
    image: workImage5,
    imageAlt: 'Neon sign sample',
  },
]

export default function LatestWorkSection() {
  return (
    <section className="relative overflow-hidden rounded-t-[30px] border-t border-black/5 bg-[#f7f8fb] py-14 text-black sm:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,237,100,0.08),transparent_30%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#00684A]">
              Latest work
            </p>
            <h2 className="mt-3 text-4xl font-extrabold uppercase leading-none sm:text-5xl lg:text-6xl">
              Recent signs we&apos;re proud of
            </h2>
            <div className="mt-5 h-1.5 w-24 rounded-full bg-[#00ED64]" />
            <p className="mt-4 w-full max-w-3xl text-base font-medium leading-7 text-black/72 sm:text-lg">
              A few recent builds across food, music, retail, and branded
              interiors. Each one balances readability, personality, and the
              glow you actually want in a finished space.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workCards.map((card, index) => (
            <Reveal key={`${card.title}-${index}`} delay={index * 90}>
              <article className="group min-w-0">
                <div className="relative aspect-[1] overflow-hidden rounded-[1.5rem] border border-black/10 bg-white shadow-[0_14px_32px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04] group-hover:brightness-[0.92]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.35))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="flex flex-col items-center pt-5 text-center">
                  <p className="text-sm font-extrabold uppercase tracking-wide text-black">
                    {card.title}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/60">
                    {card.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
