export default function ArticleItem({ title, href, onSelect }) {
  return (
    <a
      href={href}
      onClick={onSelect}
      className="flex min-h-[4.75rem] items-center rounded-lg bg-black/5 p-5 text-left transition hover:bg-white hover:shadow-[0_12px_30px_rgba(0,104,74,0.12)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#00684A] sm:p-6"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-lg leading-snug text-black">{title}</span>
      </span>
    </a>
  )
}
