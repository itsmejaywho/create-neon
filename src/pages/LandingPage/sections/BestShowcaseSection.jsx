import { useEffect, useRef, useState } from 'react'
import Reveal from '../../../components/layout/Reveal'
import showcaseImage1 from '../../../assets/image/best1.jpg'
import showcaseImage2 from '../../../assets/image/best2.jpg'
import showcaseImage3 from '../../../assets/image/best3.jpg'
import showcaseImage4 from '../../../assets/image/best4.jpg'
import showcaseImage5 from '../../../assets/image/best5.jpg'

const showcaseSlots = Array.from({ length: 5 }, (_, index) => index)
const showcaseImages = [
  showcaseImage1,
  showcaseImage2,
  showcaseImage3,
  showcaseImage4,
  showcaseImage5,
]

export default function BestShowcaseSection() {
  const sectionRef = useRef(null)
  const [photoProgress, setPhotoProgress] = useState(0)

  useEffect(() => {
    function updatePhotoProgress() {
      if (!sectionRef.current) return

      const sectionTop = sectionRef.current.offsetTop
      const scrollableDistance =
        sectionRef.current.offsetHeight - window.innerHeight
      const rawProgress =
        (window.scrollY - sectionTop) / Math.max(scrollableDistance, 1)

      setPhotoProgress(Math.min(1, Math.max(0, rawProgress)))
    }

    updatePhotoProgress()
    window.addEventListener('scroll', updatePhotoProgress)
    window.addEventListener('resize', updatePhotoProgress)

    return () => {
      window.removeEventListener('scroll', updatePhotoProgress)
      window.removeEventListener('resize', updatePhotoProgress)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative -mt-10 px-4 py-8 sm:px-6 lg:px-10 lg:py-12"
    >
      <style>
        {`
          @keyframes stackScale {
            from {
              transform: translateX(var(--stack-offset)) scale(1);
            }

            to {
              transform: translateX(0) scale(var(--target-scale));
            }
          }

          @supports (animation-timeline: view()) {
            @media (min-width: 1024px) {
              .scroll-stack-card {
                animation-name: stackScale;
                animation-timing-function: linear;
                animation-fill-mode: both;
                animation-timeline: view();
                animation-range: exit -10% exit 80%;
                transform-origin: top center;
              }
            }
          }
        `}
      </style>

      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-0 lg:h-screen">
          <div className="flex h-full flex-col justify-center">
            <div
              className="h-4 w-24 overflow-hidden rounded-full bg-[#001E2B]/10"
              role="progressbar"
              aria-label="Photo stack progress"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={Math.round(photoProgress * 100)}
            >
              <div
                className="h-full rounded-full bg-[#00ED64] transition-[width] duration-150 ease-out"
                style={{ width: `${photoProgress * 100}%` }}
              />
            </div>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.28em] text-[#00684A]">
              See us at our best
            </p>
            <h2 className="mt-4 w-full max-w-md text-2xl font-extrabold uppercase text-[#001E2B]">
              Built to glow, made to last
            </h2>
            <p className="mt-4 max-w-md text-4xl font-extrabold uppercase leading-tight text-[#001E2B] sm:text-5xl">
              Real signs, real impact
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#001E2B]/75">
              Explore custom LED neon signs, illuminated logos, and statement
              pieces crafted for homes, storefronts, events, and growing
              brands.
            </p>
            <a
              href="#create-neon"
              className="mt-7 inline-flex h-12 w-fit items-center justify-center rounded-full bg-[#4b2cff] px-6 text-sm font-bold uppercase tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5a40ff] lg:mt-10"
            >
              Create your sign
            </a>
          </div>
        </Reveal>

        <div className="relative flex flex-col items-center gap-6 py-20 sm:gap-8 lg:min-h-[360vh] lg:gap-10">
          {showcaseSlots.map((slot) => (
            <div
              key={slot}
              className="group scroll-stack-card relative h-88 w-full overflow-hidden rounded-2xl border border-black/10 bg-white p-3 shadow-[0_16px_40px_rgba(0,0,0,0.14)] transition-transform duration-300 sm:h-120 sm:p-4 lg:sticky lg:h-[70vh] lg:rounded-3xl lg:p-5 lg:shadow-[0_20px_60px_rgba(0,0,0,0.16)]"
              style={{
                zIndex: slot + 1,
                top: '12vh',
                maxWidth: `${30.4 + slot * 1.4}rem`,
                '--stack-offset': `${slot * 50}px`,
                '--target-scale': Math.max(
                  0.72,
                  1 - (showcaseSlots.length - slot - 1) * 0.045,
                ),
              }}
            >
              <img
                src={showcaseImages[slot % showcaseImages.length]}
                alt="Neon sign sample"
                className="h-full w-full rounded-[20px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
