export type Theme = 'light' | 'dark';

export const LOCAL_STORAGE_KEY = 'theme';

export const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY) as Theme | null;
    return savedTheme || getSystemTheme();
};

export const getSystemTheme = (): Theme => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const isDarkMode = (): boolean => {
    return getInitialTheme() === 'dark';
}