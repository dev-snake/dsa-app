export type ThemeType = 'light' | 'dark';
export type LanguageType = 'vi' | 'en';

export interface AppProviderProps {
    children: React.ReactNode;
}

export interface AppContextType {
    theme: ThemeType;
    toggleTheme: () => void;
    language: LanguageType;
    setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>;
}
