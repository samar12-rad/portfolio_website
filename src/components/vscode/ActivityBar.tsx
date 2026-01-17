'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Files, Search, GitGraph, SquareDashedBottomCode, User, Settings, Palette } from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';
import { useState } from 'react';

import SearchPalette from './SearchPalette';

interface ActivityBarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  activeView?: string;
  setActiveView?: (view: string) => void;
  onShowCommandPalette?: (mode?: 'commands' | 'themes' | 'fonts') => void;
}

const ActivityBar = ({ onToggleSidebar, isSidebarOpen, activeView, setActiveView, onShowCommandPalette }: ActivityBarProps) => {
  const { theme } = useTheme();
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // State for search modal

  // Easter Egg Toast State
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'error' | 'warning' } | null>(null);

  const showToast = (message: string, type: 'info' | 'error' | 'warning' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleGitClick = () => {
    showToast("Error: .git folder hidden by dark magic. (Check GitHub link in profile instead!)", "error");
  };

  const handleExtensionsClick = () => {
    showToast("Extension Marketplace unavailable. Please upgrade to Portfolio Pro™ (Just kidding).", "warning");
  };

  const handleSettingsClick = () => {
    if (onShowCommandPalette) onShowCommandPalette('commands');
  };

  const handleThemeClick = () => {
    if (onShowCommandPalette) onShowCommandPalette('themes');
  };

  return (
    <>
      {/* Easter Egg Toast Notification */}
      {toast && (
        <div className="fixed bottom-10 right-10 z-[100] bg-[#252526] text-white px-4 py-3 rounded shadow-2xl border-l-4 border-blue-500 animate-slide-in flex items-center gap-3">
          {toast.type === 'error' && <div className="text-red-500">✖</div>}
          {toast.type === 'warning' && <div className="text-yellow-500">⚠</div>}
          {toast.type === 'info' && <div className="text-blue-500">ℹ</div>}
          <span className="text-sm font-sans">{toast.message}</span>
        </div>
      )}

      <SearchPalette isOpen={showSearch} onClose={() => setShowSearch(false)} />

      {/* Profile Modal Overlay */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowProfile(false)}>
          <div
            className="bg-[var(--vscode-sidebar-bg)] border border-[var(--vscode-border)] shadow-2xl rounded-lg p-6 w-80 text-[var(--vscode-fg)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-white"
            >
              ✕
            </button>

            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-[var(--vscode-status-bar)] overflow-hidden border-4 border-[var(--vscode-bg)] shadow-lg relative">
                <Image src="/new_pfp.jpeg" fill className="object-cover" alt="Profile" />
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">&lt;Samarth Vaidya /&gt;</div>
                <div className="text-sm opacity-70">Software Engineer</div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="border-t border-[var(--vscode-border)] my-4"></div>
              <a href="https://github.com/samar12-rad" target="_blank" className="flex items-center p-3 hover:bg-[var(--vscode-hover)] rounded transition-colors gap-3">
                <GitGraph size={18} />
                <span>GitHub Profile</span>
              </a>
              <a href="https://linkedin.com/in/samarth-vaidya" target="_blank" className="flex items-center p-3 hover:bg-[var(--vscode-hover)] rounded transition-colors gap-3">
                <User size={18} />
                <span>LinkedIn</span>
              </a>
              <a href="mailto:v.samarth1212@gmail.com" className="flex items-center p-3 hover:bg-[var(--vscode-hover)] rounded transition-colors gap-3">
                <Settings size={18} />
                <span>Contact Me</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <div id="activity-bar-container" className="w-12 h-full bg-[var(--vscode-activity-bar-bg)] flex flex-col items-center py-2 justify-between flex-shrink-0 z-20 border-r border-[var(--vscode-border)] transition-colors relative">
        <div className="flex flex-col gap-4">
          <div
            className={`p-2 border-l-2 cursor-pointer hover:bg-[var(--vscode-hover)] transition-colors ${activeView === 'explorer' && isSidebarOpen ? 'border-[var(--vscode-fg)] opacity-100' : 'border-transparent opacity-60'}`}
            onClick={() => {
              if (setActiveView) setActiveView('explorer');
              if (onToggleSidebar && (!isSidebarOpen || activeView === 'explorer')) onToggleSidebar();
              if (isSidebarOpen && activeView !== 'explorer' && setActiveView) setActiveView('explorer');
            }}
            title="Explorer (Ctrl+Shift+E)"
            id="activity-bar-explorer"
          >
            <Files size={24} className="text-[var(--vscode-fg)]" />
          </div>
          <div
            className={`p-2 border-l-2 cursor-pointer hover:bg-[var(--vscode-hover)] transition-colors ${activeView === 'search' && isSidebarOpen ? 'border-[var(--vscode-fg)] opacity-100' : 'border-transparent opacity-60'}`}
            onClick={() => {
              if (setActiveView) setActiveView('search');
              if (onToggleSidebar && (!isSidebarOpen || activeView === 'search')) onToggleSidebar();
              if (isSidebarOpen && activeView !== 'search' && setActiveView) setActiveView('search');
            }}
            title="Search (Ctrl+Shift+F)"
            id="activity-bar-search"
          >
            <Search size={24} className="text-[var(--vscode-fg)]" />
          </div>
          <div
            className={`p-2 border-l-2 cursor-pointer hover:bg-[var(--vscode-hover)] transition-colors ${activeView === 'source-control' && isSidebarOpen ? 'border-[var(--vscode-fg)] opacity-100' : 'border-transparent opacity-60'}`}
            onClick={() => {
              if (setActiveView) setActiveView('source-control');
              if (onToggleSidebar && (!isSidebarOpen)) onToggleSidebar();
            }}
            title="Source Control (Ctrl+Shift+G)"
            id="activity-bar-source-control"
          >
            <GitGraph size={24} className="text-[var(--vscode-fg)]" />
          </div>
          <div
            className={`p-2 border-l-2 cursor-pointer hover:bg-[var(--vscode-hover)] transition-colors ${activeView === 'extensions' && isSidebarOpen ? 'border-[var(--vscode-fg)] opacity-100' : 'border-transparent opacity-60'}`}
            onClick={() => {
              if (setActiveView) setActiveView('extensions');
              if (onToggleSidebar && (!isSidebarOpen)) onToggleSidebar();
            }}
            title="Extensions (Ctrl+Shift+X)"
            id="activity-bar-extensions"
          >
            <SquareDashedBottomCode size={24} className="text-[var(--vscode-fg)]" />
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-2">
          {/* Theme Toggle */}
          <div
            className="p-2 cursor-pointer hover:bg-[var(--vscode-hover)] opacity-60 hover:opacity-100 relative group"
            onClick={handleThemeClick}
            title="Change Color Theme"
            id="activity-bar-theme"
          >
            <Palette size={24} className="text-[var(--vscode-fg)]" />
          </div>

          {/* Profile Trigger */}
          <div className="relative">
            <div
              className="p-2 cursor-pointer hover:bg-[var(--vscode-hover)] opacity-60 hover:opacity-100"
              onClick={() => setShowProfile(true)}
              id="activity-bar-profile"
            >
              <User size={24} className="text-[var(--vscode-fg)]" />
            </div>
          </div>

          <div
            className="p-2 cursor-pointer hover:bg-[var(--vscode-hover)] opacity-60 hover:opacity-100"
            onClick={handleSettingsClick}
            title="Settings"
            id="activity-bar-settings"
          >
            <Settings size={24} className="text-[var(--vscode-fg)]" />
          </div>
        </div>
      </div >
    </>
  );
};

export default ActivityBar;


