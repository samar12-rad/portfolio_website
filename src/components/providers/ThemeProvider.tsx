'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeId, themes, fonts } from '../../data/themes';

interface ThemeContextType {
    theme: ThemeId;
    setTheme: (theme: ThemeId) => void;
    cycleTheme: () => void;
    font: string;
    setFont: (fontId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<ThemeId>('tokyo-night');
    const [font, setFont] = useState<string>('inter');

    // Load saved settings
    useEffect(() => {
        const savedTheme = localStorage.getItem('vscode-portfolio-theme') as ThemeId;
        const savedFont = localStorage.getItem('vscode-portfolio-font');

        if (savedTheme && themes.some(t => t.id === savedTheme)) {
            setTheme(savedTheme);
        }
        if (savedFont && fonts.some(f => f.id === savedFont)) {
            setFont(savedFont);
        }
    }, []);

    // Apply Theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('vscode-portfolio-theme', theme);
    }, [theme]);

    // Apply Font
    useEffect(() => {
        const selectedFont = fonts.find(f => f.id === font);
        if (selectedFont) {
            document.documentElement.style.setProperty('--vscode-font-family', selectedFont.variable);
            localStorage.setItem('vscode-portfolio-font', font);
        }
    }, [font]);

    const cycleTheme = () => {
        // Fallback or quick toggle if needed, or remove later
        const currentIndex = themes.findIndex(t => t.id === theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex].id);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, font, setFont }}>
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
