'use client';
import { useTerminal } from '@/components/providers/TerminalProvider';
import { Play } from 'lucide-react';

const ExeViewer = ({ name, command, description }: { name: string, command: string, description: string }) => {
    const { runCommand } = useTerminal();

    return (
        <div className="flex flex-col items-center justify-start h-full w-full bg-[#1e1e1e] text-center p-8 pt-10 overflow-hidden select-none">
            <div className="w-24 h-24 bg-[#2d2d2d] rounded-xl flex items-center justify-center mb-6 shadow-xl border border-[#333]">
                <div className="text-green-500 font-mono text-4xl font-bold">EXE</div>
            </div>

            <h1 className="text-2xl font-bold text-[#cccccc] mb-2">{name}</h1>
            <p className="text-gray-500 mb-8 max-w-md">{description}</p>

            <button
                onClick={() => runCommand(command)}
                className="group relative px-6 py-3 bg-[#007acc] hover:bg-[#0062a3] text-white font-semibold rounded-md flex items-center gap-2 transition-all shadow-lg active:scale-95"
            >
                <Play size={18} className="fill-current" />
                <span>Run Application</span>

                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Executes {command}
                </div>
            </button>
        </div>
    );
};

export default ExeViewer;
