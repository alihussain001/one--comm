/**
 * ProtectedRoute — redirects to /login if the user is not signed in.
 * Remembers the target page via the `redirect` search param so login can return.
 */
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <span className="text-sm text-[#68677a]">Loading…</span>
      </div>
    );
  }

  if (!session) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return <>{children}</>;
}
