import { Minus, Square, X } from 'lucide-react';
import Image from 'next/image';

const TitleBar = () => {
    return (
        <div className="h-8 bg-[var(--vscode-header)] flex items-center justify-between select-none text-[var(--vscode-fg)] text-[13px] border-b border-[var(--vscode-border)]">
            <div className="flex items-center px-2">
                <Image src="/vscode.png" alt="VSCode Icon" width={18} height={18} className="mr-3" />
                <div className="flex gap-2">
                    <span className="hover:bg-white/10 px-2 py-0.5 rounded-sm cursor-pointer">File</span>
                    <span className="hover:bg-white/10 px-2 py-0.5 rounded-sm cursor-pointer">Edit</span>
                    <span className="hover:bg-white/10 px-2 py-0.5 rounded-sm cursor-pointer">Selection</span>
                    <span className="hover:bg-white/10 px-2 py-0.5 rounded-sm cursor-pointer">View</span>
                    <span className="hover:bg-white/10 px-2 py-0.5 rounded-sm cursor-pointer">Go</span>
                    <span className="hover:bg-white/10 px-2 py-0.5 rounded-sm cursor-pointer">Run</span>
                    <span className="hover:bg-white/10 px-2 py-0.5 rounded-sm cursor-pointer">Terminal</span>
                    <span className="hover:bg-white/10 px-2 py-0.5 rounded-sm cursor-pointer">Help</span>
                </div>
            </div>

            <div className="flex items-center font-medium opacity-80">
                <span>Samarth Vaidya - Portfolio</span>
            </div>

            <div className="flex h-full">
                <div className="w-12 flex items-center justify-center hover:bg-white/10 cursor-pointer">
                    <Minus size={14} />
                </div>
                <div className="w-12 flex items-center justify-center hover:bg-white/10 cursor-pointer">
                    <Square size={12} />
                </div>
                <div className="w-12 flex items-center justify-center hover:bg-red-500 hover:text-white cursor-pointer group">
                    <X size={14} />
                </div>
            </div>
        </div>
    );
};

export default TitleBar;
