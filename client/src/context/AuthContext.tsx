// Manages user authentication state forr the entire app
// "Context" in React is a way to store data globally without passing props dowm through every component (props drilling)

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../types";
import toast from "react-hot-toast";
import api from "../services/api";

// AuthContext stores:
// 1. The current logged-in user (or null if not logged-in)
// 2. Login/Logout/Register functions
// 3. Loading state while checking authentication

// ----Define what the context will provide----
// This interface describes all the values/functions AuthContext shares
interface AuthContextType {
  user: User | null; // null if not logged in
  loading: boolean; // True while checking localStorage on mount
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void; // Update user data locally
}

// Create the context with undefined as default value
// (The real value is provided by AuthProvider)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ----AuthProvider Component----
// Wrap your app in this to make auth data available everywhere
interface AuthProviderProps {
  children: ReactNode; //  Everything nested inside <AuthProvider>
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // User state - null means not logged-in
  const [user, setUser] = useState<User | null>(null);

  // True while we check localStorage on app load
  const [loading, setLoading] = useState<boolean>(true);

  //   ----Load userfrom localStorage on app start----
  // localStorage persists data across browser sessions (survives page refresh)
  useEffect(() => {
    const userStr = localStorage.getItem("audiophile-user");

    if (userStr) {
      try {
        const savedUser: User = JSON.parse(userStr);
        setUser(savedUser);
      } catch (error) {
        // if JSON parse fails (corrupted data), clear it
        localStorage.removeItem("audiophile-user");
      }
    }

    setLoading(false);
  }, []);

  //   ----Login----
  // Returns true if login succeeded, false if it failed
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // POST /api/auth/login
      const { data } = await api.post<User>("/auth/login", { email, password });

      //   Save user to state and localStorage
      setUser(data);
      localStorage.setItem("audiophile-user", JSON.stringify(data));

      toast.success(`Welcome back, ${data.name}! 🎧`);
      return true;
    } catch (error: any) {
      // error.response?.data?.message is the message from our Express server
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return false;
    }
  };

  //   ----Register----
  // Returns true if registration succeeded, false if it failed
  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const { data } = await api.post<User>("/auth/register", {
        name,
        email,
        password,
      });

      setUser(data);
      localStorage.setItem("audiophile-user", JSON.stringify(data));

      toast.success(`Welcome to Audiophile, ${data.name}! 🎧`);
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return false;
    }
  };

  //   ----Logout----
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem("audiophile-user");
    toast.success("Logged out successfully");
  };

  //   ----Update user(local only)----
  //   Used after profile update - refreshes data in context without re-fetching
  const updateUser = (updatedData: Partial<User>): void => {
    if (user) {
      const updated = { ...user, ...updatedData };
      setUser(updated);
      localStorage.setItem("audiophile-user", JSON.stringify(updated));
    }
  };

  //   ----Provide the context values to all children----
  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ----Custom hook for AUTHCONTEXT----
// This hook makes it easy to use AuthContext in any component:
// const {user, login, logout, etc} = useAuth()
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  //   Safety check - useAuth must be used inside AuthProvider
  if (!context) {
    throw new Error("useAuth must used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
