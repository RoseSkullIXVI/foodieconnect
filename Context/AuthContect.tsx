import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

interface AuthContextType {
  userToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullname: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("acc_tok");
        if (token) {
          setUserToken(token);
        }
      } catch (error) {
        console.error("Error loading token:", error);
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("http://192.168.10.153:3000/auth/login", {
        email,
        password,
      });

      if (response.data.access_token) {
        await SecureStore.setItemAsync("acc_tok", response.data.access_token);
        setUserToken(response.data.access_token);
      }
    } catch (err) {
      throw new Error("Invalid credentials, please try again.");
    }finally{
        setLoading(false)
    }
  };

  const signup = async (email: string, password: string, fullname: string, username: string) => {
    setLoading(true);
    try {
      const response = await axios.post("http://192.168.10.153:3000/auth/register", {
        fullname,
        username,
        email,
        password,
      });

      if (response.data.access_token) {
        await SecureStore.setItemAsync("acc_tok", response.data.access_token);
        setUserToken(response.data.access_token);
      }
    } catch (error) {
      throw new Error("Error signing up. Please try again.");
    }finally{
        setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("acc_tok");
      setUserToken(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
