import workImage1 from '../../../assets/image/1.jpg'
import workImage2 from '../../../assets/image/2.jpg'
import workImage3 from '../../../assets/image/3.jpg'
import workImage4 from '../../../assets/image/4.jpg'
import workImage5 from '../../../assets/image/5.jpg'

const workCards = [
  {
    title: 'Symbols',
    description: 'Art / Sysmbols',
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
    title: 'Big Brands',
    description: 'Art / Big Brand / Neon',
    image: workImage5,
    imageAlt: 'Neon sign sample',
  },
]

export default function LatestWorkSection() {
  return (
    <section className="relative overflow-hidden py-12 text-white border-t-[white] rounded-t-[30px]">
      <div className="absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full text-black">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-5xl font-extrabold uppercase leading-none text-black sm:text-6xl lg:text-7xl">
            Latest Work
          </h2>
          <div className="mt-6 h-1.5 w-20 bg-black sm:w-24" />
          <p className="mt-3 w-full max-w-3xl rounded-sm  px-4 py-2 text-xl font-semibold ">
            We have a large track record with creating custom neon signs in Los Angeles.
          </p>
        </div>

        <div className="mx-auto mt-10 grid w-full  sm:w-[90vw] sm:grid-cols-2 lg:grid-cols-3">
          {workCards.map((card, index) => (
            <article key={`${card.title}-${index}`} className="group min-w-0">
              <div className="group relative mx-auto aspect-[1] h-[calc(80%-20px)] overflow-hidden border border-white/15 bg-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.22)]">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="h-full w-full object-cover transition duration-200 group-hover:brightness-75"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </div>
              <div className="flex flex-col items-center pt-6 text-center">
                <p className="text-sm font-extrabold uppercase tracking-wide text-black">
                  {card.title}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-black/70">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
