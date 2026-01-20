'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type HighlightContextType = {
    highlight: (id: string) => void;
    clear: () => void;
};

const HighlightContext = createContext<HighlightContextType | undefined>(undefined);

export const HighlightProvider = ({ children }: { children: React.ReactNode }) => {
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    const highlight = useCallback((id: string) => {
        // Only allow highlighting on desktop
        if (typeof window !== 'undefined' && window.innerWidth > 768) {
            const element = document.getElementById(id);
            if (element) {
                const rect = element.getBoundingClientRect();
                setTargetRect(rect);
            }
        }
    }, []);

    const clear = useCallback(() => setTargetRect(null), []);

    // Handle window resize to clear or update rect
    useEffect(() => {
        const handleResize = () => setTargetRect(null);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <HighlightContext.Provider value={{ highlight, clear }}>
            {children}
            <AnimatePresence>
                {targetRect && (
                    <>
                        {/* Overlay: Constructed of 4 divs to form a 'hole' around the target */}
                        {/* Top */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed bg-black/70 z-[9999] top-0 left-0 w-full pointer-events-none"
                            style={{ height: targetRect.top }}
                        />
                        {/* Bottom */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed bg-black/70 z-[9999] left-0 w-full bottom-0 pointer-events-none"
                            style={{ top: targetRect.bottom }}
                        />
                        {/* Left */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed bg-black/70 z-[9999] left-0 pointer-events-none"
                            style={{ top: targetRect.top, height: targetRect.height, width: targetRect.left }}
                        />
                        {/* Right */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed bg-black/70 z-[9999] right-0 pointer-events-none"
                            style={{ top: targetRect.top, height: targetRect.height, left: targetRect.right }}
                        />

                        {/* Glow Border around the target */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed z-[10000] pointer-events-none rounded-sm"
                            style={{
                                top: targetRect.top - 4, // Slight padding
                                left: targetRect.left - 4,
                                width: targetRect.width + 8,
                                height: targetRect.height + 8,
                                boxShadow: '0 0 0 4px rgba(0, 122, 204, 0.8), 0 0 20px 4px rgba(0, 122, 204, 0.5)',
                            }}
                        />
                    </>
                )}
            </AnimatePresence>
        </HighlightContext.Provider>
    );
};

export const useHighlight = () => {
    const context = useContext(HighlightContext);
    if (!context) {
        throw new Error('useHighlight must be used within a HighlightProvider');
    }
    return context;
};
