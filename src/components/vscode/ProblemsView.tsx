'use client';
import { XCircle, AlertTriangle, Info } from 'lucide-react';

const ProblemsView = () => {
    return (
        <div className="h-full overflow-y-auto font-mono text-sm p-2 select-text">
            <div className="flex items-center gap-2 mb-2 p-1 hover:bg-[var(--vscode-hover)] cursor-pointer rounded">
                <AlertTriangle size={14} className="text-yellow-500" />
                <span className="opacity-80">src/components/Life.tsx</span>
                <span className="opacity-50 ml-2">[3, 14]</span>
                <span className="ml-4 opacity-70">Warning: 'Sleep' is defined but never used.</span>
            </div>
            <div className="flex items-center gap-2 mb-2 p-1 hover:bg-[var(--vscode-hover)] cursor-pointer rounded">
                <Info size={14} className="text-blue-500" />
                <span className="opacity-80">src/skills/Optimization.ts</span>
                <span className="opacity-50 ml-2">[12, 1]</span>
                <span className="ml-4 opacity-70">Info: Excessive coffee consumption detected during build.</span>
            </div>
            <div className="flex items-center gap-2 mb-2 p-1 hover:bg-[var(--vscode-hover)] cursor-pointer rounded">
                <XCircle size={14} className="text-red-500" />
                <span className="opacity-80">package.json</span>
                <span className="opacity-50 ml-2">[1, 1]</span>
                <span className="ml-4 opacity-70">Error: Dependency 'Free Time' not found in registry.</span>
            </div>
        </div>
    );
};

export default ProblemsView;
