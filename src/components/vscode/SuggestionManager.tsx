'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, MousePointerClick } from 'lucide-react';
import { useTerminal } from '../providers/TerminalProvider';
import { suggestions, Suggestion } from '../../data/suggestions';

interface SuggestionManagerProps {
    onOpenCommandPalette: (mode?: 'commands' | 'themes' | 'fonts') => void;
    onToggleSidebar: () => void;
    onSwitchView: (view: string) => void;
    activeView: string;
}

const SuggestionManager = ({ onOpenCommandPalette, onToggleSidebar, onSwitchView, activeView }: SuggestionManagerProps) => {
    const [currentSuggestion, setCurrentSuggestion] = useState<Suggestion | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const { toggleTerminal } = useTerminal();

    useEffect(() => {
        // Initial delay to not overwhelm on load
        const initialTimer = setTimeout(() => {
            triggerSuggestion();
        }, 10000); // 10 seconds after load

        // Periodic timer (every 1 minute)
        const interval = setInterval(() => {
            triggerSuggestion();
        }, 60000); // 1 minute

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    // Effect to handle element flashing
    useEffect(() => {
        if (!currentSuggestion?.elementId) return;

        const element = document.getElementById(currentSuggestion.elementId);
        if (element) {
            element.classList.add('flash-highlight');
        }

        return () => {
            if (element) {
                element.classList.remove('flash-highlight');
            }
        };
    }, [currentSuggestion]);

    // Focus Mode Effect
    useEffect(() => {
        if (currentSuggestion?.elementId && isHovered) {
            // Elevate the entire Activity Bar container
            const activityBar = document.getElementById('activity-bar-container');
            if (activityBar) activityBar.classList.add('z-elevated');

            // Add specific highlight to target if needed (already has flash-highlight)
        } else {
            const activityBar = document.getElementById('activity-bar-container');
            if (activityBar) activityBar.classList.remove('z-elevated');
        }

        return () => {
            const activityBar = document.getElementById('activity-bar-container');
            if (activityBar) activityBar.classList.remove('z-elevated');
        };
    }, [isHovered, currentSuggestion]);

    const triggerSuggestion = () => {
        // Get already seen suggestions from localStorage
        const seenIds = JSON.parse(localStorage.getItem('vscode-portfolio-seen-suggestions') || '[]');
        const lastShownId = seenIds.length > 0 ? seenIds[seenIds.length - 1] : null;

        // Find a suggestion that hasn't been seen yet, or recycle if all seen
        const available = suggestions.filter(s => !seenIds.includes(s.id));

        let nextSuggestion: Suggestion;

        if (available.length > 0) {
            nextSuggestion = available[Math.floor(Math.random() * available.length)];
        } else {
            // Fallback: Pick any suggestion EXCEPT the last one shown to avoid immediate repeats
            const retryPool = suggestions.filter(s => s.id !== lastShownId);
            nextSuggestion = retryPool[Math.floor(Math.random() * retryPool.length)];
        }

        setCurrentSuggestion(nextSuggestion);

        // Mark as seen (append to list)
        // If list gets too long, maybe we should limit it? For now, infinite is fine for small count.
        if (!seenIds.includes(nextSuggestion.id)) {
            localStorage.setItem('vscode-portfolio-seen-suggestions', JSON.stringify([...seenIds, nextSuggestion.id]));
        } else {
            // Even if seen, update the last shown 'pointer' effectively by just ensuring we track it?
            // Actually, if we just rely on seenIds, we might not know the REAL last shown if we are recycling.
            // Let's explicitly store 'last-shown' separately or update the list logic?
            // Simpler: Just rely on seenIds for uniqueness. If recycling, we might need a separate 'last-shown' key 
            // OR just append duplicates to seenIds if we want a history? 
            // Better: update a separate key 'vscode-portfolio-last-suggestion-id'.
        }
        localStorage.setItem('vscode-portfolio-last-suggestion-id', nextSuggestion.id);

        // Auto dismiss after 12 seconds
        setTimeout(() => {
            // Only dismiss if not hovered
            if (!isHovered) {
                setCurrentSuggestion(null);
            }
        }, 12000);
    };

    const handleAction = () => {
        if (!currentSuggestion) return;

        const { action } = currentSuggestion;

        switch (action.type) {
            case 'commandPalette':
                onOpenCommandPalette(action.payload as any);
                break;
            case 'toggleSidebar':
                onToggleSidebar();
                break;
            case 'toggleTerminal':
                toggleTerminal();
                break;
            case 'switchView':
                if (action.payload) {
                    // Logic to expand all if already on explorer
                    if (action.payload === 'explorer' && activeView === 'explorer') {
                        window.dispatchEvent(new Event('vscode:expand-explorer'));
                    } else {
                        onSwitchView(action.payload);
                        onToggleSidebar(); // Ensure sidebar is open
                    }
                }
                break;
        }

        // Close after action
        setIsHovered(false);
        setCurrentSuggestion(null);
    };

    const closeSuggestion = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setIsHovered(false);
        setCurrentSuggestion(null);
    };

    return (
        <AnimatePresence>
            {isHovered && currentSuggestion && <div className="focus-mode-backdrop" />}

            {currentSuggestion && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    onClick={handleAction}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="fixed bottom-10 right-10 z-[100] w-80 bg-[var(--vscode-notifications-bg)] text-[var(--vscode-fg)] border border-[var(--vscode-notifications-border)] shadow-2xl rounded-md overflow-hidden cursor-pointer hover:bg-[var(--vscode-hover)] transition-colors group"
                    style={{ backgroundColor: '#252526', borderColor: '#454545' }} // Fallback/Hardcoded for now
                >
                    <div className="flex p-4 gap-3 items-start relative">
                        <div className="text-blue-400 mt-1">
                            <Lightbulb size={18} />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1 text-white">Did you know?</h4>
                            <p className="text-xs text-gray-300 leading-relaxed mb-2">
                                {currentSuggestion.text}
                            </p>
                            <div className="flex items-center gap-1 text-[10px] text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MousePointerClick size={10} />
                                <span>Click to try</span>
                            </div>
                        </div>
                        <button
                            onClick={closeSuggestion}
                            className="text-gray-400 hover:text-white transition-colors p-1"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 12, ease: "linear" }}
                        className="h-1 bg-blue-500/50"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SuggestionManager;
