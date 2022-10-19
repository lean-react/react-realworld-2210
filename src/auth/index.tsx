import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type AuthContextType = {
  user: string;
  isAuthenticated: boolean;
  signIn: (acc: string, pw: string) => Promise<boolean>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState('');

  async function signIn(acc: string, pw: string) {
    // Todo: real world login
    if (pw === 'secret!') {
      setUser(acc);
      return true;
    }
    return false;
  }

  async function signOut() {
    // Todo: real world logout
    setUser('');
  }

  const initialContext = useMemo(
    (): AuthContextType => ({
      user: user,
      isAuthenticated: user !== '',
      signIn,
      signOut,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={initialContext}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthBoundary() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
