'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2, Terminal, Info } from 'lucide-react';

const RecruiterPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup after a short delay on initial load
        // Check if already seen to avoid annoyance? Use sessionStorage for session-only persistence or just show every time as requested "on opening of website".
        // Requirement says "Create a popup dialog on opening of website". I'll default to always showing it for now, or maybe session storage.
        // Let's use session storage so it doesn't pop up on every refresh if they are just navigating around, but does if they close the tab and come back.
        const hasSeen = sessionStorage.getItem('seen_recruiter_popup');
        if (!hasSeen) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('seen_recruiter_popup', 'true');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full max-w-lg bg-[#1e1e1e] border border-[#007acc] rounded-lg shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 bg-[#252526] border-b border-[#333]">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Info className="text-[#007acc]" size={24} />
                                Welcome!
                            </h2>
                            <button
                                onClick={handleClose}
                                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            <p className="text-gray-300 text-lg leading-relaxed">
                                You've landed on my <strong>Interactive Developer Portfolio</strong>.
                            </p>

                            <div className="bg-[#2d2d2d] p-4 rounded-md border-l-4 border-[#007acc]">
                                <p className="text-sm text-gray-300">
                                    This entire website is a functional web application designed to mimic <strong>Visual Studio Code</strong>—the editor I use every day.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-white font-semibold flex items-center gap-2">
                                    <Code2 size={18} className="text-[#E6B422]" />
                                    What you can do here:
                                </h3>
                                <ul className="list-disc pl-6 space-y-1 text-gray-400 text-sm">
                                    <li>Navigate files in the <strong>Explorer</strong> sidebar.</li>
                                    <li>Open and read project <code>README.md</code> files.</li>
                                    <li>Use the <strong>Terminal</strong> (Ctrl+`) to run commands.</li>
                                    <li>View my actual code and project structure.</li>
                                </ul>
                            </div>

                            <p className="text-gray-400 text-xs italic mt-4">
                                * No actual code was harmed in the making of this portfolio.
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-[#252526] border-t border-[#333] flex justify-end">
                            <button
                                onClick={handleClose}
                                className="px-6 py-2 bg-[#007acc] hover:bg-[#005a9e] text-white rounded-sm font-medium transition-colors text-sm"
                            >
                                Got it, let me explore!
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RecruiterPopup;
