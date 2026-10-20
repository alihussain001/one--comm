import { Link } from 'react-router-dom';
import logoImg from '../../assets/LOGO.png';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#111827] text-white pt-16 pb-8 border-t border-gray-800">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          {/* Brand Info */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="inline-block" aria-label="One-Comm Home">
              <img
                src={logoImg}
                alt="One-Comm"
                className="h-11 md:h-14 w-auto object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              />
            </Link>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-xs">
              Premium engineered audio. Exceptional acoustic precision, active noise cancellation, and ergonomic all-day comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#AB03A9]">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2 text-xs md:text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  All Headphones
                </a>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#AB03A9]">
              Customer Care
            </h4>
            <ul className="flex flex-col gap-2 text-xs md:text-sm text-gray-300">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Cash on Delivery Info
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  7-Day Return Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Warranty & Support
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Input */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#AB03A9]">
              Stay Updated
            </h4>
            <p className="text-xs text-gray-400">
              Subscribe for exclusive member deals and acoustic updates.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center rounded-full bg-gray-800 p-1 border border-gray-700 focus-within:border-[#5003C0]"
            >
              <input
                type="email"
                placeholder="Your email address…"
                className="w-full bg-transparent px-3 text-xs text-white placeholder-gray-500 outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5003C0] text-white transition-transform hover:scale-105 active:scale-95"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Headphones Store. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>Cash on Delivery</span>
            <span>•</span>
            <span>Verified Genuine Products</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
