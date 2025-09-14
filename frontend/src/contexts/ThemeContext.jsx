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
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Default to dark theme
    return true;
  });

  const [isLoading, setIsLoading] = useState(true);

  // Apply theme to document
  useEffect(() => {
    const applyTheme = () => {
      const theme = darkMode ? 'dark' : 'light';
      
      // Remove any existing theme classes
      document.documentElement.classList.remove('dark', 'light');
      
      // Add the current theme class
      if (darkMode) {
        document.documentElement.classList.add('dark');
      }
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.content = darkMode ? '#1f2937' : '#3b82f6';
      }
      
      // Save to localStorage
      localStorage.setItem('theme', theme);
      
      // Update CSS custom properties for smooth transitions
      document.documentElement.style.setProperty('--theme-transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)');
      
      setIsLoading(false);
    };

    applyTheme();
  }, [darkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if no theme is saved in localStorage
      if (!localStorage.getItem('theme')) {
        setDarkMode(true); // Keep dark as default
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  const setTheme = (isDark) => {
    setDarkMode(isDark);
  };

  const resetToDefault = () => {
    localStorage.removeItem('theme');
    setDarkMode(true);
  };

  const value = {
    darkMode,
    isLoading,
    toggleTheme,
    setTheme,
    resetToDefault,
    theme: darkMode ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
