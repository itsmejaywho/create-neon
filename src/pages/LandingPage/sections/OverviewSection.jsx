import {
  BadgeDollarSign,
  RadioReceiver,
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
} from 'lucide-react'
import Reveal from '../../../components/layout/Reveal'
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

const benefits = [
  {
    title: 'Free & fast shipping',
    description:
      'Free shipping available. Need it faster? Choose express shipping for prompt delivery.',
    Icon: Truck,
    iconBackground: 'bg-pink-200',
  },
  {
    title: '2-year guarantee',
    description:
      'If there is a problem with the product, we will make it right and replace it when needed.',
    Icon: ShieldCheck,
    iconBackground: 'bg-green-200',
  },
  {
    title: 'Affordable prices',
    description:
      'We keep pricing competitive and can review a comparable quote if you already have one.',
    Icon: BadgeDollarSign,
    iconBackground: 'bg-yellow-200',
  },
  {
    title: 'High efficiency',
    description:
      'Create Neon signs are handmade from durable PVC flex that is lighter and stronger than glass tubes.',
    Icon: Zap,
    iconBackground: 'bg-red-100',
  },
  {
    title: 'Free dimmer and remote',
    description:
      'Your order includes a dimmer, remote controller, installation kit, and installation guide.',
    Icon: RadioReceiver,
    iconBackground: 'bg-sky-200',
  },
  {
    title: 'Easy installation',
    description:
      'Getting your neon sign installed is simple with our installation kit and guide.',
    Icon: Wrench,
    iconBackground: 'bg-purple-200',
  },
]

function OptionCard({ id, title, description, image, imageAlt }) {
  return (
    <div
      id={id}
      className="group flex min-h-125 scroll-mt-24 flex-col gap-4 rounded-[1.5rem] border border-black/12 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(0,0,0,0.08)]"
    >
      <div className="h-32 shrink-0">
        <h3 className="min-h-14 text-2xl font-bold uppercase leading-snug text-[#001E2B]">
          {title}
        </h3>
        <p className="mt-2 min-h-16 leading-relaxed text-[#001E2B]/70">
          {description}
        </p>
      </div>
      <div className="h-84 w-full shrink-0 overflow-hidden rounded-2xl border border-black/10">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
      </div>
    </div>
  )
}

function BenefitsLayout() {
  return (
    <section className="-mx-4 mt-15 px-4 py-14 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-black/8 bg-[#f5f7f6] px-6 py-12 shadow-[0_18px_48px_rgba(0,0,0,0.05)] sm:px-10 lg:px-16 lg:py-16">
        <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ title, description, Icon, iconBackground }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full ${iconBackground} shadow-[0_10px_24px_rgba(0,0,0,0.08)]`}
              >
                <Icon
                  aria-hidden="true"
                  className="h-9 w-9 stroke-[1.8] text-[#001E2B]"
                />
              </div>
              <h3 className="mt-8 text-lg font-extrabold uppercase leading-tight text-black">
                {title}
              </h3>
              <p className="mt-4 max-w-72 leading-relaxed text-[#001E2B]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function OverviewSection() {
  return (
    <section
      id="premium-signs"
      className="relative z-10 -mt-8 min-h-[80vh] w-full scroll-mt-24 rounded-t-[2rem] bg-white px-4 py-10 shadow-[0_-10px_30px_rgba(0,0,0,0.12)] sm:px-6 lg:px-10"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#00684A]">
              Design your glow
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-extrabold uppercase leading-tight text-[#001E2B] sm:text-4xl">
              Custom neon signs built for brands, spaces, and moments
            </h2>
            <div className="mt-4 h-0.5 w-24 bg-[#00ED64]" aria-hidden="true" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-sm leading-relaxed text-[#222222] sm:text-base">
            From storefront logos to wedding backdrops and home decor, we shape
            bright signage that feels personal, premium, and easy to order.
            Bring a sketch, a logo, or a rough idea and we&apos;ll help turn it
            into a sign that actually looks finished.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {optionCards.map((card, index) => (
          <Reveal key={card.title} delay={index * 100}>
            <OptionCard {...card} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={160}>
        <BenefitsLayout />
      </Reveal>
    </section>
  )
}
