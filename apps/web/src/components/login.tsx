import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { api } from "../lib/api";
import { useAuth } from "../auth/AuthContext";
import type { UserDto } from "../types";

interface LoginProps {
  onNavigateToSignup?: () => void;
}

export default function Login({ onNavigateToSignup }: LoginProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUserDto } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fallback prompt when Supabase user metadata has no name.
  const [askName, setAskName] = useState(false);
  const [name, setName] = useState("");
  const [pendingName, setPendingName] = useState(false);

  const redirectTo = searchParams.get("redirect") || "/";

  const finishLogin = async (profileName: string) => {
    const dto = await api.post<UserDto>("/users/me", {
      name: profileName.trim(),
    });
    setUserDto(dto);
    navigate(redirectTo, { replace: true });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() && !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    setError("");
    setSubmitting(true);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setSubmitting(false);
      return;
    }

    const metaName = data.user?.user_metadata?.name;
    if (typeof metaName === "string" && metaName.trim()) {
      try {
        await finishLogin(metaName);
      } catch (err) {
        const msg = (err as { body?: { message?: string } })?.body?.message;
        setError(msg || "Could not create your profile. Please try again.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // Name missing — ask the user.
    setAskName(true);
    setSubmitting(false);
  };

  const handleNameSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    setError("");
    setPendingName(true);
    try {
      await finishLogin(name);
    } catch (err) {
      const msg = (err as { body?: { message?: string } })?.body?.message;
      setError(msg || "Could not create your profile. Please try again.");
    } finally {
      setPendingName(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        {/* Brand Logo */}
        <div className="brand" aria-label="One Comm">
          <span className="brand-mark" aria-hidden="true">
            o
          </span>
          onecomm
        </div>

        {/* Header Introduction */}
        <div className="login-intro">
          <p className="eyebrow">Welcome back</p>
          <h1 id="login-title">Sign in to your account</h1>
          <p className="login-subtitle">
            Enter your details to access your workspace.
          </p>
        </div>

        {/* Error Message Area */}
        {error && (
          <div className="error-message-area" role="alert" aria-live="polite">
            <svg
              className="error-icon"
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
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {askName ? (
          <form className="login-form" onSubmit={handleNameSubmit} noValidate>
            <p className="login-subtitle">What should we call you?</p>
            <label htmlFor="name">
              Full name
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                disabled={pendingName}
              />
            </label>
            <button type="submit" className="login-submit-btn" disabled={pendingName}>
              {pendingName ? "Saving…" : "Continue"}{" "}
              <span aria-hidden="true">→</span>
            </button>
          </form>
        ) : (
          <>
            {/* Login Form */}
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {/* Email Field */}
              <label htmlFor="email">
                Email address
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  disabled={submitting}
                />
              </label>

              {/* Password Field with Show/Hide Toggle */}
              <label htmlFor="password">
                Password
                <div className="password-input-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    disabled={submitting}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
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
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" x2="22" y1="2" y2="22" />
                      </svg>
                    ) : (
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
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </label>

              {/* Form Options: Remember Me & Forgot Password */}
              <div className="login-form-options">
                <label className="remember-me-label">
                  <input type="checkbox" name="remember" />
                  <span>Remember me</span>
                </label>
                <a href="#forgot-password" className="forgot-password-link">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button type="submit" className="login-submit-btn" disabled={submitting}>
                {submitting ? "Signing in…" : "Sign In"}{" "}
                <span aria-hidden="true">→</span>
              </button>
            </form>

            {/* Footer Prompt */}
            <p className="signup-prompt">
              Don't have an account?{" "}
              <a
                href="#sign-up"
                onClick={(e) => {
                  if (onNavigateToSignup) {
                    e.preventDefault();
                    onNavigateToSignup();
                  }
                }}
              >
                Create an account
              </a>
            </p>
          </>
        )}
      </section>
    </main>
  );
}