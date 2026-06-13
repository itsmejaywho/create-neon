export default function CategoryButton({ category, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex w-full items-center border-l-[3px] py-2.5 pl-4 pr-3 text-left text-base font-medium transition',
        isActive
          ? 'border-[#00ED64] text-black'
          : 'border-transparent text-black/65 hover:border-[#00684A]/35 hover:text-black',
      ].join(' ')}
    >
      {category}
    </button>
  )
}
