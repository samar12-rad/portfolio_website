'use client';

import { useState, useEffect } from 'react';
import { Smartphone, RotateCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileOrientationSuggestion = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isPortrait, setIsPortrait] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
            const isMobile = window.innerWidth < 768;
            const portrait = window.innerHeight > window.innerWidth;
            setIsPortrait(portrait);

            // Only show if mobile, portrait, and hasn't been dismissed (optional logic, for now just show)
            if (isMobile && portrait) {
                // Check if already dismissed in session
                const dismissed = sessionStorage.getItem('landscape-suggestion-dismissed');
                if (!dismissed) {
                    setIsVisible(true);
                }
            } else {
                setIsVisible(false);
            }
        };

        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        return () => window.removeEventListener('resize', checkOrientation);
    }, []);

    const dismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem('landscape-suggestion-dismissed', 'true');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-4 left-4 right-4 z-50 pointer-events-none"
                >
                    <div className="bg-[#252526] border border-[var(--vscode-border)] text-[var(--vscode-fg)] p-3 rounded-md shadow-lg flex items-center justify-between pointer-events-auto">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Smartphone className="w-5 h-5 text-blue-400" />
                                <RotateCw className="w-3 h-3 text-white absolute -right-1 -bottom-1 bg-[#252526] rounded-full" />
                            </div>
                            <div className="text-sm">
                                <p className="font-semibold text-xs text-gray-300">Better Experience</p>
                                <p className="text-xs opacity-70">Rotate for clearer code connection.</p>
                            </div>
                        </div>
                        <button
                            onClick={dismiss}
                            className="p-1 hover:bg-white/10 rounded-sm transition-colors"
                        >
                            <X className="w-4 h-4 opacity-70" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileOrientationSuggestion;
