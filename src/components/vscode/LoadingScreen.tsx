'use client';
import { useEffect, useState } from 'react';
import { SquareDashedBottomCode } from 'lucide-react';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);

    // Boot sequence logs for the "Output" panel look
    const bootLogs = [
        "Starting VS Code Server 1.85.1...",
        "Resolving workspace configuration...",
        "Loading extensions...",
        "[Extension] Prettier - Code formatter activated.",
        "[Extension] GitLens - Git supercharged activated.",
        "[Extension] ES7+ React/Redux/React-Native snippets activated.",
        "Connecting to remote environment...",
        "Restoring workbench state...",
        "Initializing language features (TypeScript 5.3.3)...",
        "Starting development server...",
        "ready - started server on 0.0.0.0:3000, url: http://localhost:3000",
        "event - compiled client and server successfully in 1241 ms (154 modules)",
        "wait  - compiling...",
        "event - compiled successfully in 341 ms",
        "Environment Ready."
    ];

    const [currentLogIndex, setCurrentLogIndex] = useState(0);

    useEffect(() => {
        // Progress bar animation
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.random() * 10;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Log sequence animation - faster to match progress
        if (currentLogIndex < bootLogs.length) {
            const timeout = setTimeout(() => {
                setCurrentLogIndex(prev => prev + 1);
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [currentLogIndex, bootLogs.length]);

    useEffect(() => {
        if (progress >= 100) {
            const timeout = setTimeout(() => {
                onComplete();
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [progress, onComplete]);

    return (
        <div className="fixed inset-0 bg-[#1e1e1e] text-[#cccccc] font-mono z-[100] flex flex-col items-center justify-center select-none">

            <div className="w-full max-w-lg p-6">
                {/* Logo & Header */}
                <div className="flex items-center gap-3 mb-8 border-b border-[#333333] pb-4">
                    <SquareDashedBottomCode size={32} className="text-[#007acc]" />
                    <div className="text-lg font-sans font-medium text-[#e1e1e1]">
                        Visual Studio Code
                    </div>
                </div>

                {/* Terminal Boot Sequence */}
                <div className="space-y-2 mb-8 h-48 overflow-hidden flex flex-col justify-end">
                    {bootLogs.slice(0, currentLogIndex + 1).map((log, i) => (
                        <div key={i} className="flex gap-3 text-sm">
                            <span className="text-[#569cd6] shrink-0">➜</span>
                            <span className="text-[#cccccc]">{log}</span>
                            {i === currentLogIndex && progress < 100 && (
                                <span className="animate-pulse text-[#007acc]">_</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-[#2d2d2d] rounded-full overflow-hidden mb-2">
                    <div
                        className="h-full bg-[#007acc] transition-all duration-300 ease-out"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>

                <div className="flex justify-between text-xs text-[#858585] font-sans">
                    <span>Initializing Environment...</span>
                    <span>{Math.round(progress)}%</span>
                </div>
            </div>

        </div>
    );
};

export default LoadingScreen;
