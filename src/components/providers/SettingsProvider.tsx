'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SettingsContextType {
    zoomLevel: number; // Percentage, e.g., 100
    setZoomLevel: (level: number) => void;
    animationsEnabled: boolean;
    setAnimationsEnabled: (enabled: boolean) => void;
    showLineNumbers: boolean;
    setShowLineNumbers: (show: boolean) => void;
    updateSettingsFromJson: (json: string) => void; // For the text editor
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

import { useTheme } from './ThemeProvider';

// ... (existing imports)

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [zoomLevel, setZoomLevel] = useState(100);
    const [animationsEnabled, setAnimationsEnabled] = useState(true);
    const [showLineNumbers, setShowLineNumbers] = useState(true);
    const { setTheme } = useTheme();

    // Apply zoom to body
    useEffect(() => {
        document.body.style.zoom = `${zoomLevel}%`;
    }, [zoomLevel]);

    const updateSettingsFromJson = (json: string) => {
        try {
            const parsed = JSON.parse(json);
            if (typeof parsed['window.zoomLevel'] === 'number') setZoomLevel(parsed['window.zoomLevel']);
            if (typeof parsed['editor.animations'] === 'boolean') setAnimationsEnabled(parsed['editor.animations']);
            if (typeof parsed['editor.lineNumbers'] === 'boolean') setShowLineNumbers(parsed['editor.lineNumbers']);

            if (typeof parsed['workbench.colorTheme'] === 'string') {
                const themeMap: Record<string, any> = {
                    "Default Dark Modern": 'vscode-dark',
                    "Visual Studio Dark": 'vscode-dark',
                    "Default Light Modern": 'vscode-light',
                    "Dracula": 'dracula',
                    "GitHub Dark": 'github-dark',
                    "Hacker": 'hacker'
                };
                const themeId = themeMap[parsed['workbench.colorTheme']] || parsed['workbench.colorTheme'];
                // Basic validation to check if it's one of our themes before setting
                if (['vscode-dark', 'vscode-light', 'dracula', 'github-dark', 'hacker'].includes(themeId)) {
                    setTheme(themeId);
                }
            }
        } catch (e) {
            console.error("Invalid JSON settings", e);
        }
    };

    return (
        <SettingsContext.Provider value={{
            zoomLevel, setZoomLevel,
            animationsEnabled, setAnimationsEnabled,
            showLineNumbers, setShowLineNumbers,
            updateSettingsFromJson
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
