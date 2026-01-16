'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [bootStep, setBootStep] = useState(0);
    const [showMatrix, setShowMatrix] = useState(false);

    // Boot sequence logs
    const bootLogs = [
        "Initializing BIOS...",
        "Checking CPU... OK",
        "Checking RAM... 32GB OK",
        "Loading Kernel...",
        "Mounting Filesystems...",
        "Starting VS Code Environment...",
        "Loading Extensions...",
        "Connect to server... SUCCESS"
    ];

    useEffect(() => {
        // Step 1: Print boot logs line by line
        if (bootStep < bootLogs.length) {
            const timeout = setTimeout(() => {
                setBootStep(prev => prev + 1);
            }, 100 + Math.random() * 200); // Random typing speed
            return () => clearTimeout(timeout);
        } else if (!showMatrix) {
            // Step 2: Switch to Matrix effect after logs
            const timeout = setTimeout(() => {
                setShowMatrix(true);
            }, 500);
            return () => clearTimeout(timeout);
        } else {
            // Step 3: Finish loading after Matrix effect runs briefly
            const timeout = setTimeout(() => {
                onComplete();
            }, 2000); // Run matrix for 2 seconds
            return () => clearTimeout(timeout);
        }
    }, [bootStep, showMatrix, bootLogs.length, onComplete]);

    return (
        <div className="fixed inset-0 bg-black text-[#00ff41] font-mono z-[100] flex flex-col items-center justify-center overflow-hidden">
            {!showMatrix ? (
                <div className="w-full max-w-2xl p-8">
                    <div className="text-xl mb-4 font-bold border-b border-[#00ff41] pb-2">SYSTEM BOOT SEQUENCE_</div>
                    <div className="space-y-1">
                        {bootLogs.slice(0, bootStep).map((log, i) => (
                            <div key={i} className="flex">
                                <span className="mr-4 text-gray-500">[{new Date().toLocaleTimeString()}]</span>
                                <span>{log}</span>
                            </div>
                        ))}
                        <div className="animate-pulse">_</div>
                    </div>
                </div>
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                    {/* Simple Matrix Rain Effect via CSS/divs or just a centered loading message with flair */}
                    <div className="text-center animate-pulse">
                        <div className="text-6xl font-bold mb-4 glitch-effect" data-text="ACCESS GRANTED">ACCESS GRANTED</div>
                        <div className="text-xl opacity-80">Loading Portfolio Environment...</div>
                    </div>
                    {/* Matrix background characters (simulated) */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute text-[#00ff41] text-xs animate-matrix-rain"
                                style={{
                                    left: `${i * 5}%`,
                                    animationDuration: `${1 + Math.random()}s`,
                                    animationDelay: `${Math.random() * 2}s`
                                }}
                            >
                                {Array.from({ length: 30 }).map(() => String.fromCharCode(33 + Math.random() * 93)).join('').split('').join('\n')}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoadingScreen;
