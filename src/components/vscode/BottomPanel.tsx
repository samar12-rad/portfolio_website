'use client';
import { useState } from 'react';
import { Terminal as TerminalIcon, AlertTriangle, FileText, Bug } from 'lucide-react'; // Renamed import to avoid conflict
import { motion } from 'framer-motion';
import Terminal from './Terminal';
import ProblemsView from './ProblemsView';
import OutputView from './OutputView';
import { useTerminal } from '../providers/TerminalProvider';

const BottomPanel = () => {
    const [activeTab, setActiveTab] = useState<'TERMINAL' | 'OUTPUT' | 'PROBLEMS' | 'DEBUG'>('TERMINAL');
    const { isOpen, toggleTerminal } = useTerminal();

    const tabs = [
        { id: 'PROBLEMS', label: 'PROBLEMS', icon: <AlertTriangle size={12} /> },
        { id: 'OUTPUT', label: 'OUTPUT', icon: <FileText size={12} /> },
        { id: 'DEBUG', label: 'DEBUG CONSOLE', icon: <Bug size={12} /> },
        { id: 'TERMINAL', label: 'TERMINAL', icon: <TerminalIcon size={12} /> },
    ];

    const handleTabClick = (tabId: typeof activeTab) => {
        if (!isOpen) {
            toggleTerminal(); // Open if closed
            setActiveTab(tabId);
        } else if (activeTab === tabId) {
            toggleTerminal(); // Close if clicking active tab
        } else {
            setActiveTab(tabId); // Switch tab
        }
    };

    return (
        <div
            className={`flex flex-col bg-[var(--vscode-bg)] border-t border-[var(--vscode-border)] transition-all duration-300 ease-in-out ${isOpen ? 'h-72' : 'h-9'}`}
        >
            {/* Tab Header */}
            <div className="flex items-center h-9 px-4 border-b border-[var(--vscode-border)] select-none shrink-0 bg-[var(--vscode-bg)]">
                <div className="flex items-center gap-6 h-full">
                    {tabs.map((tab) => (
                        <div
                            key={tab.id}
                            className={`h-full flex items-center gap-1.5 border-t-2 text-[11px] font-bold cursor-pointer hover:text-[var(--vscode-fg)] transition-colors ${activeTab === tab.id && isOpen ? 'border-[var(--vscode-fg)] text-[var(--vscode-fg)]' : 'border-transparent text-gray-500'}`}
                            onClick={() => handleTabClick(tab.id as any)}
                        >
                            <span>{tab.label}</span>
                            {tab.id === 'PROBLEMS' && <span className="bg-[var(--vscode-status-bar)] text-white text-[9px] px-1 rounded-full">3</span>}
                        </div>
                    ))}
                </div>

                {/* Right controls */}
                <div className="ml-auto flex items-center gap-2">
                    <button onClick={toggleTerminal} className="text-gray-500 hover:text-white transition-colors p-1 rounded hover:bg-[var(--vscode-hover)]">
                        {isOpen ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className={`flex-1 overflow-hidden relative ${!isOpen ? 'hidden' : ''}`}>
                {/* 
                   We render Terminal always but hide it if not active to preserve state/history.
                   Other views can be unmounted or hidden.
                 */}
                <div className={`h-full w-full ${activeTab === 'TERMINAL' ? 'block' : 'hidden'}`}>
                    <Terminal />
                </div>

                {activeTab === 'PROBLEMS' && <ProblemsView />}
                {activeTab === 'OUTPUT' && <OutputView />}
                {activeTab === 'DEBUG' && <div className="p-4 text-xs opacity-50 font-mono">No debuggers attached.</div>}
            </div>
        </div>
    );
};

export default BottomPanel;
