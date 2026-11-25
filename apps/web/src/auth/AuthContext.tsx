/**
 * AuthContext — single source of truth for the logged-in user.
 *
 * Wraps Supabase auth and exposes:
 *   user, session, userDto (app profile), signOut
 *
 * After every Supabase sign-in / sign-up the profile is guaranteed via
 * POST /users/me (idempotent). AuthContext also loads the profile on
 * session change and handles PROFILE_REQUIRED by creating it when a name
 * is available in user metadata.
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
import { api } from '../lib/api';
import type { UserDto } from '../types';

interface AuthCtx {
  user: User | null;
  session: Session | null;
  userDto: UserDto | null;
  setUserDto: (dto: UserDto | null) => void;
  signOut: () => Promise<void>;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userDto, setUserDto] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (sess: Session | null) => {
    if (!sess?.user) {
      setUserDto(null);
      return;
    }
    try {
      const dto = await api.get<UserDto>('/users/me');
      setUserDto(dto);
    } catch (err: unknown) {
      const code = (err as { body?: { code?: string } })?.body?.code;
      if (code === 'PROFILE_REQUIRED') {
        const name = sess.user.user_metadata?.name;
        if (typeof name === 'string' && name.trim()) {
          try {
            const dto = await api.post<UserDto>('/users/me', { name: name.trim() });
            setUserDto(dto);
            return;
          } catch {
            // fall through
          }
        }
      }
      setUserDto(null);
    }
  };

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      loadProfile(data.session).finally(() => {
        if (mounted) setLoading(false);
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (!newSession) {
        setUserDto(null);
      } else {
        loadProfile(newSession);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshProfile = async () => {
    await loadProfile(session);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserDto(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, session, userDto, setUserDto, signOut, loading, refreshProfile }}
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