import customImage from '../../../assets/image/custom.webp'
import personalImage from '../../../assets/image/personal.webp'
import ownImage from '../../../assets/image/own.webp'

const optionCards = [
  {
    id: 'create-neon',
    title: 'I want to design my own sign',
    description:
      'Use our online design tool to create your own text neon sign in less than 5 minutes.',
    image: personalImage,
    imageAlt: 'Custom neon sign design tool preview',
  },
  {
    title: 'I have an image or logo',
    description:
      'Upload your image or logo and turn it into a custom neon sign design with a couple of quick clicks.',
    image: customImage,
    imageAlt: 'Logo converted into a custom neon sign',
  },
  {
    title: 'Personalize a lightbox sign',
    description:
      'Illuminate your space with personalized signage that leaves a lasting impression.',
    image: ownImage,
    imageAlt: 'Personalized illuminated lightbox sign',
  },
]

function OptionCard({ id, title, description, image, imageAlt }) {
  return (
    <div
      id={id}
      className="flex min-h-125 scroll-mt-24 flex-col gap-4 rounded-2xl border border-black/15 p-4"
    >
      <div className="h-32 shrink-0">
        <h3 className="min-h-14 text-2xl font-bold uppercase leading-snug text-[#001E2B]">
          {title}
        </h3>
        <p className="mt-2 min-h-16 leading-relaxed text-[#001E2B]/70">
          {description}
        </p>
      </div>
      <div className="group h-84 w-full shrink-0 overflow-hidden rounded-2xl border border-black/10">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
        />
      </div>
    </div>
  )
}

export default function OverviewSection() {
  return (
    <section
      id="premium-signs"
      className="relative z-10 -mt-8 min-h-[80vh] w-full scroll-mt-24 rounded-t-3xl bg-white px-4 py-10 shadow-[0_-6px_20px_rgba(0,0,0,0.15)] sm:px-6 lg:px-10"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <h2 className="text-xl font-extrabold uppercase text-[#00684A] sm:text-2xl">
            Create Neon USA is the world's most cost-effective source of LED
            neon signs & illuminated signage
          </h2>
          <div className="mt-4 h-0.5 w-full bg-black/10" aria-hidden="true" />
        </div>
        <p className="text-sm leading-relaxed text-[#222222] sm:text-base">
          Light up your world with high-quality Create Neon signs for
          businesses, storefronts, offices, as well as home, bar events,
          weddings, birthdays, or any other occasion. We can help you add glow
          to your business logo, slogan, family name, or even your favorite
          video game icon.
        </p>
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {optionCards.map((card) => (
          <OptionCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  )
}
