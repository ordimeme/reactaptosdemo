"use client";

import { createContext, useEffect, useState, ReactNode } from "react";

// 定义主题类型
type Theme = 'light' | 'dark' | null;

// 定义上下文类型
interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
}

// 创建上下文时提供初始值
export const ThemeContext = createContext<ThemeContextType>({
  theme: null,
  toggle: () => {},
});

// 定义 Provider 的 props 类型
interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<Theme>(null);

  useEffect(() => {
    const initTheme = () => {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute('theme', savedTheme);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDark ? 'dark' : 'light';
        setTheme(initialTheme);
        document.documentElement.setAttribute('theme', initialTheme);
      }
    };

    initTheme();
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute('theme', newTheme);
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  if (theme === null) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
