/**
 * App.tsx — React Router v7 route tree.
 *
 * Auth pages (Login / Signup) render standalone (no Navbar/Footer).
 * All store pages render inside PageShell which adds Navbar + Footer.
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Auth screens (existing — do not restyle)
import Login from './components/login';
import SignUp from './components/signup';

// Layout
import PageShell from './components/layout/PageShell';

// Auth guards
import ProtectedRoute from './auth/ProtectedRoute';
import AdminRoute from './auth/AdminRoute';

// Pages
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import MyOrdersPage from './pages/MyOrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminOrderDetailPage from './pages/admin/AdminOrderDetailPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Auth screens (standalone, no shell) ── */}
        <Route
          path="/login"
          element={
            <Login
              onNavigateToSignup={() => {
                window.location.href = '/signup';
              }}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp
              onNavigateToLogin={() => {
                window.location.href = '/login';
              }}
            />
          }
        />

        {/* ── Landing & Product page (custom full-bleed layout) ── */}
        <Route path="/" element={<ProductPage />} />
        <Route path="/product" element={<ProductPage />} />

        {/* Protected: logged-in customers */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <PageShell>
                <CheckoutPage />
              </PageShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id/confirmation"
          element={
            <ProtectedRoute>
              <PageShell>
                <OrderConfirmationPage />
              </PageShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <PageShell>
                <MyOrdersPage />
              </PageShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <PageShell>
                <OrderDetailPage />
              </PageShell>
            </ProtectedRoute>
          }
        />

        {/* Admin only */}
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <PageShell>
                <AdminOrdersPage />
              </PageShell>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders/:id"
          element={
            <AdminRoute>
              <PageShell>
                <AdminOrderDetailPage />
              </PageShell>
            </AdminRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <PageShell>
              <NotFoundPage />
            </PageShell>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
