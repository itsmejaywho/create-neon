import { ArrowLeft, Mail, Phone } from 'lucide-react'

export default function ArticleDetail({ article, onBack }) {
  const isCustomerServiceArticle = article.detailType === 'customer-service'
  const descriptionParagraphs = article.description
    .split('\n')
    .filter((paragraph) => paragraph.trim())
  const sections = article.sections || []

  return (
    <article className="min-h-[29rem] text-black">
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to FAQ titles"
          className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/20 text-black transition hover:border-[#00684A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00684A]"
        >
          <ArrowLeft aria-hidden="true" className="h-4.5 w-4.5 stroke-[1.8]" />
        </button>
        <h2 className="text-2xl font-semibold leading-tight text-black sm:text-3xl">
          {article.detailTitle || article.title}
        </h2>
      </div>

      {isCustomerServiceArticle && (
        <>
          <div className="mt-9 space-y-2 text-base leading-7">
            <p className="flex items-center gap-3">
              <Mail aria-hidden="true" className="h-4.5 w-4.5 stroke-[1.8]" />
              <span>Email: aboutneon@gmail.com</span>
            </p>
            <p className="flex items-center gap-3">
              <Phone aria-hidden="true" className="h-4.5 w-4.5 stroke-[1.8]" />
              <span>Phone / WhatsApp: +63 9283487625</span>
            </p>
          </div>

          <p className="mt-8 text-lg leading-8">
            Our team will be happy to assist you.
          </p>
        </>
      )}

      {!isCustomerServiceArticle && (
        <div className="mt-8 space-y-5 text-base leading-7 text-black/70">
          {descriptionParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {sections.map(({ body, heading }) => (
            <section key={heading} className="pt-2">
              <h3 className="mb-2 text-xl font-semibold text-black">
                {heading}
              </h3>
              <p>{body}</p>
            </section>
          ))}
        </div>
      )}
    </article>
  )
}
