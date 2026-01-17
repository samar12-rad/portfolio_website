'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, Terminal, Palette, FileText, ArrowRight, Layout, Trash2, Type, Check, Command as CommandIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../providers/ThemeProvider';
import { useTerminal } from '../providers/TerminalProvider';
import { themes, fonts } from '../../data/themes';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
    toggleSidebar: () => void;
    initialMode?: PaletteMode;
}

type PaletteMode = 'commands' | 'themes' | 'fonts';

const CommandPalette = ({ isOpen, onClose, toggleSidebar, initialMode = 'commands' }: CommandPaletteProps) => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [mode, setMode] = useState<PaletteMode>('commands');

    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { setTheme, setFont, theme: currentTheme, font: currentFont } = useTheme();
    const { clearTerminal, toggleTerminal } = useTerminal();

    // Reset when opening
    useEffect(() => {
        if (isOpen && inputRef.current) {
            // Small timeout to ensure DOM is ready for focus
            setTimeout(() => {
                inputRef.current?.focus();
            }, 10);
            setQuery(initialMode === 'commands' ? '>' : '');
            setMode(initialMode);
            setSelectedIndex(0);
        }
    }, [isOpen, initialMode]);

    // Define Base Commands w/ Shortcuts
    const baseCommands = [
        {
            id: 'about', label: 'Go to About Me', icon: <FileText size={18} />,
            shortcut: 'Alt+A',
            action: () => router.push('/about')
        },
        {
            id: 'projects', label: 'Go to Projects', icon: <FileText size={18} />,
            shortcut: 'Alt+P',
            action: () => router.push('/projects')
        },
        {
            id: 'theme.picker', label: 'Preferences: Color Theme', icon: <Palette size={18} />,
            shortcut: 'Ctrl+K T',
            action: () => {
                setMode('themes');
                setQuery('');
                setSelectedIndex(0);
            }
        },
        {
            id: 'font.picker', label: 'Preferences: Font Family', icon: <Type size={18} />,
            shortcut: '',
            action: () => {
                setMode('fonts');
                setQuery('');
                setSelectedIndex(0);
            }
        },
        {
            id: 'view.toggleSidebar', label: 'View: Toggle Sidebar', icon: <Layout size={18} />,
            shortcut: 'Ctrl+B',
            action: () => toggleSidebar()
        },
        {
            id: 'terminal.toggle', label: 'Terminal: Toggle Integrated Terminal', icon: <Terminal size={18} />,
            shortcut: 'Ctrl+J',
            action: () => toggleTerminal()
        },
        {
            id: 'terminal.clear', label: 'Terminal: Clear', icon: <Trash2 size={18} />,
            shortcut: '',
            action: () => clearTerminal()
        },
    ];

    // Filter Logic
    const getFilteredItems = () => {
        const lowerQuery = query.toLowerCase().replace(/^>/, '').trim();

        if (mode === 'themes') {
            return themes.filter(t => t.label.toLowerCase().includes(lowerQuery)).map(t => ({
                id: t.id,
                label: t.label,
                icon: <div className={`w-4 h-4 rounded-full ${t.type === 'dark' ? 'bg-gray-700' : 'bg-white border border-gray-400'}`}></div>,
                shortcut: '',
                action: () => {
                    setTheme(t.id);
                    onClose();
                },
                current: t.id === currentTheme
            }));
        }

        if (mode === 'fonts') {
            return fonts.filter(f => f.label.toLowerCase().includes(lowerQuery)).map(f => ({
                id: f.id,
                label: f.label,
                icon: <Type size={18} />,
                shortcut: '',
                action: () => {
                    setFont(f.id);
                    onClose();
                },
                current: f.id === currentFont
            }));
        }

        return baseCommands.filter(cmd =>
            cmd.label.toLowerCase().includes(lowerQuery)
        );
    };

    const filteredItems = getFilteredItems();

    // Scroll Logic
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (itemRefs.current[selectedIndex]) {
            itemRefs.current[selectedIndex]?.scrollIntoView({
                block: 'nearest',
                behavior: 'smooth'
            });
        }
    }, [selectedIndex]);

    // Keyboard Handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'Escape') {
                if (mode !== 'commands') {
                    setMode('commands');
                    setQuery('>');
                    setSelectedIndex(0);
                } else {
                    onClose();
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredItems.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const item = filteredItems[selectedIndex];
                if (item) {
                    // @ts-ignore
                    item.action();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredItems, selectedIndex, onClose, mode]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh]" onClick={onClose}>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="w-full max-w-2xl bg-[#252526] border border-[#454545] shadow-2xl rounded-xl overflow-hidden flex flex-col relative mx-4"
                        onClick={e => e.stopPropagation()}
                        style={{ maxHeight: '60vh', boxShadow: '0 10px 50px -12px rgba(0, 0, 0, 0.5)' }}
                    >
                        {/* Header / Input */}
                        <div className="flex items-center p-3 border-b border-[#333333]">
                            <div className="px-2 text-gray-400">
                                {mode === 'commands' ? <ArrowRight size={18} /> : mode === 'themes' ? <Palette size={18} /> : <Type size={18} />}
                            </div>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder={mode === 'commands' ? "Type a command..." : mode === 'themes' ? "Select a Color Theme..." : "Select a Font..."}
                                className="flex-1 bg-transparent border-none outline-none text-[var(--vscode-fg)] placeholder-gray-500 font-sans text-lg h-8 ml-1"
                                value={query}
                                onChange={e => {
                                    setQuery(e.target.value);
                                    setSelectedIndex(0);
                                }}
                            />
                            {mode !== 'commands' && (
                                <div className="text-xs px-2 py-1 bg-blue-600/20 text-blue-400 rounded border border-blue-600/30">
                                    {mode === 'themes' ? 'Themes' : 'Fonts'}
                                </div>
                            )}
                        </div>

                        {/* List */}
                        <div className="overflow-y-auto flex-1 py-2 scrollbar-thin scrollbar-thumb-gray-700">
                            {filteredItems.length === 0 ? (
                                <div className="p-8 text-center text-gray-400">
                                    <p className="text-sm">No matching results.</p>
                                </div>
                            ) : (
                                <div className="space-y-0.5 px-2">
                                    {filteredItems.map((item, index) => (
                                        <div
                                            key={item.id}
                                            ref={el => { itemRefs.current[index] = el; }}
                                            className={`flex items-center justify-between px-3 py-2.5 rounded-md cursor-pointer transition-colors duration-75 group ${index === selectedIndex
                                                ? 'bg-[#062f4a] text-white'
                                                : 'hover:bg-[#2a2d2e] text-[var(--vscode-fg)]'
                                                }`}
                                            onClick={() => {
                                                // @ts-ignore
                                                item.action();
                                            }}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            role="button"
                                            tabIndex={0}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`flex items-center justify-center w-5 ${index === selectedIndex ? 'text-white' : 'text-gray-400'}`}>
                                                    {item.icon}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className={`text-sm ${index === selectedIndex ? 'font-medium' : ''}`}>
                                                        {item.label}
                                                    </span>
                                                    {/* Optional description support could go here */}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {/* @ts-ignore */}
                                                {item.shortcut && (
                                                    <span className={`text-xs ${index === selectedIndex ? 'text-gray-300' : 'text-gray-500'}`}>
                                                        {/* @ts-ignore */}
                                                        {item.shortcut}
                                                    </span>
                                                )}
                                                {/* @ts-ignore - 'current' prop check */}
                                                {item.current && <Check size={16} className={index === selectedIndex ? "text-white" : "text-blue-400"} />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer Hint */}
                        <div className="px-4 py-1.5 bg-[#1e1e1e] border-t border-[#333333] flex justify-between items-center text-[10px] text-gray-500 select-none">
                            <div className="flex gap-4">
                                <span><span className="font-mono bg-[#333] px-1 rounded text-gray-300">Enter</span> to select</span>
                                <span><span className="font-mono bg-[#333] px-1 rounded text-gray-300">↑↓</span> to navigate</span>
                                <span><span className="font-mono bg-[#333] px-1 rounded text-gray-300">Esc</span> to close</span>
                            </div>
                            <div>
                                VS Code Portfolio
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
