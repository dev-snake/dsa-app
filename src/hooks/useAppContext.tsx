import React, { createContext, useContext } from 'react';
import { useState } from 'react';
import { AppContextType, LanguageType, ThemeType } from '@/types/app';
interface AppProviderProps {
    children: React.ReactNode;
}
export const AppContext = createContext<AppContextType>({
    theme: 'light',
    toggleTheme: () => {},
    language: 'vi',
    setLanguage: () => {},
});
export const AppProvider = ({ children }: AppProviderProps) => {
    const [theme, setTheme] = useState<ThemeType>('light');
    const [language, setLanguage] = useState<LanguageType>('vi');
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    const value = { theme, toggleTheme, language, setLanguage };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = () => useContext(AppContext);
