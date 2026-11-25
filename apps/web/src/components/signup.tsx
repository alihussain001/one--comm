import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { api } from "../lib/api";
import { useAuth } from "../auth/AuthContext";
import type { UserDto } from "../types";

interface SignUpProps {
  onNavigateToLogin?: () => void;
}

export default function SignUp({ onNavigateToLogin }: SignUpProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUserDto } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [info, setInfo] = useState("");

  const redirectTo = searchParams.get("redirect") || "/";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Full name is required.");
      return;
    }
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
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
    if (!password) {
      setError("Password is required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setInfo("");
    setSubmitting(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { name: name.trim() } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setSubmitting(false);
      return;
    }

    // If a session exists, create the app profile immediately.
    if (data.session) {
      try {
        const dto = await api.post<UserDto>("/users/me", {
          name: name.trim(),
        });
        setUserDto(dto);
        navigate(redirectTo, { replace: true });
      } catch (err) {
        const msg = (err as { body?: { message?: string } })?.body?.message;
        setError(msg || "Account created, but profile setup failed. Please log in.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // No session (email confirmation required).
    setInfo(
      "Account created. Please check your email to confirm, then sign in.",
    );
    setSubmitting(false);
  };

  return (
    <main className="signup-page">
      <section className="signup-card" aria-labelledby="signup-title">
        <div className="brand" aria-label="One Comm">
          <span className="brand-mark" aria-hidden="true">
            o
          </span>
          onecomm
        </div>

        <div className="signup-intro">
          <p className="eyebrow">Get started for free</p>
          <h1 id="signup-title">Create your account</h1>
          <p className="signup-subtitle">
            Join One Comm and keep your conversations in one place.
          </p>
        </div>

        {info && (
          <p className="signup-subtitle" role="status" aria-live="polite">
            {info}
          </p>
        )}

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

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
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
              disabled={submitting}
            />
          </label>
          <label htmlFor="email">
            Email address
            <input
              id="email"
              name="email"
              type="email"
              required
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
          <label htmlFor="password">
            Password
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              disabled={submitting}
            />
          </label>
          <label htmlFor="confirm-password">
            Confirm password
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError("");
              }}
              disabled={submitting}
            />
          </label>

          <button type="submit" disabled={submitting}>
            {submitting ? "Creating account…" : "Create account"}{" "}
            <span aria-hidden="true">→</span>
          </button>
        </form>

        <p className="signin-prompt">
          Already have an account?{" "}
          <a
            href="#sign-in"
            onClick={(e) => {
              if (onNavigateToLogin) {
                e.preventDefault();
                onNavigateToLogin();
              }
            }}
          >
            Sign in
          </a>
        </p>
      </section>
    </main>
  );
}