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
    const [currentPath, setCurrentPath] = useState('portfolio');
    const [lines, setLines] = useState<string[]>(['Microsoft Windows [Version 10.0.19045.3693]', '(c) Microsoft Corporation. All rights reserved.', '', `C:\\Users\\Samarth\\${currentPath}>`]);

    // Virtual File System
    const fileSystem: any = {
        'portfolio': {
            type: 'dir',
            children: {
                'src': { type: 'dir', children: {} },
                'public': { type: 'dir', children: {} },
                'README.md': { type: 'file', content: '# My Portfolio\nWelcome to my VS Code themed portfolio!' },
                'package.json': { type: 'file', content: '{\n  "name": "portfolio",\n  "version": "1.0.0"\n}' }
            }
        },
        'src': {
            type: 'dir',
            children: {
                'app': { type: 'dir', children: {} },
                'components': { type: 'dir', children: {} }
            }
        }
    };

    const toggleTerminal = () => setIsOpen(prev => !prev);
    const openTerminal = () => setIsOpen(true);
    const closeTerminal = () => setIsOpen(false);
    const clearTerminal = () => setLines([`C:\\Users\\Samarth\\${currentPath}>`]);

    const runCommand = (command: string) => {
        if (!isOpen) setIsOpen(true);

        // Remove the last line (dangling prompt) and append the command with the prompt
        setLines(prev => {
            const history = prev.slice(0, prev.length - 1);
            return [...history, `C:\\Users\\Samarth\\${currentPath}> ${command}`];
        });

        const args = command.trim().split(' ');
        const cmd = args[0].toLowerCase();

        switch (cmd) {
            case 'help':
                setLines(prev => [...prev,
                    'Available commands:',
                    '  ls        List directory contents',
                    '  cd <dir>  Change directory',
                    '  cat <file> Read file content',
                    '  whoami    Display current user',
                    '  clear     Clear terminal',
                    '  npm start Start development server'
                ]);
                break;
            case 'whoami':
                setLines(prev => [...prev, 'visitor']);
                break;
            case 'clear':
            case 'cls':
                clearTerminal();
                return; // Return early to avoid adding new prompt immediately
            case 'ls':
            case 'dir':
                // Simplified ls for demo
                if (currentPath === 'portfolio') {
                    setLines(prev => [...prev, 'src  public  README.md  package.json']);
                } else if (currentPath === 'src') {
                    setLines(prev => [...prev, 'app  components  data']);
                } else {
                    setLines(prev => [...prev, '']);
                }
                break;
            case 'cd':
                const target = args[1];
                if (!target) break;
                if (target === '..') {
                    setCurrentPath(prev => prev === 'portfolio' ? 'portfolio' : 'portfolio'); // Simple back logic
                } else if (target === 'src' && currentPath === 'portfolio') {
                    setCurrentPath('src');
                } else if (target === 'portfolio') {
                    setCurrentPath('portfolio');
                } else {
                    setLines(prev => [...prev, `The system cannot find the path specified.`]);
                }
                break;
            case 'cat':
                const file = args[1];
                if (file === 'README.md') {
                    setLines(prev => [...prev, '# My Portfolio', 'Welcome to my VS Code themed portfolio!']);
                } else if (file === 'package.json') {
                    setLines(prev => [...prev, '{\n  "name": "portfolio",\n  "version": "1.0.0"\n}']);
                } else {
                    setLines(prev => [...prev, `cat: ${file}: No such file or directory`]);
                }
                break;
            default:
                // Existing server simulation
                const validCommands = [
                    'npm start',
                    './perfolyze --start',
                    'npm start --prefix peer-connect',
                    'go run main.go',
                    'cargo run --release'
                ];

                if (validCommands.some(vc => command.includes(vc)) || command.endsWith('.exe')) {
                    let url = 'https://github.com/samar12-rad';
                    if (command.includes('perfolyze')) url = 'https://github.com/samar12-rad';
                    if (command.includes('peer-connect')) url = 'https://github.com/samar12-rad/peer-connect';
                    if (command.includes('go run')) url = 'https://github.com/samar12-rad';
                    if (command.includes('cargo run')) url = 'https://github.com/samar12-rad';

                    simulateServerStart(url);
                    return;
                } else {
                    if (command.trim() !== '') {
                        setLines(prev => [...prev, `'${command}' is not recognized as an internal or external command.`]);
                    }
                }
                break;
        }

        // Add prompt for next line (unless we returned early)
        if (cmd !== 'clear' && cmd !== 'cls' && !command.includes('npm start') && !command.endsWith('.exe')) {
            setLines(prev => [...prev, '', `C:\\Users\\Samarth\\${currentPath === 'src' ? 'src' : 'portfolio'}>`]);
        }
    };

    const simulateServerStart = (url: string) => {
        const steps = [
            { text: '> project@1.0.0 start', delay: 100 },
            { text: 'info  - Loaded env from .env', delay: 150 },
            { text: '> Starting application...', delay: 200 },
            { text: 'event - compiled client and server successfully', delay: 600 },
            { text: 'wait  - finalizing...', delay: 200 },
            { text: 'SUCCESS_LINK', delay: 200, url: url }
        ];

        let accumulatedTime = 0;
        steps.forEach((step: any) => {
            accumulatedTime += step.delay;
            setTimeout(() => {
                if (step.text === 'SUCCESS_LINK') {
                    setLines(prev => [...prev, `Link Ready: ${step.url} (Ctrl+Click to open)`]);
                    setLines(prev => [...prev, '', `C:\\Users\\Samarth\\${currentPath}>`]); // Correct prompt
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
