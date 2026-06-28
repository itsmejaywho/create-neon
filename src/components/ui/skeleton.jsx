export function Skeleton({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={[
        'animate-pulse rounded-md bg-[linear-gradient(90deg,#ececec_20%,#f5f5f5_40%,#ececec_60%)] bg-[length:200%_100%]',
        className,
      ].join(' ')}
    />
  )
}
