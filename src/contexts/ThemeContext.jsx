import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // default → dark
    return true;
  });

  const [isLoading, setIsLoading] = useState(true);

  // Apply theme
  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';

    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = darkMode ? '#1f2937' : '#3b82f6';
    }

    localStorage.setItem('theme', theme);

    // smooth transition
    document.documentElement.style.setProperty(
      '--theme-transition',
      'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    );

    setIsLoading(false);
  }, [darkMode]);

  // Listen system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleTheme = () => setDarkMode((prev) => !prev);
  const setTheme = (isDark) => setDarkMode(isDark);
  const resetToDefault = () => {
    localStorage.removeItem('theme');
    setDarkMode(true); // fallback default
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        isLoading,
        toggleTheme,
        setTheme,
        resetToDefault,
        theme: darkMode ? 'dark' : 'light',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
