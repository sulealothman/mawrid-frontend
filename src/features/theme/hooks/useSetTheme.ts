import { LOCAL_STORAGE_KEY, Theme } from '../utils/retreiveTheme';

export function useSetTheme() {
  

  const setTheme = (newTheme: Theme) => {
    const isDarkMode = newTheme === 'dark';
    document.querySelector('html')!.classList.remove('light', 'dark');
    if(isDarkMode) document.querySelector('html')!.classList.add('dark');
    localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
  };

  return { setTheme };
}
