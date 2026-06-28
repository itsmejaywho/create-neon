import { useEffect, useMemo, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Menu,
  Search,
  X,
} from 'lucide-react'
import { Sidebar } from '../../components/layout'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchDesignOrders, subscribeToDesignOrders } from '../../lib/adminApi'

function OrdersSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-24 rounded-full" />
          ))}
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 rounded-lg" />
          <Skeleton className="h-9 w-20 rounded-lg" />
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#ececec] bg-white">
        <div className="grid grid-cols-[1fr_1.4fr_1fr_0.8fr_0.8fr_0.8fr_0.9fr_0.9fr] gap-4 border-b border-[#f0f0f0] bg-[#fafafa] px-5 py-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-20" />
          ))}
        </div>

        <div className="flex-1 space-y-1 p-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_1.4fr_1fr_0.8fr_0.8fr_0.8fr_0.9fr_0.9fr] gap-4 rounded-xl px-3 py-4"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
              </div>
                <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-18" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EmptyOrdersState() {
  return (
    <div className="flex h-full min-h-[20rem] items-center justify-center rounded-2xl border border-dashed border-[#d9d9d9] bg-[#fafafa] p-8 text-center">
      <div>
        <h2 className="text-lg font-semibold text-black">No orders yet</h2>
        <p className="mt-2 text-sm text-[#7a7a7a]">
          Saved neon designs will appear here once customers submit them.
        </p>
      </div>
    </div>
  )
}

function formatSubmittedAt(value) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Unknown date'
  }

  return date.toLocaleString()
}

function formatOrderDate(value) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Unknown date'
  }

  return date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function truncateText(value, maxLength) {
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, maxLength - 3)}...`
}

function buildOrderViewModel(order) {
  const isLogoDesign = getOrderType(order) === 'logo-design'
  const itemCount = isLogoDesign
    ? 1
    : Math.max(
        1,
        String(order.text || '')
          .split('\n')
          .filter((line) => line.trim().length > 0).length,
      )

  return {
    ...order,
    code: isLogoDesign
      ? `#LGD${String(order.recordId || 0).padStart(4, '0')}`
      : `#CDHT${String(order.recordId || 0).padStart(4, '0')}`,
    locationSummary: truncateText(
      order.locationLabel || order.usage || 'Unknown location',
      22,
    ),
    itemMeta: `${itemCount} item${itemCount === 1 ? '' : 's'}`,
    dateLabel: formatOrderDate(order.submittedAt),
    totalLabel: Number.isFinite(Number(order.quotedPrice))
      ? `$${Number(order.quotedPrice).toLocaleString()}`
      : 'Quote pending',
    customerLabel:
      [order.firstName, order.lastName].filter(Boolean).join(' ') || 'Unknown customer',
    contactLabel: order.workEmail || [order.phoneDialCode, order.phoneNumber].filter(Boolean).join(' '),
    summaryLabel: truncateText(order.text || order.description || 'No summary provided', 34),
    typeLabel: isLogoDesign ? 'Logo & Design' : 'Text',
  }
}

function getOrderType(order) {
  return order.orderType === 'logo-design' ? 'logo-design' : 'text'
}

function compareOrdersBySubmission(left, right) {
  const leftTime = new Date(left.submittedAt).getTime()
  const rightTime = new Date(right.submittedAt).getTime()

  if (leftTime !== rightTime) {
    return leftTime - rightTime
  }

  return Number(left.recordId || 0) - Number(right.recordId || 0)
}

function mergeOrderList(existingOrders, incomingOrder) {
  const nextOrders = existingOrders.filter((order) => order.id !== incomingOrder.id)
  nextOrders.push(incomingOrder)
  nextOrders.sort(compareOrdersBySubmission)
  return nextOrders
}

