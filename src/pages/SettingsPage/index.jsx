import { useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { Sidebar } from '../../components/layout'

export default function DashboardPage({ user, onLogout }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[#f0f0f0] text-black">
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <div className="hidden p-3 lg:sticky lg:top-0 lg:block lg:h-screen">
          <Sidebar user={user} onLogout={onLogout} />
        </div>

        {/* Mobile sidebar drawer */}
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
                <Sidebar user={user} onLogout={onLogout} />
              </div>
            </div>
          </div>
        )}

        {/* Dashboard content */}
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
              <h1 className="text-lg font-semibold">Dashboard</h1>
              <button
                type="button"
                aria-label="Search"
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-[#9a9a9a] transition-colors duration-200 hover:bg-[#f6f6f6] hover:text-black"
              >
                <Search size={18} strokeWidth={1.8} />
              </button>
            </header>

            {/* Blank dashboard canvas */}
            <div className="flex-1" />
          </div>
        </section>
      </div>
    </main>
  )
}
