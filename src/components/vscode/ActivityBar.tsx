'use client';
import Link from 'next/link';
import { Files, Search, GitGraph, SquareDashedBottomCode, User, Settings, Palette } from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';
import { useState } from 'react';

import SearchPalette from './SearchPalette';

const ActivityBar = () => {
  const { setTheme, theme, cycleTheme } = useTheme();
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // State for search modal

  const toggleTheme = () => {
    cycleTheme();
  };

  return (
    <>
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
              <div className="w-20 h-20 rounded-full bg-[var(--vscode-status-bar)] flex items-center justify-center text-white text-2xl font-bold border-4 border-[var(--vscode-bg)] shadow-lg">
                <User size={40} />
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">Samarth Vaidya</div>
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

      <div className="w-12 h-full bg-[var(--vscode-activity-bar-bg)] flex flex-col items-center py-2 justify-between flex-shrink-0 z-20 border-r border-[var(--vscode-border)] transition-colors relative">
        <div className="flex flex-col gap-4">
          <Link href="/" className="p-2 border-l-2 border-[var(--vscode-fg)] cursor-pointer hover:bg-[var(--vscode-hover)] opacity-100">
            <Files size={24} className="text-[var(--vscode-fg)]" />
          </Link>
          <div
            className="p-2 border-l-2 border-transparent cursor-pointer hover:bg-[var(--vscode-hover)] opacity-60 hover:opacity-100"
            onClick={() => setShowSearch(true)}
            title="Search Projects (Ctrl+Shift+F)"
          >
            <Search size={24} className="text-[var(--vscode-fg)]" />
          </div>
          <div className="p-2 border-l-2 border-transparent cursor-pointer hover:bg-[var(--vscode-hover)] opacity-60 hover:opacity-100">
            <GitGraph size={24} className="text-[var(--vscode-fg)]" />
          </div>
          <div className="p-2 border-l-2 border-transparent cursor-pointer hover:bg-[var(--vscode-hover)] opacity-60 hover:opacity-100">
            <SquareDashedBottomCode size={24} className="text-[var(--vscode-fg)]" />
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-2">
          {/* Theme Toggle */}
          <div
            className="p-2 cursor-pointer hover:bg-[var(--vscode-hover)] opacity-60 hover:opacity-100 relative group"
            onClick={toggleTheme}
            title={`Current Theme: ${theme} (Click to Switch)`}
          >
            <Palette size={24} className="text-[var(--vscode-fg)]" />
          </div>

          {/* Profile Trigger */}
          <div className="relative">
            <div
              className="p-2 cursor-pointer hover:bg-[var(--vscode-hover)] opacity-60 hover:opacity-100"
              onClick={() => setShowProfile(true)}
            >
              <User size={24} className="text-[var(--vscode-fg)]" />
            </div>
          </div>

          <div className="p-2 cursor-pointer hover:bg-[var(--vscode-hover)] opacity-60 hover:opacity-100">
            <Settings size={24} className="text-[var(--vscode-fg)]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityBar;


