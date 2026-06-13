import { useEffect, useRef, useState } from 'react'
import { CircleHelp, Info, MessagesSquare } from 'lucide-react'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import ArticleDetail from './components/ArticleDetail'
import ArticleItem from './components/ArticleItem'
import CategoryButton from './components/CategoryButton'
import FaqSearch from './components/FaqSearch'
import StillHaveQuestion from './components/StillHaveQuestion'
import {
  categories,
  getArticlesForCategory,
  getSearchEntries,
  VISIBLE_ARTICLE_LIMIT,
} from './faqData'

export default function FaqPage({ onLogin }) {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [visibleCategory, setVisibleCategory] = useState(categories[0])
  const [isChangingCategory, setIsChangingCategory] = useState(false)
  const [isChangingArticleView, setIsChangingArticleView] = useState(false)
  const [articleTransitionDirection, setArticleTransitionDirection] =
    useState('forward')
  const [expandedCategories, setExpandedCategories] = useState({})
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchMessage, setSearchMessage] = useState('')
  const faqSectionRef = useRef(null)
  const returnScrollYRef = useRef(null)
  const transitionTimeoutRef = useRef(null)
  const articleTransitionTimeoutRef = useRef(null)

  const activeArticles = getArticlesForCategory(visibleCategory)
  const isExpanded = Boolean(expandedCategories[visibleCategory])
  const hasMoreArticles = activeArticles.length > VISIBLE_ARTICLE_LIMIT
  const visibleArticles =
    hasMoreArticles && !isExpanded
      ? activeArticles.slice(0, VISIBLE_ARTICLE_LIMIT)
      : activeArticles
  const panelTransitionClass = getPanelTransitionClass({
    articleTransitionDirection,
    isChangingArticleView,
    isChangingCategory,
  })

  useEffect(() => {
    return () => {
      window.clearTimeout(transitionTimeoutRef.current)
      window.clearTimeout(articleTransitionTimeoutRef.current)
    }
  }, [])

  function switchCategory(category) {
    window.clearTimeout(transitionTimeoutRef.current)
    setActiveCategory(category)
    setExpandedCategories({})
    setSelectedArticle(null)
    returnScrollYRef.current = null
    setIsChangingArticleView(false)
    setArticleTransitionDirection('forward')
    setIsChangingCategory(true)

    transitionTimeoutRef.current = window.setTimeout(() => {
      setVisibleCategory(category)
      window.requestAnimationFrame(() => {
        setIsChangingCategory(false)
        scrollToFaqSection()
      })
    }, 140)
  }

  function handleCategoryChange(category) {
    if (category === activeCategory) {
      return
    }

    switchCategory(category)
  }

  function goToFaqMatch(category, article = null) {
    window.clearTimeout(transitionTimeoutRef.current)
    window.clearTimeout(articleTransitionTimeoutRef.current)
    setActiveCategory(category)
    setExpandedCategories({})
    returnScrollYRef.current = null
    setIsChangingArticleView(false)
    setArticleTransitionDirection(article ? 'forward' : 'back')
    setIsChangingCategory(true)

    transitionTimeoutRef.current = window.setTimeout(() => {
      setVisibleCategory(category)
      setSelectedArticle(article)
      window.requestAnimationFrame(() => {
        setIsChangingCategory(false)
        scrollToFaqSection()
      })
    }, 140)
  }

  function handleSearchSubmit(event) {
    event.preventDefault()

    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      setSearchMessage('')
      return
    }

    const searchEntries = getSearchEntries()
    const articleMatch = searchEntries.find(
      (entry) =>
        entry.type === 'article' &&
        entry.searchText.toLowerCase().includes(query),
    )
    const categoryMatch = searchEntries.find(
      (entry) =>
        entry.type === 'category' &&
        entry.searchText.toLowerCase().includes(query),
    )

    if (articleMatch) {
      setSearchMessage('')
      goToFaqMatch(articleMatch.category, articleMatch.article)
      return
    }

    if (categoryMatch) {
      setSearchMessage('')
      goToFaqMatch(categoryMatch.category)
      return
    }

    setSearchMessage('No matching FAQ found.')
  }

  function handleSeeMore() {
    setExpandedCategories((currentCategories) => ({
      ...currentCategories,
      [visibleCategory]: true,
    }))
  }

  function handleArticleSelect(event, article) {
    event.preventDefault()
    window.clearTimeout(articleTransitionTimeoutRef.current)
    returnScrollYRef.current = window.scrollY
    setArticleTransitionDirection('forward')
    setIsChangingArticleView(true)

    articleTransitionTimeoutRef.current = window.setTimeout(() => {
      setSelectedArticle(article)
      window.requestAnimationFrame(() => {
        setIsChangingArticleView(false)
        scrollToFaqSection()
      })
    }, 140)
  }

  function handleArticleBack() {
    window.clearTimeout(articleTransitionTimeoutRef.current)
    setArticleTransitionDirection('back')
    setIsChangingArticleView(true)

    articleTransitionTimeoutRef.current = window.setTimeout(() => {
      setSelectedArticle(null)
      window.requestAnimationFrame(() => {
        setIsChangingArticleView(false)
        scrollToReturnPosition()
      })
    }, 140)
  }

  function scrollToFaqSection() {
    faqSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  function scrollToReturnPosition() {
    if (typeof returnScrollYRef.current !== 'number') {
      scrollToFaqSection()
      return
    }

    window.scrollTo({
      top: returnScrollYRef.current,
      behavior: 'smooth',
    })
  }

  return (
    <div className="min-h-screen bg-white font-euclid text-black">
      <Navbar onLogin={onLogin} />
      <main>
        <section
          ref={faqSectionRef}
          className="relative mx-auto min-h-[calc(100vh-4.5rem)] w-full max-w-6xl scroll-mt-24 px-6 py-14 sm:px-8 lg:min-h-[calc(100vh-7.5rem)] lg:px-10 lg:py-16"
        >
          <DecorativeIcons />

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded bg-[#00ED64] px-3 py-1 text-xs font-bold text-black">
              All About Neon
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-normal text-black sm:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-5 text-base font-medium leading-7 text-black/70">
              Find answers to common questions about custom neon signs, orders,
              installation, colors, shipping, and returns.
            </p>
            <FaqSearch
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              onSubmit={handleSearchSubmit}
              searchMessage={searchMessage}
            />
          </div>

          <div className="mt-11 grid gap-10 lg:grid-cols-[17rem_1fr] lg:gap-16">
            <aside aria-label="FAQ categories">
              <h2 className="mb-4 text-sm font-bold text-[#00684A]">
                Categories
              </h2>
              <nav>
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category}>
                      <CategoryButton
                        category={category}
                        isActive={category === activeCategory}
                        onClick={() => handleCategoryChange(category)}
                      />
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <section aria-labelledby="faq-category-title">
              <h2 id="faq-category-title" className="sr-only">
                {visibleCategory}
              </h2>

              <div
                className={[
                  'transition-all duration-250 ease-out',
                  panelTransitionClass,
                ].join(' ')}
              >
                {selectedArticle ? (
                  <ArticleDetail
                    article={selectedArticle}
                    onBack={handleArticleBack}
                  />
                ) : (
                  <>
                    <div className="min-h-[29rem]">
                      <div className="space-y-3">
                        {visibleArticles.map((article) => (
                          <ArticleItem
                            key={article.title}
                            {...article}
                            onSelect={(event) =>
                              handleArticleSelect(event, article)
                            }
                          />
                        ))}
                      </div>

                      {hasMoreArticles && !isExpanded && (
                        <button
                          type="button"
                          onClick={handleSeeMore}
                          className="mt-5 inline-flex h-10 items-center justify-center rounded-full border border-black/25 px-5 text-sm font-semibold text-black transition hover:border-[#00684A] hover:text-[#00684A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00684A]"
                        >
                          See more
                        </button>
                      )}
                    </div>

                    <StillHaveQuestion />
                  </>
                )}
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function DecorativeIcons() {
  return (
    <>
      <MessagesSquare
        aria-hidden="true"
        className="absolute left-8 top-[3.25rem] hidden h-[4.25rem] w-[4.25rem] rotate-[-12deg] stroke-[1.5] text-black/80 lg:block"
      />
      <CircleHelp
        aria-hidden="true"
        className="absolute right-[5.25rem] top-8 hidden h-12 w-12 rotate-[-10deg] stroke-[1.5] text-black/80 lg:block"
      />
      <Info
        aria-hidden="true"
        className="absolute right-10 top-4 hidden h-[3.75rem] w-[3.75rem] rotate-[18deg] stroke-[1.5] text-black/80 lg:block"
      />
    </>
  )
}

function getPanelTransitionClass({
  articleTransitionDirection,
  isChangingArticleView,
  isChangingCategory,
}) {
  if (isChangingCategory) {
    return 'translate-y-2 opacity-0'
  }

  if (isChangingArticleView) {
    return articleTransitionDirection === 'forward'
      ? '-translate-x-6 opacity-0'
      : 'translate-x-6 opacity-0'
  }

  return 'translate-x-0 translate-y-0 opacity-100'
}
