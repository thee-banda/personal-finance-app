import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

const ThemeSettings = ({ isOpen, onClose }) => {
  const { darkMode, setTheme, resetToDefault, theme } = useTheme();
  const [showPreview, setShowPreview] = useState(false);

  if (!isOpen) return null;

  const themeOptions = [
    {
      id: 'light',
      name: 'Light Mode',
      icon: '☀️',
      description: 'Clean and bright interface',
      preview: 'bg-white text-gray-900'
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      icon: '🌙',
      description: 'Easy on the eyes',
      preview: 'bg-gray-900 text-gray-100'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Theme Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close theme settings"
          >
            <span className="text-gray-500 dark:text-gray-400">✕</span>
          </button>
        </div>

        {/* Theme Options */}
        <div className="p-6 space-y-4">
          {themeOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => setTheme(option.id === 'dark')}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                darkMode === (option.id === 'dark')
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{option.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {option.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {option.description}
                  </p>
                </div>
                {darkMode === (option.id === 'dark') && (
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>
              
              {/* Preview */}
              {showPreview && (
                <div className={`mt-3 p-3 rounded-lg ${option.preview} transition-all duration-300`}>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  </div>
                  <p className="text-sm mt-2">Preview of {option.name}</p>
                </div>
              )}
            </div>
          ))}

          {/* Preview Toggle */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {showPreview ? 'Hide' : 'Show'} Theme Previews
            </span>
          </button>

          {/* Reset Button */}
          <button
            onClick={resetToDefault}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Reset to Default (Dark)
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Current theme: <span className="font-medium">{theme}</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Your preference is saved automatically
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
