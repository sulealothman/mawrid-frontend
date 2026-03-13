import { useState, useEffect } from 'react';
import { getInitialTheme, LOCAL_STORAGE_KEY, Theme } from '../utils/retreiveTheme';

export function useTheme() {
  
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
        document.querySelector('html')!.classList.remove('light', 'dark');
        document.querySelector('html')!.classList.add(theme);
        localStorage.setItem(LOCAL_STORAGE_KEY, theme);
    }
  }, [theme]);

  const toggleTheme = (newTheme?: Theme) => {
    setTheme(newTheme || (theme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}
