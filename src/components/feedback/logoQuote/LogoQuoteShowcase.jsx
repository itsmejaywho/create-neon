import { quoteBenefits, quoteShowcaseImages } from './data'

export default function LogoQuoteShowcase() {
  return (
    <div className="flex min-h-[42vh] flex-1 items-center bg-[radial-gradient(circle_at_top,#12342c_0%,#03151d_42%,#001018_100%)] p-6 text-white sm:p-8 lg:min-h-full lg:p-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 lg:gap-10">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#71f2a9]">
            Trustpilot
          </p>
          <h2 className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
            <span className="text-white">LED neon signs</span>{' '}
            <span className="text-[#00ED64]">for</span>{' '}
            <span className="text-white">your</span>{' '}
            <span className="text-[#71f2a9]">business</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/84 sm:text-lg">
            Ready-to-ship or fully custom products for storefronts, offices,
            retail, and hospitality spaces.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {quoteBenefits.map(({ title, Icon }) => (
            <div
              key={title}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-sm"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#00ED64] text-[#001018]">
                <Icon size={18} strokeWidth={2} />
              </div>
              <p className="text-sm font-medium text-white">{title}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {quoteShowcaseImages.map((image) => (
            <div
              key={image.alt}
              className="overflow-hidden rounded-2xl border border-white/12 bg-white/10"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-36 w-full object-cover sm:h-44 lg:h-52"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
