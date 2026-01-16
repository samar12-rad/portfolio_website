"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ActivityBar from '../vscode/ActivityBar';
import Sidebar from '../vscode/Sidebar'; // Keep Sidebar import if used elsewhere or remove if not needed directly
import StatusBar from '../vscode/StatusBar';
import { usePathname, useRouter } from 'next/navigation';
import TitleBar from './TitleBar';
import ResizableLayout from './ResizableLayout';
import LoadingScreen from '../vscode/LoadingScreen';
import Terminal from '../vscode/Terminal';
import { useTabs } from '../providers/TabProvider';
import MobileOrientationSuggestion from '@/components/common/MobileOrientationSuggestion';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const getFileName = (path: string) => {
        if (path.includes('/readme')) return 'README.md';
        if (path.includes('/run')) return 'EXE';
        if (path.includes('/code')) return 'main.tsx';
        switch (path) {
            case '/': return 'README.md';
            case '/about': return 'about.html';
            case '/projects': return 'projects.tsx';
            case '/contact': return 'contact.css';
            default: return 'unknown';
        }
    };

    const fileName = getFileName(pathname);
    const { tabs, activeTab, setActiveTab, closeTab } = useTabs();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            // Only consider it mobile if width is small AND it's portrait.
            // If it's landscape (even if small), user wants desktop UI.
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
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="flex flex-col h-screen w-screen bg-[var(--vscode-bg)] text-[var(--vscode-fg)] overflow-hidden">
            {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

            <MobileOrientationSuggestion />

            <TitleBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile} />

            {/* Top Section */}
            <div className="flex flex-1 overflow-hidden">
                {!isLoading && !isMobile && (
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                    >
                        <ActivityBar />
                    </motion.div>
                )}

                {!isLoading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="flex-1 flex overflow-hidden w-full"
                    >
                        <ResizableLayout
                            isMobile={isMobile}
                            sidebarOpen={sidebarOpen}
                            onSidebarClose={() => setSidebarOpen(false)}
                        >
                            {/* Editor Area */}
                            <div className="flex-1 flex flex-col min-w-0 bg-[var(--vscode-bg)] h-full">
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
                                <div className="h-6 bg-[var(--vscode-bg)] flex items-center px-4 text-xs text-gray-500 gap-1 select-none">
                                    <span>src</span> <span>&gt;</span> <span>pages</span> <span>&gt;</span> <span>{fileName}</span>
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
                                    </div>
                                </div>
                            </div>
                        </ResizableLayout>
                    </motion.div>
                )}
            </div>

            <Terminal />

            {/* Bottom Section */}
            {!isLoading && (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                >
                    <StatusBar />
                </motion.div>
            )}
        </div>
    );
};

export default MainLayout;
