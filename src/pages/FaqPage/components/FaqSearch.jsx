import { Search } from 'lucide-react'

export default function FaqSearch({
  onSearchTermChange,
  onSubmit,
  searchMessage,
  searchTerm,
}) {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="mx-auto mt-7 flex max-w-xl items-center gap-3 rounded-lg border border-black/15 bg-white px-4 py-3 shadow-[0_10px_24px_rgba(0,104,74,0.08)] focus-within:border-[#00684A]"
      >
        <Search
          aria-hidden="true"
          className="h-5 w-5 shrink-0 stroke-[1.8] text-black/60"
        />
        <label htmlFor="faq-search" className="sr-only">
          Search FAQ
        </label>
        <input
          id="faq-search"
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
          placeholder="Search categories or titles"
          className="min-w-0 flex-1 bg-transparent text-left text-sm font-medium text-black outline-none placeholder:text-black/45"
        />
        <button
          type="submit"
          className="h-9 rounded-md bg-[#00684A] px-4 text-sm font-semibold text-white transition hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00684A]"
        >
          Search
        </button>
      </form>
      {searchMessage && (
        <p className="mt-3 text-sm font-medium text-[#00684A]">
          {searchMessage}
        </p>
      )}
    </>
  )
}
