'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, RefreshCw, ExternalLink, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectRunnerProps {
    title: string;
    startCommand: string;
    successMessage: string;
    previewUrl?: string; // Optional URL to open actual project
}

const ProjectRunner = ({ title, startCommand, successMessage, previewUrl }: ProjectRunnerProps) => {
    const [status, setStatus] = useState<'idle' | 'running' | 'success'>('idle');
    const [logs, setLogs] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    const runProject = () => {
        if (status === 'running') return;

        setStatus('running');
        setLogs([`> ${startCommand}`]);

        const steps = [
            'Initializing build environment...',
            'Resolving dependencies...',
            'Compiling modules...',
            'Optimizing production build...',
            'Verifying integrity...',
            successMessage
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < steps.length) {
                const step = steps[i];
                // Add random delay logic visually
                setLogs(prev => [...prev, step]);
                i++;
            } else {
                clearInterval(interval);
                setStatus('success');
            }
        }, 800);
    };

    return (
        <div className="h-full flex flex-col p-6 max-w-4xl mx-auto font-sans text-[var(--vscode-fg)]">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                    <Terminal className="text-blue-400" />
                    Run: {title}
                </h1>
                <p className="opacity-70">Simulate local development environment.</p>
            </header>

            <div className="w-full aspect-video bg-[#1e1e1e] border border-[#333] rounded-lg overflow-hidden flex flex-col shadow-2xl mx-auto">
                {/* Toolbar */}
                <div className="h-10 bg-[#2d2d2d] border-b border-[#333] flex items-center px-4 justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-xs font-mono opacity-50">bash — 80x24</div>
                </div>

                {/* Terminal Output */}
                <div
                    ref={scrollRef}
                    className="flex-1 p-4 font-mono text-sm overflow-y-auto space-y-2 text-gray-300"
                >
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`${i === 0 ? 'text-yellow-300 font-bold' : ''} ${log === successMessage ? 'text-green-400 font-bold' : ''}`}
                        >
                            {log}
                        </motion.div>
                    ))}
                    {status === 'running' && (
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="w-2 h-4 bg-gray-400 inline-block align-middle ml-1"
                        />
                    )}
                </div>

                {/* Action Bar */}
                <div className="p-4 bg-[#252526] border-t border-[#333] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={runProject}
                            disabled={status === 'running'}
                            className={`flex items-center gap-2 px-6 py-2 rounded font-semibold transition-all ${status === 'running'
                                ? 'bg-gray-600 cursor-not-allowed opacity-50'
                                : 'bg-green-600 hover:bg-green-500 text-white shadow-lg hover:shadow-green-500/20'
                                }`}
                        >
                            {status === 'running' ? <RefreshCw className="animate-spin w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                            {status === 'running' ? 'Compiling...' : status === 'success' ? 'Restart Server' : 'Run Project'}
                        </button>

                        {status === 'success' && previewUrl && (
                            <motion.a
                                href={previewUrl}
                                target="_blank"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2 px-6 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg hover:shadow-blue-500/20 transition-all"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Open Preview
                            </motion.a>
                        )}
                    </div>

                    {status === 'success' && (
                        <span className="text-green-400 text-sm animate-pulse flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            Server listening on port 3000
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectRunner;
