import { useState } from "react";
import { supabase } from "../lib/supabase";

interface SignUpProps {
  onNavigateToLogin?: () => void;
}

export default function SignUp({ onNavigateToLogin }: SignUpProps) {
  const [error, setError] = useState("");

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

        <form
          className="signup-form"
          onSubmit={async (event) => {
            event.preventDefault();

            const form = event.currentTarget;
            const formData = new FormData(form);

            const name = formData.get("name");
            const email = formData.get("email");
            const password = formData.get("password");
            const confirmPassword = formData.get("confirmPassword");

            if (
              typeof name !== "string" ||
              typeof email !== "string" ||
              typeof password !== "string" || 
              typeof confirmPassword !== "string"
            ) {
              setError("Invalid form data");
              return;
            }

            if (password !== confirmPassword) {
              setError("Incorrect Password");
              return;
            }

            
            setError("");
            
            
              // const {data, error} = await supabase.auth.signInWithPassword({
              //   email,
              //   password
              // })
            
            const { data, error } = await supabase.auth.signUp({
              email,
              password,
            });


            console.log({
              name,
              email,
              data,
              error,
            });
            // console.log("Session", data.session);
            // console.log("JWT", data.session?.access_token);
            // console.log("Error", error);
          }}
        >
          <label htmlFor="name">
            Full name
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Jane Doe"
              autoComplete="name"
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
            />
            {error && <p className="error-txt">{error}</p>}
          </label>
          <button type="submit">
            Create account <span aria-hidden="true">→</span>
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
