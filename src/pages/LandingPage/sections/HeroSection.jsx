import { useState } from 'react'
import { Star } from 'lucide-react'
import heroBackground from '../../../assets/image/hero-background.jpg'
import CreateNeonModal from '../../../components/feedback/CreateNeonModal'
import LogoDesignQuote from '../../../components/feedback/LogoDesignQuote'
import NeonDesigner from '../../../components/feedback/NeonDesigner'
import { ROUTES } from '../../../constants/routes'

export default function HeroSection({ currentPath, navigate }) {
  const [createNeonOpen, setCreateNeonOpen] = useState(false)
  const designerOpen = currentPath === ROUTES.textDesigner
  const logoQuoteOpen = currentPath === ROUTES.logoDesign

  function handleSelectNeonType(optionId) {
    setCreateNeonOpen(false)
    if (optionId === 'text') {
      navigate(ROUTES.textDesigner)
      return
    }

    if (optionId === 'logo') {
      navigate(ROUTES.logoDesign)
    }
  }

  return (
    <section
      className="flex min-h-[90vh] w-full items-center bg-cover bg-center px-4 py-10 sm:px-6 lg:px-10"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="mx-auto flex w-full max-w-6xl ml-5 flex-col items-start gap-6 pt-6 sm:pt-10 lg:pl-24">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#00ED64] px-4 py-2 text-xs font-bold uppercase tracking-wide text-black">
          <span>People love us</span>
          <span className="h-4 w-px bg-white/40" aria-hidden="true" />
          <span className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full">
              <Star
                aria-hidden="true"
                className="h-5 w-5 fill-current stroke-[1.8]"
              />
            </span>
            Trustpilot
          </span>
        </div>

        <div className="max-w-3xl">
          <h1 className="text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl md:text-5xl">
            Lighten up your world
            <br />
            with our custom LED
            <br />
            neon & illuminated
            <br />
            business signs
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white sm:text-base">
            From custom LED neon wall art to professional illuminated business signs,
            we help your brand stand out, increase visibility, and leave a lasting
            impression.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="#premium-signs"
            className="rounded-full bg-[#4b2cff] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white"
          >
            Premium Illuminated Signs
          </a>
          <button
            type="button"
            onClick={() => setCreateNeonOpen(true)}
            className="cursor-pointer rounded-full bg-[#ff2aa1] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            Create Your Neon
          </button>
        </div>
      </div>

      <CreateNeonModal
        open={createNeonOpen}
        onClose={() => setCreateNeonOpen(false)}
        onSelect={handleSelectNeonType}
      />
      <NeonDesigner
        open={designerOpen}
        onClose={() => navigate(ROUTES.home)}
      />
      <LogoDesignQuote
        open={logoQuoteOpen}
        onClose={() => navigate(ROUTES.home)}
        onOpenTextDesigner={() => {
          navigate(ROUTES.textDesigner)
        }}
      />
    </section>
  )
}
