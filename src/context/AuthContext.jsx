import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

/**
 * Normalise a Supabase User into the shape the rest of the app expects.
 * Never includes a password.
 */
function normalizeUser(supabaseUser) {
  if (!supabaseUser) return null;
  const meta = supabaseUser.user_metadata || {};
  return {
    id:       supabaseUser.id,
    email:    supabaseUser.email,
    username: meta.username  || supabaseUser.email?.split('@')[0] || '',
    fullName: meta.full_name || meta.fullName || '',
    gender:   meta.gender    || '',
  };
}

export function AuthProvider({ children }) {
  // undefined = not yet resolved; null = resolved, no session
  const [session, setSession] = useState(undefined);
  const [user,    setUser]    = useState(undefined);

  useEffect(() => {
    // Restore existing session on mount
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setUser(normalizeUser(data.session?.user ?? null));
    });

    // Keep state in sync with auth events (token refresh, sign-out, other tabs)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null);
      setUser(normalizeUser(newSession?.user ?? null));
    });

    return () => subscription.unsubscribe();
  }, []);

  const loading = session === undefined;

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout error:', error.message);
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
