'use client';
import { useEffect, useState } from 'react';

const OutputView = () => {
    const [lines, setLines] = useState<string[]>([
        '[Info]  Ready to compile...',
        '[Info]  Compiling "src/portfolio"...',
        '[Info]  > Next.js 14.1.0',
        '[Info]  - Local:        http://localhost:3000',
        '[Info]  - Network:      http://192.168.1.4:3000',
        '[Info]  ✓ Ready in 1241ms',
        '[Info]  Thank you for visiting my portfolio!',
    ]);

    return (
        <div className="h-full overflow-y-auto font-mono text-xs p-2 select-text text-gray-300">
            {lines.map((line, i) => (
                <div key={i} className="mb-0.5 whitespace-pre-wrap">{line}</div>
            ))}
        </div>
    );
};

export default OutputView;
