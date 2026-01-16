'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'vscode-dark' | 'vscode-light' | 'dracula' | 'github-dark' | 'hacker';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('hacker');

    useEffect(() => {
        const savedTheme = localStorage.getItem('vscode-portfolio-theme') as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('vscode-portfolio-theme', theme);
    }, [theme]);

    const cycleTheme = () => {
        const themes: Theme[] = ['hacker', 'vscode-dark', 'vscode-light', 'dracula', 'github-dark'];
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
