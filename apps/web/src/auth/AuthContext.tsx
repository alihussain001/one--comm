/**
 * AuthContext — single source of truth for the logged-in user.
 *
 * Wraps Supabase auth and exposes:
 *   user, session, userDto (app profile), signOut
 *
 * After every Supabase sign-in / sign-up the caller is responsible for
 * calling POST /users/me to guarantee an app profile exists.
 */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { UserDto } from '../types';

interface AuthCtx {
  user: User | null;
  session: Session | null;
  userDto: UserDto | null;
  setUserDto: (dto: UserDto | null) => void;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userDto, setUserDto] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (!newSession) setUserDto(null); // cleared on sign-out
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserDto(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, session, userDto, setUserDto, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
