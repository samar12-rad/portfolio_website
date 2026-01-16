'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TerminalContextType {
    isOpen: boolean;
    toggleTerminal: () => void;
    openTerminal: () => void;
    closeTerminal: () => void;
    runCommand: (command: string) => void;
    lines: string[];
    clearTerminal: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const TerminalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [lines, setLines] = useState<string[]>(['Microsoft Windows [Version 10.0.19045.3693]', '(c) Microsoft Corporation. All rights reserved.', '', 'C:\\Users\\Samarth\\portfolio>']);

    const toggleTerminal = () => setIsOpen(prev => !prev);
    const openTerminal = () => setIsOpen(true);
    const closeTerminal = () => setIsOpen(false);
    const clearTerminal = () => setLines(['C:\\Users\\Samarth\\portfolio>']);

    const runCommand = (command: string) => {
        if (!isOpen) setIsOpen(true);
        setLines(prev => [...prev, `C:\\Users\\Samarth\\portfolio> ${command}`]);

        // Simulate server start logic (moved from Terminal.tsx)
        const validCommands = [
            'npm start',
            './perfolyze --start',
            'npm start --prefix peer-connect',
            'go run main.go',
            'cargo run --release'
        ];

        if (validCommands.some(cmd => command.includes(cmd)) || command.endsWith('.exe')) {
            let url = 'https://github.com/samar12-rad';
            if (command.includes('perfolyze')) url = 'https://github.com/samar12-rad';
            if (command.includes('peer-connect')) url = 'https://github.com/samar12-rad/peer-connect';
            if (command.includes('go run')) url = 'https://github.com/samar12-rad'; // TT Management
            if (command.includes('cargo run')) url = 'https://github.com/samar12-rad'; // Envoy

            simulateServerStart(url);
        } else {
            setTimeout(() => {
                setLines(prev => [...prev, `'${command}' is not recognized as an internal or external command.`]);
                setLines(prev => [...prev, '', 'C:\\Users\\Samarth\\portfolio>']);
            }, 500);
        }
    };

    const simulateServerStart = (url: string) => {
        const steps = [
            { text: '> project@1.0.0 start', delay: 200 },
            { text: '> Starting production server...', delay: 600 },
            { text: 'ready - started server on 0.0.0.0:3000, url: http://localhost:3000', delay: 1500 },
            { text: 'info  - Loaded env from .env', delay: 1800 },
            { text: 'event - compiled client and server successfully', delay: 2800 },
            { text: 'SUCCESS_LINK', delay: 3500, url: url }
        ];

        let accumulatedTime = 0;
        steps.forEach((step: any) => {
            accumulatedTime += step.delay;
            setTimeout(() => {
                if (step.text === 'SUCCESS_LINK') {
                    setLines(prev => [...prev, `Link Ready: ${step.url} (Ctrl+Click to open)`]);
                    setLines(prev => [...prev, '', 'C:\\Users\\Samarth\\portfolio>']);
                } else {
                    setLines(prev => [...prev, step.text]);
                }
            }, accumulatedTime);
        });
    };

    return (
        <TerminalContext.Provider value={{ isOpen, toggleTerminal, openTerminal, closeTerminal, runCommand, lines, clearTerminal }}>
            {children}
        </TerminalContext.Provider>
    );
};

export const useTerminal = () => {
    const context = useContext(TerminalContext);
    if (context === undefined) {
        throw new Error('useTerminal must be used within a TerminalProvider');
    }
    return context;
};
