'use client';
import { useRef, useEffect } from 'react';
import { useTerminal } from '@/components/providers/TerminalProvider';

const Terminal = () => {
    const { lines, runCommand } = useTerminal();
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when lines change
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [lines]);

    return (
        <div
            className="h-full w-full bg-[var(--vscode-bg)] flex flex-col text-sm font-mono overflow-hidden transition-colors"
        >
            {/* Terminal Content */}
            <div
                className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1 cursor-text scrollbar-hide"
                onClick={() => document.getElementById('terminal-input')?.focus()}
            >
                {lines.slice(0, lines.length - 1).map((line, i) => (
                    <div key={i} className="text-[var(--vscode-fg)] whitespace-pre-wrap break-all">
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

                {/* Active Input Line */}
                <div className="flex items-center text-[var(--vscode-fg)]">
                    <span className="mr-2">{lines[lines.length - 1]}</span>
                    <form
                        className="flex-1"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const input = (e.currentTarget.elements.namedItem('cmd') as HTMLInputElement);
                            runCommand(input.value);
                            input.value = '';
                        }}
                    >
                        <input
                            id="terminal-input"
                            name="cmd"
                            type="text"
                            autoComplete="off"
                            autoFocus
                            className="bg-transparent border-none outline-none w-full text-[var(--vscode-fg)]"
                        />
                    </form>
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
};

export default Terminal;
