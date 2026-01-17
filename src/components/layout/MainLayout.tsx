"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ActivityBar from '../vscode/ActivityBar';
import SidebarManager from '../vscode/SidebarManager';
import StatusBar from '../vscode/StatusBar';
import { usePathname, useRouter } from 'next/navigation';
import TitleBar from './TitleBar';
import ResizableLayout from './ResizableLayout';
import LoadingScreen from '../vscode/LoadingScreen';
import BottomPanel from '../vscode/BottomPanel';
import { useTabs } from '../providers/TabProvider';
import { useTerminal } from '../providers/TerminalProvider';
import MobileOrientationSuggestion from '@/components/common/MobileOrientationSuggestion';
import CommandPalette from '../vscode/CommandPalette';
import Minimap from '../vscode/Minimap';
import ContextMenu from '@/components/vscode/ContextMenu';
import SuggestionManager from '../vscode/SuggestionManager';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const getFileName = (path: string) => {
        if (path.includes('/readme')) return 'README.md';
        if (path.includes('/run')) return 'EXE';
        if (path.includes('/code')) return 'main.tsx';
        switch (path) {
            case '/': return 'README.md';
            case '/guide': return 'handbook.md';
            case '/about': return 'about.html';
            case '/projects': return 'projects.tsx';
            case '/contact': return 'contact.css';
            default: return 'unknown';
        }
    };

    const fileName = getFileName(pathname);
    const { tabs, activeTab, setActiveTab, closeTab } = useTabs();

    // Terminal Context used for toggling
    const { isOpen: isTerminalOpen, toggleTerminal } = useTerminal();

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // New Feature State
    const [activeSidebarView, setActiveSidebarView] = useState('explorer');
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [commandPaletteMode, setCommandPaletteMode] = useState<'commands' | 'themes' | 'fonts'>('commands');

    const handleOpenCommandPalette = (mode: 'commands' | 'themes' | 'fonts' = 'commands') => {
        setCommandPaletteMode(mode);
        setShowCommandPalette(true);
    };

    useEffect(() => {
        const checkMobile = () => {
            // ... existing code ...
            const isPortrait = window.innerHeight > window.innerWidth;
            const mobile = window.innerWidth < 768 && isPortrait;

            setIsMobile(mobile);
            if (!mobile) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Keyboard Shortcuts
        const handleKeyDown = (e: KeyboardEvent) => {
            // Toggle Sidebar: Ctrl+B
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
                e.preventDefault();
                setSidebarOpen(prev => !prev);
            }
            // Toggle Terminal: Ctrl+J (or Ctrl+` in VS Code, but J is common too)
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
                e.preventDefault();
                toggleTerminal();
            }
            // Command Palette: Ctrl+Shift+P
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
                e.preventDefault();
                handleOpenCommandPalette('commands');
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [toggleTerminal]);

    const toggleSidebar = () => setSidebarOpen(prev => !prev);

    return (
        <div className="flex flex-col h-screen w-screen bg-[var(--vscode-bg)] text-[var(--vscode-fg)] overflow-hidden">
            {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

            <MobileOrientationSuggestion />

            <SuggestionManager
                onOpenCommandPalette={handleOpenCommandPalette}
                onToggleSidebar={toggleSidebar}
                onSwitchView={setActiveSidebarView}
            />

            <CommandPalette
                isOpen={showCommandPalette}
                onClose={() => setShowCommandPalette(false)}
                toggleSidebar={toggleSidebar}
                initialMode={commandPaletteMode}
            />

            <TitleBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile} />
            <ContextMenu onOpenCommandPalette={() => handleOpenCommandPalette('commands')} />

            {/* Top Section */}
            <div className="flex flex-1 overflow-hidden">
                {!isLoading && !isMobile && (
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }} // Step 1: Activity Bar
                        className="h-full"
                    >
                        <ActivityBar
                            onToggleSidebar={toggleSidebar}
                            isSidebarOpen={sidebarOpen}
                            activeView={activeSidebarView}
                            setActiveView={setActiveSidebarView}
                            onShowCommandPalette={handleOpenCommandPalette}
                        />
                    </motion.div>
                )}

                {!isLoading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.99 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 }} // Step 2: Sidebar & Editor
                        className="flex-1 flex overflow-hidden w-full"
                    >
                        <ResizableLayout
                            isMobile={isMobile}
                            sidebarOpen={sidebarOpen}
                            onSidebarClose={() => setSidebarOpen(false)}
                            sidebarContent={<SidebarManager activeView={activeSidebarView} />}
                        >
                            {/* Editor Area */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.8 }} // Step 3: Editor Content specific
                                className="flex-1 flex flex-col min-w-0 bg-[var(--vscode-bg)] h-full"
                            >
                                {/* Tab Bar */}
                                <div className="h-9 bg-[var(--vscode-tab-inactive-bg)] flex items-center overflow-x-auto border-b border-[var(--vscode-border)] select-none">
                                    {tabs.map(tab => (
                                        <div
                                            key={tab.path}
                                            onClick={() => { setActiveTab(tab.path); router.push(tab.path); }}
                                            className={`px-3 py-2 border-t-2 text-[var(--vscode-fg)] flex items-center gap-2 min-w-fit text-sm cursor-pointer hover:bg-[var(--vscode-tab-active-bg)] ${activeTab === tab.path ? 'bg-[var(--vscode-tab-active-bg)] border-[var(--vscode-status-bar)]' : 'bg-transparent border-transparent opacity-80'}`}
                                        >
                                            <span className="text-blue-400">#</span>
                                            <span>{tab.name}</span>
                                            <span
                                                className="ml-2 opacity-60 hover:opacity-100 hover:bg-white/20 rounded-sm p-0.5"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    closeTab(tab.path);
                                                }}
                                            >
                                                x
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Breadcrumbs */}
                                <div className="h-6 bg-[var(--vscode-bg)] flex items-center px-4 text-xs text-[var(--vscode-fg)] gap-1 select-none overflow-hidden">
                                    <div className="flex items-center hover:bg-[var(--vscode-hover)] px-1 rounded cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                                        <span>portfolio</span>
                                    </div>
                                    <span className="opacity-50">&gt;</span>
                                    <div className="flex items-center hover:bg-[var(--vscode-hover)] px-1 rounded cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                                        <span>src</span>
                                    </div>
                                    <span className="opacity-50">&gt;</span>
                                    {pathname === '/' ? (
                                        <div className="flex items-center hover:bg-[var(--vscode-hover)] px-1 rounded cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                                            <span>README.md</span>
                                        </div>
                                    ) : (
                                        pathname.split('/').filter(Boolean).map((segment, index, array) => (
                                            <div key={segment} className="flex items-center">
                                                <div className="flex items-center hover:bg-[var(--vscode-hover)] px-1 rounded cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                                                    <span>{segment}</span>
                                                </div>
                                                {index < array.length - 1 && <span className="opacity-50 mx-1">&gt;</span>}
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-auto p-0 relative scrollbar-hide">
                                    <div className="flex min-h-full">
                                        <div className="w-12 flex flex-col items-end pr-6 text-[#858585] select-none text-xs leading-6 pt-4 bg-[var(--vscode-bg)] font-mono border-r border-[#333333]/50">
                                            {Array.from({ length: 50 }).map((_, i) => (
                                                <div key={i}>{i + 1}</div>
                                            ))}
                                        </div>
                                        <div className="flex-1 p-4">
                                            {children}
                                        </div>
                                        {/* Minimap positioned absolutely on the right */}
                                        <div className="sticky top-0 right-0 h-full">
                                            <Minimap />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </ResizableLayout>
                    </motion.div>
                )}
            </div>

            {!isLoading && (
                <BottomPanel />
            )}

            {/* Bottom Section */}
            {!isLoading && (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.3 }} // Step 5: Status Bar
                >
                    <StatusBar />
                </motion.div>
            )}
        </div>
    );
};

export default MainLayout;
