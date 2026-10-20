import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import logoImg from '../../assets/logo-A.png';
import { CATEGORIES } from '../../data/categories';

export default function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Close categories dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(e.target as Node)
      ) {
        setCategoriesOpen(false);
      }
    }
    if (categoriesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [categoriesOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
      isActive
        ? 'bg-white/15 text-white'
        : 'text-white/80 hover:text-white hover:bg-white/10'
    }`;

  return (
    <header className="sticky top-0 z-30 w-full bg-[#0e4eba] shadow-[0_2px_12px_rgba(14,78,186,0.25)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 md:px-6">
        {/* ── Left: Logo ── */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 transition-transform duration-150 hover:scale-[1.02]"
          aria-label="One-Comm Home"
        >
          <img
            src={logoImg}
            alt="One-Comm"
            className="h-16 sm:h-12  w-auto object-contain drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]"
          />
        </Link>

        {/* ── Center: Navigation (Desktop) ── */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>

          <a href="#categories" className="px-3 py-1.5 rounded-full text-sm font-medium text-white/80 transition-all duration-150 hover:text-white hover:bg-white/10">
            Shop
          </a>

          {/* Categories Dropdown */}
          <div ref={categoriesRef} className="relative">
            <button
              type="button"
              onClick={() => setCategoriesOpen((o) => !o)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
                categoriesOpen
                  ? 'bg-white/15 text-white'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              aria-expanded={categoriesOpen}
              aria-haspopup="true"
            >
              Categories
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={`transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {categoriesOpen && (
              <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 w-52 rounded-xl bg-white py-2 shadow-[0_12px_40px_rgba(14,78,186,0.18)] ring-1 ring-black/5">
                {CATEGORIES.map((cat) => (
                  <a
                    key={cat.id}
                    href="#categories"
                    onClick={() => setCategoriesOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#1e1b35] transition-colors hover:bg-[#0e4eba]/5 hover:text-[#0e4eba]"
                  >
                    <img
                      src={cat.imageUrl}
                      alt=""
                      className="h-7 w-7 rounded-lg object-cover"
                      aria-hidden="true"
                    />
                    {cat.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="#products" className="px-3 py-1.5 rounded-full text-sm font-medium text-white/80 transition-all duration-150 hover:text-white hover:bg-white/10">
            Deals
          </a>

          <a href="#footer" className="px-3 py-1.5 rounded-full text-sm font-medium text-white/80 transition-all duration-150 hover:text-white hover:bg-white/10">
            About
          </a>
        </nav>

        {/* ── Right: Action Icons ── */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Account / Profile */}
          {user ? (
            <div className="hidden sm:flex items-center gap-1">
              <button
                type="button"
                onClick={() => navigate('/orders')}
                aria-label="My orders"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => signOut()}
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-white/70 transition-colors hover:text-white hover:bg-white/10"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              aria-label="Account"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          )}

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-full text-white/90 hover:bg-white/15"
          >
            {mobileMenuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/15 bg-[#0e4eba]/95 px-5 py-4 backdrop-blur-md">
          <nav className="flex flex-col gap-2 text-sm font-medium text-white">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 transition-colors hover:bg-white/10"
            >
              Home
            </Link>
            <a
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 transition-colors hover:bg-white/10"
            >
              Shop
            </a>

            {/* Mobile Categories accordion */}
            <div>
              <button
                type="button"
                onClick={() => setCategoriesOpen((o) => !o)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-white/10"
              >
                <span>Categories</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {categoriesOpen && (
                <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-white/15 pl-3">
                  {CATEGORIES.map((cat) => (
                    <a
                      key={cat.id}
                      href="#categories"
                      onClick={() => {
                        setCategoriesOpen(false);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <img
                        src={cat.imageUrl}
                        alt=""
                        className="h-6 w-6 rounded-md object-cover"
                        aria-hidden="true"
                      />
                      {cat.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 transition-colors hover:bg-white/10"
            >
              Deals
            </a>
            <a
              href="#footer"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 transition-colors hover:bg-white/10"
            >
              About
            </a>

            {/* Divider */}
            <div className="my-1 h-px bg-white/15" />

            {user ? (
              <>
                <Link
                  to="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 transition-colors hover:bg-white/10"
                >
                  My Orders
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="text-left rounded-lg px-3 py-2.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Log In / Sign Up
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
