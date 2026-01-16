'use client';
import { useRef, useEffect } from 'react';
import { X, ChevronUp, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { useTerminal } from '@/components/providers/TerminalProvider';
import { motion, AnimatePresence } from 'framer-motion';

const Terminal = () => {
    const { isOpen, closeTerminal, lines, clearTerminal } = useTerminal();
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when lines change
    useEffect(() => {
        if (isOpen && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [lines, isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 200, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="h-64 bg-[#1e1e1e] border-t border-[var(--vscode-border)] flex flex-col text-sm font-mono z-50 shadow-2xl fixed bottom-0 left-0 right-0"
                >
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e] border-b border-[#333] select-none text-[#cccccc] text-xs uppercase tracking-wide">
                        <div className="flex gap-6">
                            <span className="cursor-pointer border-b mb-[-9px] pb-2 border-[#e7e7e7] text-white font-bold">TERMINAL</span>
                            <span className="cursor-pointer hover:text-white opacity-60">OUTPUT</span>
                            <span className="cursor-pointer hover:text-white opacity-60">DEBUG CONSOLE</span>
                            <span className="cursor-pointer hover:text-white opacity-60">PROBLEMS</span>
                        </div>
                        <div className="flex items-center gap-3 opacity-70">
                            <Plus size={14} className="cursor-pointer hover:text-white" />
                            <Trash2 size={14} className="cursor-pointer hover:text-white" onClick={clearTerminal} />
                            <ChevronUp size={14} className="cursor-pointer hover:text-white" />
                            <X size={14} className="cursor-pointer hover:text-white hover:bg-red-500 rounded-sm" onClick={closeTerminal} />
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1">
                        {lines.map((line, i) => (
                            <div key={i} className="text-[#cccccc] whitespace-pre-wrap break-all">
                                {line.startsWith('Link Ready:') ? (
                                    <span>
                                        Link Ready: <a
                                            href={line.split('Link Ready: ')[1].split(' (')[0]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 underline cursor-pointer hover:text-blue-300"
                                        >
                                            {line.split('Link Ready: ')[1].split(' (')[0]}
                                        </a> (Ctrl+Click to open)
                                    </span>
                                ) : line.includes('C:\\Users') ? (
                                    <span>{line}</span>
                                ) : (
                                    <span className="opacity-90">{line}</span>
                                )}
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Terminal;
