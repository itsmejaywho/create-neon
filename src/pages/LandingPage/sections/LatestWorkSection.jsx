const workSlots = Array.from({ length: 6 }, (_, index) => index)

export default function LatestWorkSection() {
  return (
    <section className="relative overflow-hidden py-12 text-white border-t-[white] rounded-t-[30px]">
      <div className="absolute inset-0 bg-[#8c98c0]" aria-hidden="true" />

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
          {workSlots.map((slot) => (
            <article key={slot} className="min-w-0">
              <div className="mx-auto aspect-[1] h-[calc(80%-20px)] border border-white/15 bg-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.22)]" />
              <div className="flex flex-col items-center pt-6 text-center">
                <div className="h-5 w-36 rounded-sm bg-white/16" />
                <div className="mt-3 h-4 w-44 rounded-sm bg-white/10" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
