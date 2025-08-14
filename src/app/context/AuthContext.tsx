"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface User {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  profissao: string;
  url?: string;
}

interface DbUser extends User {
  password: string;
}

const MOCKED_USERS: DbUser[] = [
  {
    id: "1",
    nome: "João",
    sobrenome: "Silva",
    email: "joao@example.com",
    password: "password123",
    profissao: "Professor",
    url: "https://example.com/joao.jpg",
  },
  {
    id: "2",
    nome: "Maria",
    sobrenome: "Souza",
    email: "maria@example.com",
    password: "password456",
    profissao: "Professor",
    url: "https://example.com/maria.jpg",
  },
];

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  registro: (
    email: string,
    nome: string,
    sobrenome: string,
    senha: string,
    url?: string
  ) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const isAuthenticated = user !== null;

  const login = (email: string, password: string): boolean => {
    const foundUser = MOCKED_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const loggedInUser: User = {
        id: foundUser.id,
        nome: foundUser.nome,
        sobrenome: foundUser.sobrenome,
        email: foundUser.email,
        profissao: foundUser.profissao,
        url: foundUser.url,
      };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return true;
    }

    return false;
  };

  const registro = (
    email: string,
    nome: string,
    sobrenome: string,
    senha: string,
    url?: string
  ): boolean => {
    const emailExists = MOCKED_USERS.some((u) => u.email === email);
    if (emailExists) {
      return false;
    }

    const newUser: DbUser = {
      id: (MOCKED_USERS.length + 1).toString(),
      nome,
      sobrenome,
      email,
      password: senha,
      profissao: "profesor",
      url,
    };

    MOCKED_USERS.push(newUser);

    const registeredUser: User = {
      id: newUser.id,
      nome: newUser.nome,
      sobrenome: newUser.sobrenome,
      email: newUser.email,
      profissao: newUser.profissao,
      url: newUser.url,
    };
    setUser(registeredUser);
    localStorage.setItem("user", JSON.stringify(registeredUser));
    return true;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    registro,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
