/**
 * AdminRoute — wraps ProtectedRoute; additionally checks the role from userDto.
 * If the user is not ADMIN, shows a "Not allowed" message.
 * (The API itself enforces security — this is UI-only convenience.)
 */
import { useAuth } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AdminGate>{children}</AdminGate>
    </ProtectedRoute>
  );
}

function AdminGate({ children }: { children: React.ReactNode }) {
  const { userDto } = useAuth();

  // userDto may still be loading (null); once resolved, gate on role
  if (userDto && userDto.role !== 'ADMIN') {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center gap-3 bg-[#f8f8fc] px-4">
        <p className="text-xl font-bold text-[#1e1b35]">Access denied</p>
        <p className="text-sm text-[#68677a]">
          You don&apos;t have permission to view this page.
        </p>
      </main>
    );
  }

  return <>{children}</>;
}
