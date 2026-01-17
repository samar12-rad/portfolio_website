'use client';
import { useEffect, useState } from 'react';

const Minimap = () => {
    const [lines, setLines] = useState<number[]>([]);

    useEffect(() => {
        // Generate random line lengths to simulate code
        const lineCount = 60;
        const newLines = Array.from({ length: lineCount }, () => Math.floor(Math.random() * 80) + 10);
        setLines(newLines);
    }, []);

    return (
        <div className="w-[60px] h-full bg-[var(--vscode-bg)] border-l border-[var(--vscode-border)] hidden md:flex flex-col gap-[2px] p-1 overflow-hidden select-none opacity-80 cursor-default">
            {lines.map((width, i) => (
                <div
                    key={i}
                    className={`h-[2px] rounded-sm ${Math.random() > 0.7 ? 'bg-[#569cd6]' : Math.random() > 0.8 ? 'bg-[#c586c0]' : 'bg-[#6e7681]'}`}
                    style={{ width: `${width}%` }}
                ></div>
            ))}
            {/* Overlay to simulate viewport highlight */}
            <div className="absolute top-0 right-0 w-[60px] h-[100px] bg-[#ffffff10] pointer-events-none"></div>
        </div>
    );
};

export default Minimap;
