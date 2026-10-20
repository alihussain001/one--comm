/**
 * Navbar — sticky top bar with brand, nav links, and auth controls.
 * Shows: Product | My Orders (logged-in) | Admin (ADMIN role) | Login / Logout
 * Role-based visibility is UI convenience only — the API enforces real security.
 */
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import BrandMark from '../ui/BrandMark';
import { useAuth } from '../../auth/AuthContext';

export default function Navbar() {
  const { user, userDto, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-colors duration-150 ${
      isActive ? 'text-[#674ad1]' : 'text-[#302e43] hover:text-[#674ad1]'
    }`;

  return (
    <header className="sticky top-0 z-20 border-b border-[#e7e7ef] bg-white/94 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
        {/* Brand */}
        <Link to="/" aria-label="One Comm — home" className="inline-flex items-center transition-transform hover:scale-[1.02]">
          <div className="flex items-center bg-[#111827] px-2.5 py-1 rounded-xl shadow-xs">
            <BrandMark />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-4 sm:flex"
          aria-label="Main navigation"
        >
          <NavLink to="/" end className={linkClass}>
            Product
          </NavLink>
          {user && (
            <NavLink to="/orders" className={linkClass}>
              My orders
            </NavLink>
          )}
          {userDto?.role === 'ADMIN' && (
            <NavLink to="/admin/orders" className={linkClass}>
              Admin
            </NavLink>
          )}
          {user ? (
            <button
              onClick={() => signOut()}
              className="text-sm font-semibold text-[#302e43] hover:text-[#674ad1] transition-colors duration-150"
            >
              Log out
            </button>
          ) : (
            <NavLink
              to="/login"
              className="inline-flex min-h-[36px] items-center rounded-[10px] bg-[#674ad1] px-4 text-sm font-bold text-white shadow-[0_9px_18px_rgba(103,74,209,0.22)] transition-all duration-150 hover:bg-[#5639bf] hover:-translate-y-px"
            >
              Log in
            </NavLink>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex items-center justify-center rounded-lg p-2 text-[#787590] hover:bg-[rgba(118,87,225,0.08)] hover:text-[#1e1b35] sm:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="border-t border-[#e7e7ef] bg-white/94 px-4 pb-4 pt-2 sm:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-3">
            <NavLink to="/" end className={linkClass} onClick={() => setMenuOpen(false)}>
              Product
            </NavLink>
            {user && (
              <NavLink to="/orders" className={linkClass} onClick={() => setMenuOpen(false)}>
                My orders
              </NavLink>
            )}
            {userDto?.role === 'ADMIN' && (
              <NavLink to="/admin/orders" className={linkClass} onClick={() => setMenuOpen(false)}>
                Admin
              </NavLink>
            )}
            {user ? (
              <button
                onClick={() => { setMenuOpen(false); signOut(); }}
                className="text-left text-sm font-semibold text-[#302e43] hover:text-[#674ad1]"
              >
                Log out
              </button>
            ) : (
              <NavLink to="/login" onClick={() => setMenuOpen(false)} className="text-sm font-bold text-[#674ad1]">
                Log in
              </NavLink>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
