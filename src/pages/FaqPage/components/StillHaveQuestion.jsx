import { MessageSquareText } from 'lucide-react'

export default function StillHaveQuestion() {
  return (
    <div className="mt-8 flex flex-col gap-5 rounded-lg bg-black/5 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-4">
        <MessageSquareText
          aria-hidden="true"
          className="mt-1 h-6 w-6 shrink-0 stroke-[1.8] text-black"
        />
        <div>
          <h2 className="text-xl font-bold text-black">
            Still have a question?
          </h2>
          <p className="mt-2 text-sm font-medium text-black/65">
            If you did not find your answer, feel free to reach out.
          </p>
        </div>
      </div>
      <a
        href="#"
        className="inline-flex h-10 items-center justify-center rounded-full border border-black/35 px-5 text-sm font-semibold text-black transition hover:border-[#00684A] hover:text-[#00684A]"
      >
        Contact us
      </a>
    </div>
  )
}
