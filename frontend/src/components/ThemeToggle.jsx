import { useTheme } from '../contexts/ThemeContext';
import { useState, useEffect } from 'react';

const ThemeToggle = ({ size = 'default', showLabel = false, variant = 'button' }) => {
  const { darkMode, toggleTheme, isLoading } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    
    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  // Size variants
  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    default: 'w-10 h-10 text-base',
    large: 'w-12 h-12 text-lg',
    xl: 'w-14 h-14 text-xl'
  };

  // Variant styles
  const variantClasses = {
    button: `relative overflow-hidden rounded-lg border-2 transition-all duration-300 ease-in-out
             ${darkMode 
               ? 'border-gray-600 bg-gray-800 hover:bg-gray-700 hover:border-gray-500' 
               : 'border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400'
             }
             ${isAnimating ? 'scale-95' : 'scale-100 hover:scale-105'}
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
             ${darkMode ? 'dark:focus:ring-offset-gray-900' : 'focus:ring-offset-white'}
             shadow-sm hover:shadow-md`,
    
    switch: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ease-in-out
             ${darkMode ? 'bg-blue-600' : 'bg-gray-200'}
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
             ${darkMode ? 'dark:focus:ring-offset-gray-900' : 'focus:ring-offset-white'}`,
    
    minimal: `relative p-2 rounded-full transition-all duration-300 ease-in-out
              ${darkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${darkMode ? 'dark:focus:ring-offset-gray-900' : 'focus:ring-offset-white'}`,
    
    card: `relative p-4 rounded-xl border transition-all duration-300 ease-in-out
           ${darkMode 
             ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' 
             : 'border-gray-200 bg-white hover:bg-gray-50'
           }
           ${isAnimating ? 'scale-95' : 'scale-100 hover:scale-105'}
           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
           ${darkMode ? 'dark:focus:ring-offset-gray-900' : 'focus:ring-offset-white'}
           shadow-sm hover:shadow-md cursor-pointer`
  };

  const iconClasses = `transition-all duration-300 ease-in-out ${
    isAnimating ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
  }`;

  if (variant === 'switch') {
    return (
      <div className="flex items-center space-x-3">
        {showLabel && (
          <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {darkMode ? 'Dark' : 'Light'}
          </span>
        )}
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={variantClasses.switch}
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out ${
              darkMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div
        onClick={handleToggle}
        className={variantClasses.card}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
        aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
      >
        <div className="flex items-center space-x-3">
          <div className={`${sizeClasses[size]} flex items-center justify-center`}>
            <span className={iconClasses}>
              {darkMode ? '🌙' : '☀️'}
            </span>
          </div>
          {showLabel && (
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Click to switch
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {showLabel && (
        <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {darkMode ? 'Dark' : 'Light'}
        </span>
      )}
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`${variantClasses[variant]} ${sizeClasses[size]} flex items-center justify-center`}
        title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
      >
        <span className={iconClasses}>
          {darkMode ? '🌙' : '☀️'}
        </span>
        
        {/* Ripple effect */}
        {isAnimating && (
          <span className="absolute inset-0 rounded-lg bg-blue-500 opacity-20 animate-ping" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
