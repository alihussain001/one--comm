/**
 * PageShell — wraps every store page with the Navbar, the radial canvas gradient,
 * and a centred content area. Does not wrap auth pages (Login / Signup).
 */
import Navbar from './Navbar';
import Footer from './Footer';

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-svh antialiased"
      style={{
        background:
          'radial-gradient(circle at 0% 0%, rgba(118,87,225,0.10), transparent 36rem), radial-gradient(circle at 100% 100%, rgba(41,174,162,0.10), transparent 34rem), #f8f8fc',
        color: '#201e31',
      }}
    >
      <Navbar />
      <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-5 sm:py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