export default function DashboardPage({ user, token, onLogout }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [activePage, setActivePage] = useState('orders')
  const [activeOrderTab, setActiveOrderTab] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadOrders() {
      setLoading(true)
      setErrorMessage('')

      try {
        const nextOrders = await fetchDesignOrders(token)
        if (!cancelled) {
          setOrders(nextOrders)
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadOrders()

    return () => {
      cancelled = true
    }
  }, [token])

  useEffect(() => {
    const unsubscribe = subscribeToDesignOrders(token, {
      onOrderCreated: (incomingOrder) => {
        setOrders((currentOrders) => mergeOrderList(currentOrders, incomingOrder))
      },
    })

    return unsubscribe
  }, [token])

  const totalOrders = orders.length
  const textOrders = orders.filter((order) => getOrderType(order) === 'text').length
  const logoDesignOrders = orders.filter(
    (order) => getOrderType(order) === 'logo-design',
  ).length
  const totalQuotedValue = orders.reduce(
    (sum, order) => sum + Number(order.quotedPrice || 0),
    0,
  )
  const decoratedOrders = useMemo(
    () => orders.map(buildOrderViewModel),
    [orders],
  )
  const filteredOrders = useMemo(() => {
    if (activeOrderTab === 'text') {
      return decoratedOrders.filter((order) => getOrderType(order) === 'text')
    }

    if (activeOrderTab === 'logo-design') {
      return decoratedOrders.filter(
        (order) => getOrderType(order) === 'logo-design',
      )
    }

    return decoratedOrders
  }, [activeOrderTab, decoratedOrders])
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / 10))
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * 10,
    currentPage * 10,
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [activeOrderTab])

  return (
    <main className="min-h-screen bg-[#f0f0f0] text-black">
      <div className="flex min-h-screen">
        <div className="hidden p-3 lg:sticky lg:top-0 lg:block lg:h-screen">
          <Sidebar
            user={user}
            onLogout={onLogout}
            activeId={activePage}
            onActiveChange={setActivePage}
          />
        </div>

        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 bg-black/25 lg:hidden">
            <div className="h-full w-fit p-3">
              <div className="relative h-full">
                <button
                  type="button"
                  aria-label="Close navigation"
                  onClick={() => setMobileNavOpen(false)}
                  className="absolute -right-3 top-3 z-50 grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-[#ececec] bg-white text-[#6b6b6b] shadow-sm"
                >
                  <X size={16} strokeWidth={2} />
                </button>
                <Sidebar
                  user={user}
                  onLogout={onLogout}
                  activeId={activePage}
                  onActiveChange={(nextPage) => {
                    setActivePage(nextPage)
                    setMobileNavOpen(false)
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <section className="flex min-w-0 flex-1 flex-col p-3 lg:pl-0">
          <div className="flex min-h-full flex-1 flex-col rounded-[1.75rem] border border-[#ececec] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
            <header className="flex h-16 items-center justify-between gap-3 border-b border-[#f0f0f0] px-5">
              <button
                type="button"
                aria-label="Open navigation"
                onClick={() => setMobileNavOpen(true)}
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-[#6b6b6b] transition-colors duration-200 hover:bg-[#f6f6f6] hover:text-black lg:hidden"
              >
                <Menu size={18} strokeWidth={1.8} />
              </button>
              <div>
                <h1 className="text-lg font-semibold">
                  {activePage === 'orders' ? 'Orders' : 'Dashboard'}
                </h1>
                <p className="text-xs text-[#8a8a8a]">
                  {activePage === 'orders'
                    ? 'Review saved neon sign orders placed through the site.'
                    : 'View a quick overview of recent neon sign activity.'}
                </p>
              </div>
              <button
                type="button"
                aria-label="Search"
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-[#9a9a9a] transition-colors duration-200 hover:bg-[#f6f6f6] hover:text-black"
              >
                <Search size={18} strokeWidth={1.8} />
              </button>
            </header>

            <div className="flex flex-1 flex-col p-5">
              {loading ? (
                <OrdersSkeleton />
              ) : errorMessage ? (
                <div className="flex h-full min-h-[20rem] items-center justify-center rounded-2xl border border-dashed border-[#f0c5c5] bg-[#fff7f7] p-8 text-center">
                  <div>
                    <h2 className="text-lg font-semibold text-[#8a1f1f]">
                      Unable to load orders
                    </h2>
                    <p className="mt-2 text-sm text-[#9a4b4b]">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              ) : activePage === 'dashboard' ? (
                <DashboardOverview
                  logoDesignOrders={logoDesignOrders}
                  textOrders={textOrders}
                  orders={decoratedOrders}
                  totalOrders={totalOrders}
                  totalQuotedValue={totalQuotedValue}
                />
              ) : totalOrders === 0 ? (
                <EmptyOrdersState />
              ) : (
                <div className="flex h-full flex-col">
                  <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#ececec] bg-white">
                    <div className="flex flex-col gap-4 border-b border-[#f0f0f0] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex flex-wrap items-center gap-5 text-sm">
                        <OrderTab
                          active={activeOrderTab === 'all'}
                          label={`All Order (${decoratedOrders.length})`}
                          onClick={() => setActiveOrderTab('all')}
                        />
                        <OrderTab
                          active={activeOrderTab === 'text'}
                          label={`Text (${textOrders})`}
                          onClick={() => setActiveOrderTab('text')}
                        />
                        <OrderTab
                          active={activeOrderTab === 'logo-design'}
                          label={`Logo & Design (${logoDesignOrders})`}
                          onClick={() => setActiveOrderTab('logo-design')}
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <ActionButton icon={Filter} label="Filter" />
                        <ActionButton icon={Download} label="Export" />
                      </div>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                      {activeOrderTab === 'all' ? (
                        <AllOrdersTable orders={paginatedOrders} />
                      ) : activeOrderTab === 'logo-design' ? (
                        <LogoDesignOrdersTable orders={paginatedOrders} />
                      ) : (
                        <TextOrdersTable orders={paginatedOrders} />
                      )}
                    </div>

                    <div className="flex flex-col gap-4 border-t border-[#f0f0f0] px-5 py-4 text-sm text-[#6b6b6b] lg:flex-row lg:items-center lg:justify-between">
                      <p>10 Documents</p>

                      <div className="flex items-center gap-2 self-end">
                        <PaginationButton
                          disabled={currentPage === 1}
                          icon={ChevronLeft}
                          label="Previous"
                          onClick={() =>
                            setCurrentPage((page) => Math.max(1, page - 1))
                          }
                        />

                        {Array.from({ length: totalPages })
                          .slice(0, 3)
                          .map((_, index) => {
                            const page = index + 1
                            return (
                              <button
                                key={page}
                                type="button"
                                onClick={() => setCurrentPage(page)}
                                className={[
                                  'grid h-9 w-9 place-items-center rounded-lg border text-sm transition',
                                  currentPage === page
                                    ? 'border-black bg-black text-white'
                                    : 'border-[#e7e7e7] bg-white text-[#4d4d4d] hover:bg-[#f8f8f8]',
                                ].join(' ')}
                              >
                                {page}
                              </button>
                            )
                          })}

                        {totalPages > 3 && (
                          <span className="px-2 text-[#9a9a9a]">...</span>
                        )}

                        <PaginationButton
                          disabled={currentPage === totalPages}
                          icon={ChevronRight}
                          label="Next"
                          onClick={() =>
                            setCurrentPage((page) =>
                              Math.min(totalPages, page + 1),
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function OrderTab({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'border-b-2 pb-3 text-sm transition',
        active
          ? 'border-[#3b6ff8] font-semibold text-black'
          : 'border-transparent text-[#7a7a7a] hover:text-black',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

function ActionButton({ icon: Icon, label }) {
  return (
    <button
      type="button"
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#ececec] bg-white px-3 text-sm font-medium text-[#4d4d4d] transition hover:bg-[#f8f8f8]"
    >
      <span>{label}</span>
      <Icon size={15} strokeWidth={1.8} />
    </button>
  )
}

function OrderIdentityCell({ order }) {
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        aria-label={`Select order ${order.code}`}
        className="mt-1 h-4 w-4 rounded border-[#d8d8d8]"
      />
      <div>
        <p className="font-semibold text-black">{order.code}</p>
        <p className="mt-1 text-xs text-[#7a7a7a]">{order.itemMeta}</p>
      </div>
    </div>
  )
}

function LogoDesignPreview({ order, compact = false }) {
  if (!order.fileUrl) {
    return (
      <div>
        <p className="font-medium text-black">{order.summaryLabel}</p>
        <p className="mt-1 text-xs text-[#7a7a7a]">
          {order.fileName || 'No uploaded file'}
        </p>
      </div>
    )
  }

  return (
    <div className={['min-w-0', compact ? 'max-w-[16rem]' : ''].join(' ')}>
      <a
        href={order.fileUrl}
        target="_blank"
        rel="noreferrer"
        className="mb-3 block w-fit overflow-hidden rounded-xl border border-[#ececec] bg-[#fafafa]"
      >
        <img
          src={order.fileUrl}
          alt={order.fileName || 'Uploaded logo design'}
          className="h-14 w-14 object-cover"
          loading="lazy"
        />
      </a>
      <p className="font-medium text-black">{order.summaryLabel}</p>
      <p className="mt-1 truncate text-xs text-[#7a7a7a]">
        {order.fileName || 'Uploaded file'}
      </p>
    </div>
  )
}

function AllOrdersTable({ orders }) {
  return (
    <div className="min-w-[1180px]">
      <div className="grid grid-cols-[1fr_1.8fr_1fr_1fr_1fr_0.9fr] gap-4 border-b border-[#f0f0f0] bg-[#fafafa] px-5 py-4 text-xs font-semibold uppercase tracking-wide text-[#7a7a7a]">
        <div>Order ID</div>
        <div>Text</div>
        <div>Customer</div>
        <div>Submitted</div>
        <div>Details</div>
        <div>Price</div>
      </div>

      <div className="divide-y divide-[#f5f5f5]">
        {orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-[1fr_1.8fr_1fr_1fr_1fr_0.9fr] gap-4 px-5 py-4 text-sm"
          >
            <OrderIdentityCell order={order} />
            <div>
              {getOrderType(order) === 'logo-design' ? (
                <LogoDesignPreview order={order} compact />
              ) : (
                <>
                  <p className="font-medium text-black">{order.summaryLabel}</p>
                  <p className="mt-1 text-xs text-[#7a7a7a]">
                    {order.fontName || order.fontId}
                  </p>
                </>
              )}
            </div>
            <div>
              <p className="font-medium text-black">{order.customerLabel}</p>
              <p className="mt-1 text-xs text-[#7a7a7a]">{order.contactLabel || 'No contact'}</p>
            </div>
            <div>
              <p className="font-medium text-black">{order.dateLabel}</p>
              <p className="mt-1 text-xs text-[#7a7a7a]">
                {formatSubmittedAt(order.submittedAt)}
              </p>
            </div>
            <div>
              <p className="font-medium text-black">
                {getOrderType(order) === 'logo-design'
                  ? order.locationSummary
                  : `${order.widthCm} x ${order.heightCm} cm`}
              </p>
              <p className="mt-1 text-xs text-[#7a7a7a]">
                {getOrderType(order) === 'logo-design'
                  ? order.sizeNeeded
                  : order.locationSummary}
              </p>
            </div>
            <div>
              <p className="font-medium text-black">{order.totalLabel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TextOrdersTable({ orders }) {
  return (
    <div className="min-w-[1180px]">
      <div className="grid grid-cols-[1fr_1.4fr_1fr_0.8fr_0.8fr_0.8fr_0.9fr_0.9fr] gap-4 border-b border-[#f0f0f0] bg-[#fafafa] px-5 py-4 text-xs font-semibold uppercase tracking-wide text-[#7a7a7a]">
        <div>Order ID</div>
        <div>Text</div>
        <div>Font</div>
        <div>Color</div>
        <div>Width</div>
        <div>Height</div>
        <div>Location</div>
        <div>Price</div>
      </div>

      <div className="divide-y divide-[#f5f5f5]">
        {orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-[1fr_1.4fr_1fr_0.8fr_0.8fr_0.8fr_0.9fr_0.9fr] gap-4 px-5 py-4 text-sm"
          >
            <OrderIdentityCell order={order} />

            <div>
              <p className="font-medium text-black">{order.summaryLabel}</p>
              <p className="mt-1 text-xs text-[#7a7a7a]">Submitted {order.dateLabel}</p>
            </div>

            <div>
              <p className="font-medium text-black">{order.fontName || order.fontId}</p>
              <p className="mt-1 text-xs text-[#7a7a7a]">{order.alignment}</p>
            </div>

            <div>
              <p className="font-medium text-black">{order.colorName}</p>
            </div>

            <div>
              <p className="font-medium text-black">{order.widthCm} cm</p>
            </div>

            <div>
              <p className="font-medium text-black">{order.heightCm} cm</p>
            </div>

            <div>
              <p className="font-medium text-black">{order.locationSummary}</p>
            </div>

            <div>
              <p className="font-semibold text-black">{order.totalLabel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LogoDesignOrdersTable({ orders }) {
  return (
    <div className="min-w-[1240px]">
      <div className="grid grid-cols-[1fr_1.1fr_1.5fr_1fr_0.9fr_0.9fr_0.9fr_1.2fr] gap-4 border-b border-[#f0f0f0] bg-[#fafafa] px-5 py-4 text-xs font-semibold uppercase tracking-wide text-[#7a7a7a]">
        <div>Order ID</div>
        <div>Customer</div>
        <div>Design</div>
        <div>Technology</div>
        <div>Size</div>
        <div>Quantity</div>
        <div>Usage</div>
        <div>Contact</div>
      </div>

      <div className="divide-y divide-[#f5f5f5]">
        {orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-[1fr_1.1fr_1.5fr_1fr_0.9fr_0.9fr_0.9fr_1.2fr] gap-4 px-5 py-4 text-sm"
          >
            <OrderIdentityCell order={order} />

            <div>
              <p className="font-medium text-black">{order.customerLabel}</p>
              <p className="mt-1 text-xs text-[#7a7a7a] capitalize">
                {order.customerType || 'Customer'}
              </p>
            </div>

            <div>
              <LogoDesignPreview order={order} />
            </div>

            <div>
              <p className="font-medium text-black">
                {order.technologyNeeded || 'Not selected'}
              </p>
              <p className="mt-1 text-xs text-[#7a7a7a]">
                Submitted {order.dateLabel}
              </p>
            </div>

            <div>
              <p className="font-medium text-black">{order.sizeNeeded || 'Not selected'}</p>
            </div>

            <div>
              <p className="font-medium text-black">{order.quantityNeeded || 'Not selected'}</p>
            </div>

            <div>
              <p className="font-medium capitalize text-black">
                {order.usage || order.locationSummary}
              </p>
            </div>

            <div>
              <p className="font-medium text-black">{order.contactLabel || 'No contact'}</p>
              <p className="mt-1 text-xs text-[#7a7a7a]">{order.workEmail || order.phoneNumber}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DashboardOverview({
  logoDesignOrders,
  textOrders,
  orders,
  totalOrders,
  totalQuotedValue,
}) {
  const latestOrders = orders.slice(-3).reverse()

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard label="Total orders" value={String(totalOrders)} />
        <SummaryCard label="Text orders" value={String(textOrders)} />
        <SummaryCard label="Logo design orders" value={String(logoDesignOrders)} />
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <SummaryCard
          label="Quoted value"
          value={`$${totalQuotedValue.toLocaleString()}`}
        />
      </div>

      <section className="flex-1 rounded-2xl border border-[#ececec] bg-[#fcfcfc] p-5">
        <h2 className="text-base font-semibold">Latest activity</h2>
        <div className="mt-4 space-y-3">
          {latestOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-[#f0f0f0] bg-white p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#7a7a7a]">
                {order.typeLabel} {order.code}
              </p>
              <p className="mt-1 text-base font-semibold text-black">
                {order.summaryLabel}
              </p>
              <p className="mt-1 text-sm text-[#6b6b6b]">
                {getOrderType(order) === 'logo-design'
                  ? `${order.customerLabel} / ${order.technologyNeeded} / ${order.locationSummary}`
                  : `${order.colorName} / ${order.locationLabel} / $${Number(order.quotedPrice).toLocaleString()}`}
              </p>
            </div>
          ))}
          {latestOrders.length === 0 && (
            <p className="text-sm text-[#7a7a7a]">
              No recent order activity yet.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#ececec] bg-[#fcfcfc] p-5">
      <p className="text-sm font-medium text-[#7a7a7a]">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-black">{value}</p>
    </div>
  )
}

function PaginationButton({ disabled, icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#e7e7e7] bg-white px-3 text-sm text-[#4d4d4d] transition hover:bg-[#f8f8f8] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Icon size={14} strokeWidth={1.8} />
      <span>{label}</span>
    </button>
  )
}
