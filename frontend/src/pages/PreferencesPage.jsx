import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Waves, Leaf } from 'lucide-react';
import './PreferencesPage.css';

const PreferencesPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="preferences-container">
      <h1 className="page-title">Preferences</h1>
      <p className="page-subtitle">Customize your visual experience</p>

      <div className="section-card glass-panel">
        <h2 className="section-title">Appearance</h2>
        <div className="theme-options">
          <button
            className={`theme-card ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => toggleTheme('dark')}
          >
            <div className="theme-preview dark">
              <div className="preview-nav"></div>
              <div className="preview-content">
                <div className="preview-line"></div>
                <div className="preview-line"></div>
              </div>
            </div>
            <div className="theme-info">
              <Moon size={18} />
              <span>Dark Mode</span>
            </div>
          </button>

          <button
            className={`theme-card ${theme === 'light' ? 'active' : ''}`}
            onClick={() => toggleTheme('light')}
          >
            <div className="theme-preview light">
              <div className="preview-nav"></div>
              <div className="preview-content">
                <div className="preview-line"></div>
                <div className="preview-line"></div>
              </div>
            </div>
            <div className="theme-info">
              <Sun size={18} />
              <span>Light Mode</span>
            </div>
          </button>

          <button
            className={`theme-card ${theme === 'ocean' ? 'active' : ''}`}
            onClick={() => toggleTheme('ocean')}
          >
            <div className="theme-preview ocean">
              <div className="preview-nav"></div>
              <div className="preview-content">
                <div className="preview-line"></div>
                <div className="preview-line"></div>
              </div>
            </div>
            <div className="theme-info">
              <Waves size={18} />
              <span>Ocean Indigo</span>
            </div>
          </button>

          <button
            className={`theme-card ${theme === 'emerald' ? 'active' : ''}`}
            onClick={() => toggleTheme('emerald')}
          >
            <div className="theme-preview emerald">
              <div className="preview-nav"></div>
              <div className="preview-content">
                <div className="preview-line"></div>
                <div className="preview-line"></div>
              </div>
            </div>
            <div className="theme-info">
              <Leaf size={18} />
              <span>Emerald City</span>
            </div>
          </button>
        </div>
      </div>


    </div>
  );
};

export default PreferencesPage;
