import { useEffect, useRef, useState } from 'react'
import customImage from '../../../assets/image/custom.webp'
import heroBackground from '../../../assets/image/hero-background.jpg'
import ownImage from '../../../assets/image/own.webp'
import personalImage from '../../../assets/image/personal.webp'

const imageSlots = Array.from({ length: 5 }, (_, index) => index)
const imagePool = [customImage, personalImage, ownImage, heroBackground]

export default function Best() {
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
      className="relative -mt-10 px-4 py-8 sm:px-6 sm:py-12 lg:px-10"
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
            .scroll-stack-card {
              animation-name: stackScale;
              animation-timing-function: linear;
              animation-fill-mode: both;
              animation-timeline: view();
              animation-range: exit -10% exit 80%;
              transform-origin: top center;
            }
          }
        `}
      </style>

      <div className="mx-auto grid w-full max-w-6xl gap-0 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-0 lg:h-screen">
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
            <h2 className="mt-4 w-full max-w-md text-2xl font-extrabold uppercase text-[#001E2B]">
              SEE US AT OUR BEST
            </h2>
            <p className="mt-4 max-w-md text-4xl font-extrabold uppercase leading-tight text-[#001E2B] sm:text-5xl">
              Built to glow, made to last
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#001E2B]/75">
              Explore custom LED neon signs, illuminated logos, and statement
              pieces crafted for homes, storefronts, events, and growing
              brands.
            </p>
            <a
              href="#create-neon"
              className="mt-10 inline-flex h-12 w-fit items-center justify-center rounded-full bg-[#4b2cff] px-6 text-sm font-bold uppercase tracking-wide text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Create your sign
            </a>
          </div>
        </div>

        <div className="relative -mt-12 flex min-h-[360vh] flex-col items-center gap-10 py-0 sm:mt-0">
          {imageSlots.map((slot) => (
            <div
              key={slot}
              className="scroll-stack-card sticky h-[70vh] w-full overflow-hidden rounded-3xl border border-black/10 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)]"
              style={{
                zIndex: slot + 1,
                top: '12vh',
                maxWidth: `${30.4 + slot * 1.4}rem`,
                '--stack-offset': `${slot * 50}px`,
                '--target-scale': Math.max(
                  0.72,
                  1 - (imageSlots.length - slot - 1) * 0.045,
                ),
              }}
            >
              <img
                src={imagePool[slot % imagePool.length]}
                alt="Neon sign sample"
                className="h-full w-full rounded-[20px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
